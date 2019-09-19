import { snakeCase, camelCase, union } from 'lodash';
import { ActionOperationEnum, ActionStageEnum, TransportMethodEnum } from './constants';
import uuid from 'uuid';

export const parseData = (options, operation, payload) => {
  const { keyName, uuidVersion, uuidOptions } = options;
  const data = Object.assign({}, payload);
  if (options.addKeyOnCreate && operation == ActionOperationEnum.CREATE && !payload[keyName]) {
    data._tempId = uuid[uuidVersion](uuidOptions);
    data[keyName] = new Date().getTime();
  }
  return data;
};

export const buildActionType = (options, operation, name) => (
  (options.prefix ? (options.prefix + '_') : '') +
  (operation ? snakeCase(operation) + '_' + snakeCase(name) : snakeCase(name))
).toUpperCase();

export const mergeLocalFields = (options) =>
  union(['_tempId', '_rewrite'], options);

export const buildAction = (options, operation, name, payload) => {
  const { localFieldsName, virtualFieldsName } = options;
  const type = buildActionType(options, operation, name);
  return {
    type,
    payload,
    meta: {
      name: camelCase(name),
      operation,
      [localFieldsName]: options[localFieldsName],
      [virtualFieldsName]: options[virtualFieldsName],
      offline: {
        effect: {
          url: '/api/follow',
          method: 'POST',
          payload
        },
        commit: {
          type: type + '_' + ActionStageEnum.COMPLETED,
          payload
        },
        rollback: {
          type: type + '_' + ActionStageEnum.FAILED,
          payload
        }
      }
    }
  };
};