import { snakeCase, union } from 'lodash';
import { ActionOperationEnum } from './constants';

export const parseData = (options, operation, payload) => {
  const { keyName } = options;
  if (options.addKeyOnCreate && operation == ActionOperationEnum.CREATE && !payload[keyName]) {
    let now = new Date().getTime();
    payload._tempId = now;
    payload[keyName] = now;
  }
  return payload;
};

export const getActionType = (options, operation, name) =>
  (options.prefix + (operation ? snakeCase(operation) + '_' + snakeCase(name) : snakeCase(name))).toUpperCase();

export const mergeLocalFields = (options) =>
  union(['_tempId', '_rewrite'], options);

export default (options, operation, name, payload) => {
  const { local, transport, validationScheme, localFieldsName, virtualFieldsName } = options;
  const data = parseData(options, operation, payload);

  return {
    reduxwork: true,
    name,
    operation,
    type: getActionType(options, operation, name),
    data,
    local,
    transport,
    validationScheme,
    [localFieldsName]: options[localFieldsName],
    [virtualFieldsName]: options[virtualFieldsName]
  };
};