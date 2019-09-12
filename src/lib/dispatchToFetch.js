import dispatchAction from './dispatchAction';
import buildFetchOptions from './buildFetchOptions';
import buildUrl from './buildUrl';
import getFetchMethod from './getFetchMethod';
import { extendActionFailed, extendActionCompleted } from './createAction';

const dispatchToFetch = (options, action) => {
  const { fetch } = options;

  if (!fetch)
    throw new Error('Reduxwork: fetch is not configured.');

  return dispatchAction(options, action, (serverAction, dispatch, resolve, reject) => {
    const fetchMethod = getFetchMethod(options, action);
    fetch(
      buildUrl(options, serverAction, fetchMethod),
      buildFetchOptions(options, serverAction, fetchMethod)
    ).then(response => {
      if (response.ok)
        return response.json();
      else {
        const error = response.json();
        dispatch(extendActionFailed(action, error));
        return reject(error);
      }
    }).then(data => {
      //if (data && data._tempId) completedAction._tempId = data._tempId;
      //if (data && typeof data._rewrite !== 'undefined') completedAction._rewrite = data._rewrite;
      dispatch(extendActionCompleted(action, data));
      return resolve(data);
    });
  });
};

export default dispatchToFetch;