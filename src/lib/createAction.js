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

export const createAction = (options, operation, name, payload = {}) => {
  const { transport, validationScheme, localFieldsName, virtualFieldsName } = options;
  const data = parseData(options, operation, payload);

  const action = {
    reduxwork: {
      name: camelCase(name),
      stage: null,
      operation,
      transport,
      validationScheme,
      [localFieldsName]: options[localFieldsName],
      [virtualFieldsName]: options[virtualFieldsName]
    },
    type: buildActionType(options, operation, name),
    data
  };

  return action;
};

export const extendActionRedux = action =>
  Object.assign({}, action, {
    reduxwork: Object.assign({}, action.reduxwork, {
      transport: TransportMethodEnum.REDUX,
      stage: ActionStageEnum.REDUX
    })
  });

export const extendActionCompleted = (action, data) =>
  Object.assign({}, action, {
    type: action.type + '_' + ActionStageEnum.COMPLETED,
    data,
    reduxwork: Object.assign({}, action.reduxwork, {
      transport: TransportMethodEnum.REDUX,
      stage: ActionStageEnum.COMPLETED
    })
  });

export const extendActionFailed = (action, error) =>
  Object.assign({}, action, {
    type: action.type + '_' + ActionStageEnum.FAILED,
    error,
    reduxwork: Object.assign({}, action.reduxwork, {
      transport: TransportMethodEnum.REDUX,
      stage: ActionStageEnum.FAILED
    })
  });

export const extendActionFailedValidation = (action, validationError) =>
  Object.assign({}, action, {
    type: action.type + '_' + ActionStageEnum.FAILED,
    validationError,
    reduxwork: Object.assign({}, action.reduxwork, {
      transport: TransportMethodEnum.REDUX,
      stage: ActionStageEnum.FAILED_VALIDATION
    })
  });