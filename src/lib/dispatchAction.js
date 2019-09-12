import { omitVirtualFields, omitLocalFields } from './fieldsOperations';
import { TransportMethodEnum } from './constants';
import { extendActionRedux, extendActionFailedValidation } from './createAction';

const dispatchAction = (options, action, dispatchMethod) => {
  const { validation, actionInject } = options;

  return (dispatch) => {
    // Dispatch Local Action
    if (!action.reduxwork.queued && action.reduxwork.transport != TransportMethodEnum.REDUX)
      dispatch(extendActionRedux(action));

    return new Promise((resolve, reject) => {
      const serverAction = omitLocalFields(actionInject(action), options);

      if (validation && action.validationScheme) {
        let validationError = validation(serverAction.data, action.validationScheme);
        if (validationError) {
          dispatch(extendActionFailedValidation(action, validationError));
          return reject(validationError);
        }
      }

      return dispatchMethod(serverAction, dispatch, resolve, reject);
    });
  };
};

export default dispatchAction;