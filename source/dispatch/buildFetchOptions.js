import { FetchMethodEnum } from '../lib/constants';
import { parseVirtualData } from '../lib/fieldsOperations';

const fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export default function buildFetchOptions(options, action, method) {
  let fetchAction = options.actionInject(action);
  let fetchOptions = options.fetchOptions || fetchDefaults;
  let json = parseVirtualData(fetchAction, options);
  fetchOptions.method = method;
  if (fetchOptions.method != FetchMethodEnum.GET)
    fetchOptions.body = JSON.stringify(json);
  return fetchOptions;
}