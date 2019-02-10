import { upperFirst, snakeCase, omit } from 'lodash';
import socketDispatcher from './socketDispatcher';
import fetchDispatcher from './fetchDispatcher';

export default function buildAction(config, action, name, data, cb) {
  return function (dispatch) {
    if (config.addKeyOnCreate && action == 'CREATE') {
      let keyName = config.keyName || 'id';
      let prefix = config.localPrefix || 'local';
      let prefixedKeyName = prefix + upperFirst(keyName);
      if (!data[keyName] && !data[prefixedKeyName]) {
        data._tempId = new Date().getTime();
        data[prefixedKeyName] = data._tempId;
      }
    }
    let formatedName = snakeCase(name).toUpperCase();
    let actionData = {
      type: (action ? action + '_' + formatedName : formatedName),
      data: ((data && data._tempId) ? omit(data, '_tempId') : data)
    };
    dispatch(actionData);
    if (config.type == 'socket')
      return socketDispatcher(config, action, formatedName, dispatch, data, cb);
    else if (config.type == 'fetch')
      return fetchDispatcher(config, action, formatedName, dispatch, data, cb);
  };
}