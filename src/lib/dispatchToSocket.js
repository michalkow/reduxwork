import dispatchAction from './dispatchAction';
import { extendActionFailed, extendActionCompleted } from './createAction';

const dispatchToSocket = (options, action) => {
  const { socket, socketEventName } = options;

  if (!socket)
    throw new Error('Reduxwork: socket is not configured.');

  return dispatchAction(options, action, (serverAction, dispatch, resolve, reject) => {
    socket.emit(socketEventName, serverAction, (error, data) => {
      if (error) {
        dispatch(extendActionFailed(action, error));
        return reject(error);
      }

      dispatch(extendActionCompleted(action, data));
      return resolve(data);
    });
  });
};

export default dispatchToSocket;