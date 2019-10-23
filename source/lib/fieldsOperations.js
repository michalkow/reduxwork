import {
  omit,
  map
} from 'lodash';

export const parseActionData = (action, omitFields) => {
  if (!action[omitFields])
    return action;
  return map(action.payload, item => omit(item, action[omitFields]));
};

export const parseVirtualData = (action, options) =>
  parseActionData(action, options.localFieldsName);

export const parseLocalData = (action, options) =>
  parseActionData(action, options.virtualFieldsName);