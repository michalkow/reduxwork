import fetchDispatcher from '../lib/fetchDispatcher';

export default function buildFetchGetAction(config, action, name, params, query, cb, options) {
	if(params && typeof params !== 'object') {
    let id = params;
    params = {};
    params[config.idName] = id;
  }
  if (typeof query === "function") {
    cb = query;
    query = null;
  }
  return function (dispatch) {
    let actionData = {type: action+'_'+name.toUpperCase()};
    if(query) actionData.query = query;
    if(params) actionData.params = params;
    dispatch(actionData)
    return fetchDispatcher(config, action, name.toUpperCase(), dispatch, {params, query}, cb, options);
  }
}