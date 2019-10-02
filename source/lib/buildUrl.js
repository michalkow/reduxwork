import { FetchMethodEnum } from './constants';

export const buildPath = (options, action) => 
  options.baseURL + (
    options.url ?
      options.url
      :
      ('/' + action.meta.name + '/' + action.meta.operation)
  );

export const buildQuery = (action) => {
  let query = '/';
  let first = true;
  for (var q in action.data) {
    if (first) {
      query += '?' + q + '=' + action.data[q];
      first = false;
    } else query += '&' + q + '=' + action.data[q];
  }
  return query;
};

export default function buildUrl(options, action, method) {
  let url = buildPath(options, action);

  if (action.data && method == FetchMethodEnum.GET) 
    url += buildQuery(action);

  return url;
}