import { omitVirtualFields, omitLocalFields } from './fieldsOperations';

const dispatchToSocket = (state, action, next) => {
  const { socket, socketEventName, validation, actionInject } = this.options;

  if (!socket)
    throw new Error('Reduxwork: socket is not configured.');

  return next((dispatch) => {
    // Dispatch Local Action
    dispatch(omitVirtualFields(action));

    return new Promise((resolve, reject) => {
      const serverAction = omitLocalFields(actionInject(action));

      if (validation && action.validationScheme) {
        let validationError = validation(serverAction.data, action.validationScheme);
        if (validationError) {
          let failedValidationAction = {
            type: action.type + '_FAILED',
            validationError: validationError
          };
          dispatch(failedValidationAction);
          return reject(validationError);
        }
      }

      socket.emit(socketEventName, serverAction, (error, data) => {
        if (error) {
          let failedAction = {
            type: action.type + '_FAILED',
            error
          };
          dispatch(failedAction);
          return reject(error);
        }

        let completedAction = {
          type: action.type + '_COMPLETED',
          data
        };
        dispatch(completedAction);
        return resolve(data);
      });
    });
  });
};

export default dispatchToSocket;