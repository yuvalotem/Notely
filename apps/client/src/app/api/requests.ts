const REQUEST_HEADERS = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:8000',
  'Referrer-Policy': 'no-referrer',
}

const APP_BASE_URL = 'http://localhost:8000/api/'
const buildAppUrl = (url: string) => APP_BASE_URL + url

export type RequestParams = {
  url: string
  headers?: Record<string, unknown>
  body?: unknown
}

export const Get = ({ url, headers = {}, body }: RequestParams) =>
  fetch(buildAppUrl(url), {
    method: 'GET',
    body: JSON.stringify(body),
    headers: {
      ...REQUEST_HEADERS,
      ...headers,
    },
  }).then((res) => res.json())

export const Post = ({ url, headers, body }: RequestParams) =>
  fetch(buildAppUrl(url), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...REQUEST_HEADERS,
      ...headers,
    },
  })
    .then((response) => response.json())
    // eslint-disable-next-line no-console
    .catch((error) => console.error('Error:', error))

export const Put = ({ url, headers, body }: RequestParams) =>
  fetch(buildAppUrl(url), {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      ...REQUEST_HEADERS,
      ...headers,
    },
  })
    .then((response) => response.json())
    // eslint-disable-next-line no-console
    .catch((error) => console.error('Error:', error))

export const Delete = ({ url, headers }: RequestParams) =>
  fetch(buildAppUrl(url), {
    method: 'DELETE',
    headers: {
      ...REQUEST_HEADERS,
      ...headers,
    },
  })
    .then((response) => response.json())
    // eslint-disable-next-line no-console
    .catch((error) => console.error('Error:', error))
