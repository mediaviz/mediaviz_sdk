import { handleResponse } from './errors.js';

export async function createUserAndCompany(baseUrl, body) {
  const resp = await fetch(baseUrl + `/api/v1/users/new_company`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse(resp);
}
