import { omit } from 'lodash';
import buildFetchOptions from './buildFetchOptions';
import buildURL from './buildURL';
import getFetchMethod from './getFetchMethod';
import { stripLocalFields } from './fieldsOperations';
import validationHookError from './validationHook';

export default function fetchDispatcher(config = {}, actionName, name, dispatch, data, cb) {
  var payload = ((data && (data._tempId || data._rewrite)) ? omit(data, ['_tempId', '_rewrite']) : data);
  const action = actionName ? actionName.toUpperCase() : null;
  if (config.fetchFunction) {
    return new Promise((resolve, reject) => {
      if (config.actionInject) payload = config.actionInject(payload);
      //TODO: Make logic more similar to socket dispatcher
      let validationError = validationHookError(config, { type: action + '_' + name, data: payload });
      if (validationError) {
        let failedValidationAction = {
          type: (action ? action + '_' + name : name) + '_FAILED',
          validationError: validationError
        };
        if (data && data._tempId) failedValidationAction._tempId = data._tempId;
        dispatch(failedValidationAction);
        reject(validationError);
        return { err: validationError, res: null };
      }
      payload = stripLocalFields(config, payload);
      config.fetchFunction(
        buildURL(config, action, name, payload, getFetchMethod(config, action)),
        buildFetchOptions(config, payload, getFetchMethod(config, action))
      )
        .then(response => {
          if (response.ok)
            return response.json();
          else {
            let error = response.json();
            let failedAction = {
              type: (action ? action + '_' + name : name) + '_FAILED',
              error: error
            };
            if (data && data._tempId) failedAction._tempId = data._tempId;
            dispatch(failedAction);
            reject(error);
            if (cb) cb(error, null);
            return error;
          }
        })
        .then(json => {
          let completedAction = {
            type: (action ? action + '_' + name : name) + '_COMPLETED',
            data: json
          };
          if (data && data._tempId) completedAction._tempId = data._tempId;
          if (data && typeof data._rewrite !== 'undefined') completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(json);
          if (cb) cb(null, json);
          return json;
        });
    });
  }
}