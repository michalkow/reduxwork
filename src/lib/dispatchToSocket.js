import { omitVirtualFields, omitLocalFields } from './fieldsOperations';

const dispatchToSocket = (options, action) => {
  const { socket, socketEventName, validation, actionInject } = options;

  if (!socket)
    throw new Error('Reduxwork: socket is not configured.');

  return (dispatch) => {
    // Dispatch Local Action
    //dispatch(Object.assign({}, omitVirtualFields(action, options)), { clientAction: true });

    return new Promise((resolve, reject) => {
      const serverAction = omitLocalFields(actionInject(action), options);

      if (validation && action.validationScheme) {
        let validationError = validation(serverAction.data, action.validationScheme);
        if (validationError) {
          let failedValidationAction = {
            reduxwork: true,
            clientAction: true,
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
            reduxwork: true,
            clientAction: true,
            type: action.type + '_FAILED',
            error
          };
          dispatch(failedAction);
          return reject(error);
        }

        let completedAction = {
          reduxwork: true,
          clientAction: true,
          type: action.type + '_COMPLETED',
          data
        };
        dispatch(completedAction);
        return resolve(data);
      });
    });
  };
};

export default dispatchToSocket;