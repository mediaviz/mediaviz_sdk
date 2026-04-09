import { handleResponse } from './errors.js';

export async function requestPasswordReset(baseUrl, body) {
  const resp = await fetch(baseUrl + `/api/v1/request-password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse(resp);
}

export async function resetPassword(baseUrl, body) {
  const resp = await fetch(baseUrl + `/api/v1/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse(resp);
}
