import _ from 'lodash';
import buildFetchOptions from './buildFetchOptions';
import buildURL from './buildURL';
import getFetchMethod from './getFetchMethod';
import { stripLocalFields } from './fieldsOperations';
import validationHookError from './validationHook';

export default function fetchDispatcher(config, action, name, dispatch, data, cb) {
  var payload = ((data && (data._tempId || data._rewrite)) ? _.omit(data, ['_tempId', '_rewrite']) : data);
  payload = stripLocalFields(config, payload);
  console.log('fetchDispatcher')
  action = action.toUpperCase();
  if(!config) config = {};
  if(config.fetchFunction) {
    console.log( 
      buildURL(config, action, name, payload), 
      buildFetchOptions(config, action, payload) 
    )
    return new Promise((resolve, reject) => {
      let validationError = validationHookError(config, action, name, payload);
      if (validationError) {
        let failedValidationAction = {
          type: (action ? action + '_' + name : name) + '_FAILED',
          validationError: validationError,
        }
        if (data && data._tempId) failedValidationAction._tempId = data._tempId;
        dispatch(failedValidationAction);
        reject(err);
        return { err, res: null };
      }
      if (config.actionInject) payload = config.actionInject(payload);
      config.fetchFunction( 
        buildURL(config, action, name, payload, getFetchMethod(config, action)), 
        buildFetchOptions(config, payload, getFetchMethod(config, action)) 
      )
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log('server res', json)
        console.log('cb', cb)
        if(json.err) {
          let failedAction = {
            type: (action ? action+'_'+name : name)+'_FAILED',
            error: json.err,
          }
          if(data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(json.err);
        } else {
          let completedAction = {
            type: (action ? action+'_'+name : name)+'_COMPLETED',
            data: json,
          }
          if(data && data._tempId) completedAction._tempId = data._tempId;
          if(data && typeof data._rewrite !== "undefined") completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(json);
        }
        if(cb) cb(json.err, json);
        return json;
      })
    });
  }
}