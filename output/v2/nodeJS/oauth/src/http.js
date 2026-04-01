'use strict';

const { OAuthError } = require('./errors');

/**
 * @param {string} url
 * @param {Record<string, string>} params
 * @param {Record<string, string>} [headers]
 * @returns {Promise<unknown>}
 */
async function postForm(url, params, headers = {}) {
  const body = new URLSearchParams(params).toString();
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
    body,
  });
  const json = await response.json();
  if (!response.ok) throw OAuthError.fromResponse(response.status, json);
  return json;
}

/**
 * @param {string} url
 * @param {Record<string, string>} [headers]
 * @returns {Promise<unknown>}
 */
async function getJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  const json = await response.json();
  if (!response.ok) throw OAuthError.fromResponse(response.status, json);
  return json;
}

module.exports = { postForm, getJson };
