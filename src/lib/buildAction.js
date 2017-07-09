import socketDispatcher from '../lib/socketDispatcher';
import fetchDispatcher from '../lib/fetchDispatcher';

export default function buildAction(config, action, name, data, cb) {
  console.log('buildAction', config)
  return function (dispatch) {
    if(config.addKeyOnCreate && action=="CREATE") {
      let keyName = config.keyName || 'id';
      if(!data[keyName]) data[keyName] = new Date().getTime();
    }
    let actionData = {
      type: (action ? action+'_'+name.toUpperCase() : name.toUpperCase()),
      data
    };
    dispatch(actionData)
    console.log('dispatch', actionData)
	  if(config.type == "socket") 
	  	return socketDispatcher(config, action, name.toUpperCase(), dispatch, data, cb, config);
	  else if(config.type == "fetch") 
	  	return fetchDispatcher(config, action, name.toUpperCase(), dispatch, data, cb, config);
  }
}