import dispatchAction from './dispatchAction';
import { parseVirtualData } from './fieldsOperations';

const dispatchToSocket = (options, action) => {
  const { socket, socketEventName, actionInject } = options;

  if (!socket)
    throw new Error('Reduxwork: socket is not configured.');

  return dispatchAction(options, action, (resolve, reject) => {
    const socketAction = actionInject({
      type: action.type,
      data: parseVirtualData(action, options)
    });
    socket.emit(socketEventName, socketAction, (error, data) => {
      if (error)
        return reject(error);

      return resolve(data);
    });
  });
};

export default dispatchToSocket;