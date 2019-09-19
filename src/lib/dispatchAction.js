import { omitVirtualFields, omitLocalFields } from './fieldsOperations';
import { TransportMethodEnum } from './constants';
import { extendActionLocal, extendActionFailedValidation } from './createAction';
import { queueAdd, queueRemove } from '../actions/queueActions';

const dispatchAction = (options, queue, action, dispatchMethod) => {
  const { validation, actionInject } = options;

  return (dispatch) => {
    // Dispatch Local Action
    dispatch(queueAdd(action));
    dispatch(extendActionLocal(action));

    queue.add(() =>
      new Promise((resolve, reject) => {
        const serverAction = omitLocalFields(actionInject(action), options);

        if (validation && action.validationScheme) {
          let validationError = validation(serverAction.data, action.validationScheme);
          if (validationError) {
            dispatch(queueRemove(action.uuid));
            dispatch(extendActionFailedValidation(action, validationError));
            return reject(validationError);
          }
        }

        return dispatchMethod(serverAction, dispatch, resolve, reject);
      })
    );
  };
};

export default dispatchAction;