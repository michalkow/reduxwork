const fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export default function buildFetchOptions(options, payload, method) {
  let fetchOptions = options.fetchOptions || fetchDefaults;
  fetchOptions.method = method;
  if (fetchOptions.method != 'GET') fetchOptions.body = JSON.stringify(payload);
  return fetchOptions;
}