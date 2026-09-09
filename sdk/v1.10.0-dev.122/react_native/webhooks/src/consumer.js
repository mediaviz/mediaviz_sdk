'use strict';

const { verifyWebhookSignature, toBytes, lowerHeaders } = require('./signing');
const { InMemoryWebhookStore } = require('./store');

// Photo columns each producer model writes — used to select a model's results
// out of a fetched PhotoDisplay. Mirrors the producer vocabulary; personhood is
// predicate-based and writes no columns.
const WEBHOOK_MODEL_COLUMNS = {
  blur: ['blur_value'],
  colors: ['main_color_palette', 'color_averages', 'hue_values', 'light_values', 'saturation_values'],
  face_recognition: ['number_of_faces', 'bounding_boxes_from_faces_model'],
  image_classification: ['labels_from_classifications_model', 'feature_extraction_output'],
  image_comparison: ['average_hash'],
  image_describe: ['topic'],
  ocr: ['ocr_output'],
  similarity: ['similar_photo_ids_high', 'similar_photo_ids_medium', 'similar_photo_ids_low'],
  evidence: ['evidence_score', 'aesthetic_score', 'face_score', 'content_score', 'similarity_set_ranking'],
  personhood: [],
};

const WEBHOOK_OUTCOME_MODELS = {
  curation: ['blur', 'colors', 'face_recognition', 'image_classification', 'image_comparison', 'similarity', 'evidence'],
  similarity: ['image_classification', 'image_comparison', 'similarity'],
  persons: ['face_recognition', 'personhood'],
};

// Client-side counterpart of the MediaViz webhook producer, giving photo-by-photo
// progress as a project upload is analyzed.
//
// Receiver half (no auth needed): classify inbound POSTs, echo the subscription
// verification challenge, verify signed `target.completed` deliveries (HMAC +
// timestamp skew), dedupe on event_id, and dispatch each new event to a single
// onEvent callback. `handleRequest` is framework-agnostic glue — adapt it to
// express/lambda/etc. in a few lines by feeding it the raw body and headers.
//
// API half (requires an authenticated client): subscription lifecycle
// orchestration — register/confirm/rotate store the signing secret the moment
// the producer issues it — plus history pulls that share the push dedupe
// ledger, and out-of-band result fetches (webhooks carry a pointer, never the
// result itself).
class WebhookConsumer {
  constructor(ctx, subscriptionApi, options = {}) {
    this._ctx = ctx;
    this._api = subscriptionApi;
    this.store = options.store ?? new InMemoryWebhookStore();
    this.skewToleranceS = options.skewToleranceS ?? 300;
    this.rotationWindowS = options.rotationWindowS ?? 86400;
    this.dedupeTtlS = options.dedupeTtlS ?? 604800;
    this.pageLimit = options.pageLimit ?? 100;
    this._onEvent = options.onEvent ?? null;
  }

  // ── receiver half ─────────────────────────────────────────────────────────

  onEvent(fn) {
    this._onEvent = fn;
    return fn;
  }

  useStore(store) {
    this.store = store;
  }

  classifyMessage(body) {
    const type = body?.event_type;
    if (type === 'subscription.verification') return 'verification';
    if (type === 'target.completed') return 'delivery';
    return 'unknown';
  }

  handleChallenge(body) {
    return { challenge: body.challenge };
  }

  async handleDelivery(headers, rawBody) {
    let event;
    try {
      event = this._parseDelivery(rawBody);
    } catch {
      return 'bad_signature';
    }
    const [current, previous] = this.store.getSecrets(String(event.subscription_id));
    const ok = await verifyWebhookSignature(current, previous, headers, rawBody, { skewToleranceS: this.skewToleranceS });
    if (!ok) return 'bad_signature';
    return this._dispatch(event);
  }

  async handleRequest(headers, rawBody) {
    let body;
    try {
      body = JSON.parse(_text(rawBody));
    } catch {
      return { status: 400, body: { detail: 'invalid JSON' } };
    }
    switch (this.classifyMessage(body)) {
      case 'verification':
        return { status: 200, body: this.handleChallenge(body) };
      case 'delivery': {
        const ack = await this.handleDelivery(lowerHeaders(headers), rawBody);
        if (ack === 'bad_signature') return { status: 401, body: { detail: 'bad signature' } };
        return { status: 200, body: { status: ack } };
      }
      default:
        return { status: 400, body: { detail: 'unrecognized event_type' } };
    }
  }

  // ── API half ──────────────────────────────────────────────────────────────

  async register(projectTableName, callbackUrl, targets) {
    const res = await this._api.createSubscription(projectTableName, callbackUrl, targets);
    this._saveSecretFrom(res);
    return res;
  }

  async confirm(subscriptionId) {
    const res = await this._api.verifySubscription(subscriptionId);
    this._saveSecretFrom(res);
    return res;
  }

  async rotateSecret(subscriptionId) {
    const res = await this._api.rotateSubscriptionSecret(subscriptionId);
    this.store.rotateSecret(String(subscriptionId), res.signing_secret, this.rotationWindowS);
    return res.signing_secret;
  }

  async updateCallback(subscriptionId, callbackUrl) {
    // A callback change resets the subscription to pending_verification and
    // pauses push until the new URL passes the challenge — confirm right away.
    await this._api.updateSubscription(subscriptionId, { callbackUrl });
    return this.confirm(subscriptionId);
  }

  async disable(subscriptionId) {
    return this._api.deleteSubscription(subscriptionId);
  }

  async listSubscriptions() {
    return this._api.listSubscriptions();
  }

  async pullEvents(subscriptionId, { since, limit } = {}) {
    return this._api.listSubscriptionEvents(subscriptionId, { since, limit: limit ?? this.pageLimit });
  }

  async reconcile(subscriptionId, projectTableName) {
    const id = String(subscriptionId);
    let cursor = this.store.getCursor(id);
    let pulled = 0;
    let dispatched = 0;
    for (;;) {
      const page = await this._api.listSubscriptionEvents(id, { since: cursor ?? undefined, limit: this.pageLimit });
      const events = page?.events ?? [];
      pulled += events.length;
      for (const ev of events) {
        const ack = await this._dispatch({
          event_id: ev.event_id,
          event_type: 'target.completed',
          schema_version: '1',
          subscription_id: id,
          project_table_name: projectTableName,
          photo_id: ev.photo_id,
          target: ev.target,
          completed_at: ev.completed_at,
          result_location: this._ctx.baseUrl + _photoPath(projectTableName, ev.photo_id),
        });
        if (ack === 'handled') dispatched += 1;
      }
      if (page?.next_cursor && page.next_cursor !== cursor) {
        cursor = page.next_cursor;
        this.store.setCursor(id, cursor);
      }
      if (!events.length || events.length < this.pageLimit) break;
    }
    return { pulled, dispatched };
  }

  async fetchResult(event) {
    this._ctx.requireTokens();
    const path = _photoPath(event.project_table_name, event.photo_id);
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return { photo: data, selected: selectResultColumns(data, event.target) };
  }

  saveSecret(subscriptionId, secret) {
    this.store.saveSecret(String(subscriptionId), secret);
  }

  // ── internal ──────────────────────────────────────────────────────────────

  _saveSecretFrom(res) {
    if (res?.signing_secret && res?.subscription_id != null) {
      this.store.saveSecret(String(res.subscription_id), res.signing_secret);
    }
  }

  _parseDelivery(rawBody) {
    const event = JSON.parse(_text(rawBody));
    for (const key of ['event_id', 'subscription_id', 'target']) {
      if (typeof event?.[key] !== 'string' || !event[key]) throw new Error(`missing ${key}`);
    }
    if (!Number.isInteger(event.photo_id)) throw new Error('photo_id must be an integer');
    return event;
  }

  async _dispatch(event) {
    if (!this.store.markSeen(String(event.event_id), this.dedupeTtlS)) return 'duplicate';
    if (this._onEvent) {
      try {
        await this._onEvent(event);
      } catch (e) {
        // release the dedupe claim so the producer's retry redelivers
        this.store.unmarkSeen(String(event.event_id));
        throw e;
      }
    }
    return 'handled';
  }
}

// helpers
function selectResultColumns(photo, target) {
  if (target === 'all') return null;
  const sep = String(target).indexOf(':');
  const kind = sep === -1 ? String(target) : String(target).slice(0, sep);
  const name = sep === -1 ? '' : String(target).slice(sep + 1);
  let columns;
  if (kind === 'model') {
    columns = WEBHOOK_MODEL_COLUMNS[name];
    if (!columns) throw new Error(`unknown model '${name}'`);
  } else if (kind === 'outcome') {
    const models = WEBHOOK_OUTCOME_MODELS[name];
    if (!models) throw new Error(`unknown outcome '${name}'`);
    columns = [...new Set(models.flatMap((m) => WEBHOOK_MODEL_COLUMNS[m]))];
  } else {
    throw new Error(`unknown target grammar '${target}' (expected 'model:<name>', 'outcome:<name>', or 'all')`);
  }
  const selected = {};
  for (const c of columns) selected[c] = photo?.[c] ?? null;
  return selected;
}

function _photoPath(projectTableName, photoId) {
  return `/api/v1/photos/${encodeURIComponent(projectTableName)}/${encodeURIComponent(String(photoId))}`;
}

function _text(rawBody) {
  return typeof rawBody === 'string' ? rawBody : new TextDecoder().decode(toBytes(rawBody));
}

module.exports = { WebhookConsumer, selectResultColumns, WEBHOOK_MODEL_COLUMNS, WEBHOOK_OUTCOME_MODELS };
