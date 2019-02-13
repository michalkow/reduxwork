import { omit } from 'lodash';
import { stripLocalFields } from './fieldsOperations';
import validationHookError from './validationHook';

export default function socketDispatcher(config = {}, actionName, name, dispatch, data, cb) {
  const payload = data && (data._tempId || data._rewrite) ? omit(data, ['_tempId', '_rewrite']) : data;
  const action = actionName ? actionName.toUpperCase() : null;
  if (!config.eventName) config.eventName = 'redux_action_event';
  if (config.socketIoFunction) {
    let actionData = {
      type: (action ? action + '_' + name : name)
    };
    if (payload) actionData.data = payload;
    if (config.actionInject) actionData = config.actionInject(actionData);
    return new Promise((resolve, reject) => {
      let validationError = validationHookError(config, actionData);
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
      actionData.data = stripLocalFields(config, actionData.data);
      config.socketIoFunction(config.eventName, actionData, (err, res) => {
        if (err) {
          let failedAction = {
            type: (action ? action + '_' + name : name) + '_FAILED',
            error: err
          };
          if (data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(err);
        } else {
          let completedAction = {
            type: (action ? action + '_' + name : name) + '_COMPLETED',
            data: res
          };
          if (data && data._tempId) completedAction._tempId = data._tempId;
          if (data && typeof data._rewrite !== 'undefined') completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(res);
        }
        if (cb) cb(err, res);
        return { err, res };
      });
    });
  }
}