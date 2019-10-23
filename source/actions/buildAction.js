import { snakeCase, camelCase, union, isArray } from 'lodash';
import { ActionOperationEnum, ActionStageEnum } from '../lib/constants';
import createUuid from 'uuid';

export const parseData = (options, operation, data) => {
  const { keyName, uuidVersion, uuidOptions, createKey } = options;
  const dataArray = isArray(data) ? data : [data];
  if (options.addKeyOnCreate && operation == ActionOperationEnum.CREATE)
    return dataArray.map(item => {
      if (!item[keyName])
        item[keyName] = createKey ? createKey() : createUuid[uuidVersion](uuidOptions);
      item._temp = true;
      return item;
    });
  return dataArray;
};

export const buildActionType = (options, operation, name) => (
  operation ? snakeCase(operation) + '_' + snakeCase(name) : snakeCase(name)
).toUpperCase();

export const mergeLocalFields = (fields = []) =>
  union(['_temp', '_rewrite'], fields);

export const buildAction = (options, operation, name, data) => {
  const { localFieldsName, virtualFieldsName, transport, uuidVersion, uuidOptions } = options;
  const type = buildActionType(options, operation, name);
  const payload = parseData(options, operation, data);
  const uuid = createUuid[uuidVersion](uuidOptions);
  return {
    type,
    payload,
    uuid,
    meta: {
      name: camelCase(name),
      operation,
      [localFieldsName]: mergeLocalFields(options[localFieldsName]),
      [virtualFieldsName]: options[virtualFieldsName] || [],
      offline: {
        effect: {
          transport
        },
        commit: {
          type: type + '_' + ActionStageEnum.COMPLETED,
          uuid
        },
        rollback: {
          type: type + '_' + ActionStageEnum.FAILED,
          uuid
        }
      }
    }
  };
};