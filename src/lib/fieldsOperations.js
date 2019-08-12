import {
  omit
} from 'lodash';

export const omitFields = (action, fieldsType) => {
  if (!action[fieldsType])
    return action;
  return Object.assign({}, action, { data: omit(action.data, action[fieldsType]) });
};

export const omitVirtualFields = (action, options) =>
  omitFields(action, options.virtualFieldsName);

export const omitLocalFields = (action, options) =>
  omitFields(action, options.localFieldsName);