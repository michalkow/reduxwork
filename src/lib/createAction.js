import { snakeCase, camelCase, union } from 'lodash';
import { ActionOperationEnum, ActionStageEnum, TransportMethodEnum } from './constants';

export const parseData = (options, operation, payload) => {
  const { keyName } = options;
  const data = Object.assign({}, payload);
  if (options.addKeyOnCreate && operation == ActionOperationEnum.CREATE && !payload[keyName]) {
    let now = new Date().getTime();
    data._tempId = now;
    data[keyName] = now;
  }
  return data;
};

export const getActionType = (options, operation, name) =>
  ((options.prefix ? (options.prefix + '_') : '') + (operation ? snakeCase(operation) + '_' + snakeCase(name) : snakeCase(name))).toUpperCase();

export const mergeLocalFields = (options) =>
  union(['_tempId', '_rewrite'], options);

export const createAction = (options, operation, name, payload = {}) => {
  const { transport, validationScheme, localFieldsName, virtualFieldsName } = options;
  const data = parseData(options, operation, payload);

  return {
    reduxwork: {
      name: camelCase(name),
      stage: null,
      operation,
      transport,
      validationScheme,
      [localFieldsName]: options[localFieldsName],
      [virtualFieldsName]: options[virtualFieldsName]
    },
    type: getActionType(options, operation, name),
    data
  };
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