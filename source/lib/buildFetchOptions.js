import { FetchMethodEnum } from './constants';
import { parseVirtualData } from './fieldsOperations';

const fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export default function buildFetchOptions(options, action, method) {
  let fetchAction = options.injectAction(action);
  let fetchOptions = options.fetchOptions || fetchDefaults;
  let json = parseVirtualData(fetchAction, options);
  fetchOptions.method = method;
  if (fetchOptions.method != FetchMethodEnum.GET)
    fetchOptions.body = JSON.stringify(json);
  return fetchOptions;
}