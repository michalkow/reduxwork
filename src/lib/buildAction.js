import _ from 'lodash';
import socketDispatcher from '../lib/socketDispatcher';
import fetchDispatcher from '../lib/fetchDispatcher';

export default function buildAction(config, action, name, data, cb) {
  console.log('buildAction', config)
  return function (dispatch) {
    if(config.addKeyOnCreate && action=="CREATE") {
      let keyName = config.keyName || 'id';
      let prefix = config.localPrefix || 'local';
      let prefixedKeyName = prefix + _.upperFirst(keyName);
      if (!data[keyName] && !data[prefixedKeyName]) {
        data._tempId = new Date().getTime();
        data[prefixedKeyName] = data._tempId;
      }
    }
    let formatedName = _.snakeCase(name).toUpperCase();
    let actionData = {
      type: (action ? action+'_'+formatedName : formatedName),
      data: ((data && data._tempId) ? _.omit(data, '_tempId') : data)
    };
    dispatch(actionData)
    console.log('dispatch', actionData)
	  if(config.type == "socket") 
	  	return socketDispatcher(config, action, formatedName, dispatch, data, cb);
	  else if(config.type == "fetch") 
	  	return fetchDispatcher(config, action, formatedName, dispatch, data, cb);
  }
}