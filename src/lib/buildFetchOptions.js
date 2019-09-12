import { FetchMethodEnum } from './constants';

const fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export default function buildFetchOptions(options, action, method) {
  let fetchOptions = options.fetchOptions || fetchDefaults;
  fetchOptions.method = method;
  if (fetchOptions.method != FetchMethodEnum.GET)
    fetchOptions.body = JSON.stringify(action.data);
  return fetchOptions;
}