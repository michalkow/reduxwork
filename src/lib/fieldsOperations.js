import {
  omit
} from 'lodash';

export const omitFields = (action, fieldsType) =>
  Object.assign({}, action, { data: omit(action.data, action[fieldsType]) });

export const omitVirtualFields = (options, action) =>
  omitFields(action, options.virtualFieldsName);

export const omitLocalFields = (options, action) =>
  omitFields(action, options.localFieldsName);