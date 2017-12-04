import _ from 'lodash';
import { stripLocalFields } from './fieldsOperations';

export default function socketDispatcher(config, action, name, dispatch, data, cb) {
  var payload = data && (data._tempId || data._rewrite) ? _.omit(data, ['_tempId', '_rewrite']) : data;
  payload = stripLocalFields(config, payload);
  console.log('socketDispatcher');
  if(action) action = action.toUpperCase();
  if(!config) config = {};
  if(!config.eventName) config.eventName = "redux_action_event";
  if(config.socketIoFunction) {
    let actionData = {
      type: (action ? action+'_'+name : name)
    };
    if(payload) actionData.data = payload;
    console.log('socketDispatcher config', config)
    return new Promise((resolve, reject) => {
      console.log(config.eventName, actionData)
      config.socketIoFunction(config.eventName, actionData, (err, res) => {
        if(err) {
          let failedAction = {
            type: (action ? action+'_'+name : name)+'_FAILED',
            error: err,
          }
          if(data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(err);
        } else { 
          let completedAction = {
            type: (action ? action+'_'+name : name)+'_COMPLETED',
            data: res,
          }
          if(data && data._tempId) completedAction._tempId = data._tempId;
          if(data && typeof data._rewrite !== "undefined") completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(res);
        }
        if(cb) cb(err, res);
        return {err, res};
      });
    });
  } 
}