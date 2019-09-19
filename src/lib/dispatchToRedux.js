import dispatchAction from './dispatchAction';
import { extendActionCompleted } from './createAction';
import { queueRemove } from '../actions/queueActions';

const dispatchToRedux = (options, action) => {
  return dispatchAction(options, action, (serverAction, dispatch, resolve) => {
    dispatch(queueRemove(action.uuid));
    dispatch(extendActionCompleted(serverAction, serverAction.data));
    return resolve(serverAction.data);
  });
};

export default dispatchToRedux;