import { snakeCase, camelCase, union } from 'lodash';
import { ActionOperationEnum, ActionStageEnum } from './constants';
import uuid from 'uuid';

export const parseData = (options, operation, payload) => {
  const { keyName, uuidVersion, uuidOptions } = options;
  const data = Object.assign({}, payload);
  if (options.addKeyOnCreate && operation == ActionOperationEnum.CREATE && !payload[keyName]) {
    data.uuid = uuid[uuidVersion](uuidOptions);
    data[keyName] = new Date().getTime();
  }
  return data;
};

export const buildActionType = (options, operation, name) => (
  operation ? snakeCase(operation) + '_' + snakeCase(name) : snakeCase(name)
).toUpperCase();

export const mergeLocalFields = (options) =>
  union(['_tempId', '_rewrite'], options);

export const buildAction = (options, operation, name, payload) => {
  const { localFieldsName, virtualFieldsName, transport } = options;
  const type = buildActionType(options, operation, name);
  const data = parseData(options, operation, payload);
  return {
    type,
    data,
    meta: {
      name: camelCase(name),
      operation,
      [localFieldsName]: options[localFieldsName] || [],
      [virtualFieldsName]: options[virtualFieldsName] || [],
      offline: {
        effect: {
          transport
        },
        commit: {
          type: type + '_' + ActionStageEnum.COMPLETED,
          data
        },
        rollback: {
          type: type + '_' + ActionStageEnum.FAILED,
          data
        }
      }
    }
  };
};