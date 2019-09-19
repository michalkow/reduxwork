import dispatchAction from './dispatchAction';
import { extendActionFailed, extendActionCompleted } from './createAction';
import { queueRemove } from '../actions/queueActions';

const dispatchToSocket = (options, queue, action) => {
  const { socket, socketEventName } = options;

  if (!socket)
    throw new Error('Reduxwork: socket is not configured.');

  return dispatchAction(options, queue, action, (serverAction, dispatch, resolve, reject) => {
    delete serverAction.reduxwork;
    socket.emit(socketEventName, serverAction, (error, data) => {
      dispatch(queueRemove(action.uuid));

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