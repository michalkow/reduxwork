import dispatchAction from './dispatchAction';
import buildFetchOptions from './buildFetchOptions';
import buildUrl from './buildUrl';
import getFetchMethod from './getFetchMethod';

const dispatchToFetch = (options, action) => {
  const { fetch } = options;

  if (!fetch)
    throw new Error('Reduxwork: fetch is not configured.');

  return dispatchAction(options, action, (resolve, reject) => {
    const fetchMethod = getFetchMethod(action, options);
    return fetch(
      buildUrl(options, action, fetchMethod),
      buildFetchOptions(options, action, fetchMethod)
    ).then(response => {
      if (response.ok)
        return response.json();
      else
        return reject(response);
    }).then(data =>
      resolve(data)
    );
  });
};

export default dispatchToFetch;