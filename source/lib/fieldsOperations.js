import {
  omit
} from 'lodash';

export const parseActionData = (action, omitFields) => {
  if (!action[omitFields])
    return action;
  return omit(action.data, action[omitFields]);
};

export const parseVirtualData = (action, options) =>
  parseActionData(action, options.localFieldsName);

export const parseLocalData = (action, options) =>
  parseActionData(action, options.virtualFieldsName);