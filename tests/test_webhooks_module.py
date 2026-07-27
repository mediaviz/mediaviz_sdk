"""Tests for the bundled webhook-consumer module: copy, client wiring, exports, and dts."""
from __future__ import annotations
import os
import sys
import tempfile

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from generators.javascript_browser import JavaScriptBrowserGenerator
from generators.php import PhpGenerator
from generators.python import PythonGenerator
from generators.typescript_dts import build_dts

WEBHOOK_MODULE_DIR = os.path.join(os.path.dirname(__file__), "..", "webhook_module")

_SUBSCRIPTION_EP = {
    "function_name": "create_subscription",
    "controller": "Subscription",
    "path": "/api/v1/subscriptions",
    "method": "POST",
    "auth": "required",
    "params": [],
    "request_body": None,
    "api_host": None,
}

_OTHER_EP = {
    "function_name": "get_project",
    "controller": "projects",
    "path": "/projects/{project_id}",
    "method": "GET",
    "auth": "required",
    "params": [{"name": "project_id", "in": "path", "type": "string", "required": True}],
    "request_body": None,
    "api_host": None,
}


# ── source module sanity ──────────────────────────────────────────────────────

def test_webhook_module_source_layout():
    for path in (
        "javascript/package.json",
        "javascript/src/index.js",
        "javascript/src/signing.js",
        "javascript/src/store.js",
        "javascript/src/consumer.js",
        "php/composer.json",
        "php/src/WebhookSigning.php",
        "php/src/WebhookStore.php",
        "php/src/InMemoryWebhookStore.php",
        "php/src/WebhookConsumer.php",
        "python/mediaviz_webhooks/__init__.py",
        "python/mediaviz_webhooks/_signing.py",
        "python/mediaviz_webhooks/_store.py",
        "python/mediaviz_webhooks/_consumer.py",
    ):
        assert os.path.isfile(os.path.join(WEBHOOK_MODULE_DIR, path)), f"missing: {path}"


def test_python_webhook_signing_roundtrip():
    sys.path.insert(0, os.path.join(WEBHOOK_MODULE_DIR, "python"))
    try:
        from mediaviz_webhooks import sign_webhook_payload, verify_webhook_signature
        secret, ts, body = "s3cret", "1700000000", b'{"event_id": "e1"}'
        sig = sign_webhook_payload(secret, ts, body)
        assert sig.startswith("sha256=")
        headers = {"X-Timestamp": ts, "X-Signature": sig}
        assert verify_webhook_signature(secret, None, headers, body, now=1700000000)
        assert verify_webhook_signature("rotated", secret, headers, body, now=1700000000)  # previous accepted
        assert not verify_webhook_signature("wrong", None, headers, body, now=1700000000)
        assert not verify_webhook_signature(secret, None, headers, body, now=1700000000 + 301)  # skew
        assert not verify_webhook_signature(secret, None, {"X-Signature": sig}, body, now=1700000000)  # no ts
    finally:
        sys.path.remove(os.path.join(WEBHOOK_MODULE_DIR, "python"))


# ── base helpers ──────────────────────────────────────────────────────────────

def test_webhooks_controller_requires_module_and_subscription_group():
    g = JavaScriptBrowserGenerator()
    groups = {"Subscription": [_SUBSCRIPTION_EP], "projects": [_OTHER_EP]}
    assert g.webhooks_controller(groups) is None  # module not copied yet
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        assert g.webhooks_controller(groups) == "Subscription"
        assert g.webhooks_controller({"projects": [_OTHER_EP]}) is None  # no subscription endpoints


def test_copy_webhooks_module_registers_default_name():
    g = JavaScriptBrowserGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        assert g.has_module("webhooks")
        assert os.path.isfile(os.path.join(tmpdir, "webhooks", "src", "consumer.js"))


# ── javascript ────────────────────────────────────────────────────────────────

def test_js_client_wires_webhooks_namespace():
    g = JavaScriptBrowserGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        g.emit_client_class({"Subscription": [_SUBSCRIPTION_EP]}, {}, set(), tmpdir)
        src = open(os.path.join(tmpdir, "MediaViz.js")).read()
        assert "import { WebhookConsumer } from './_webhooks.js';" in src
        assert "this.webhooks = new WebhookConsumer(_ctx, this.subscription);" in src


def test_js_client_skips_webhooks_without_module():
    g = JavaScriptBrowserGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.emit_client_class({"Subscription": [_SUBSCRIPTION_EP]}, {}, set(), tmpdir)
        src = open(os.path.join(tmpdir, "MediaViz.js")).read()
        assert "webhooks" not in src


def test_js_reexport_exposes_webhook_module_surface():
    g = JavaScriptBrowserGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        files = g.reexport_all_modules(tmpdir)
        assert "_webhooks.js" in files
        src = open(os.path.join(tmpdir, "_webhooks.js")).read()
        for name in ("WebhookConsumer", "InMemoryWebhookStore", "signWebhookPayload", "verifyWebhookSignature"):
            assert name in src, f"missing export: {name}"


def test_dts_declares_webhooks():
    g = JavaScriptBrowserGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        dts = build_dts(g, [_SUBSCRIPTION_EP], None, None, {})
        assert "export class WebhookConsumer {" in dts
        assert "readonly webhooks: WebhookConsumer;" in dts
        assert "export type WebhookAck" in dts


def test_dts_skips_webhooks_without_subscription_endpoints():
    g = JavaScriptBrowserGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        dts = build_dts(g, [_OTHER_EP], None, None, {})
        assert "WebhookConsumer" not in dts


# ── php ───────────────────────────────────────────────────────────────────────

def test_php_client_wires_webhooks_namespace():
    g = PhpGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        g.emit_client_class({"Subscription": [_SUBSCRIPTION_EP]}, {}, set(), tmpdir)
        src = open(os.path.join(tmpdir, "MediaVizClient.php")).read()
        assert "public readonly \\MediaVizWebhooks\\WebhookConsumer $webhooks;" in src
        assert "$this->webhooks = new \\MediaVizWebhooks\\WebhookConsumer($ctx, $this->subscription);" in src


def test_php_autoload_includes_webhooks_psr4():
    g = PhpGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        g.emit_autoload_config(tmpdir)
        import json
        config = json.load(open(os.path.join(tmpdir, "composer.json")))
        assert config["autoload"]["psr-4"]["MediaVizWebhooks\\"] == "./webhooks/src/"


# ── python ────────────────────────────────────────────────────────────────────

def test_python_copy_uses_package_name():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        assert g.has_module("mediaviz_webhooks")
        assert os.path.isfile(os.path.join(tmpdir, "mediaviz_webhooks", "_consumer.py"))
        assert not os.path.isdir(os.path.join(tmpdir, "mediaviz_webhooks", "mediaviz_webhooks"))


def test_python_client_wires_webhooks_namespace():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, tmpdir)
        os.makedirs(os.path.join(tmpdir, "mediaviz_sdk"))
        g.emit_client_class({"subscription": [_SUBSCRIPTION_EP]}, {}, set(), tmpdir)
        src = open(os.path.join(tmpdir, "mediaviz_sdk", "client.py")).read()
        assert "from mediaviz_webhooks import WebhookConsumer" in src
        assert "self.webhooks = WebhookConsumer(_ctx, self.subscription)" in src


def test_python_generate_exports_and_packages():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "sdk", "v2.3.4", "python")
        os.makedirs(output_dir)
        g.copy_webhooks_module(WEBHOOK_MODULE_DIR, output_dir)
        g.generate([_SUBSCRIPTION_EP], output_dir)
        init_src = open(os.path.join(output_dir, "mediaviz_sdk", "__init__.py")).read()
        assert "from mediaviz_webhooks import" in init_src
        assert "'WebhookConsumer'," in init_src
        toml = open(os.path.join(output_dir, "pyproject.toml")).read()
        assert '"mediaviz_webhooks"' in toml
