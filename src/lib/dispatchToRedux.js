import dispatchAction from './dispatchAction';
import { extendActionCompleted } from './createAction';

const dispatchToRedux = (options, action) => {
  return dispatchAction(options, action, (serverAction, dispatch, resolve) => {
    dispatch(extendActionCompleted(serverAction, serverAction.data));
    return resolve(serverAction.data);
  });
};

export default dispatchToRedux;