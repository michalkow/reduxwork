import buildFetchOptions from './buildFetchOptions';
import buildURL from './buildURL';

export default function fetchDispatcher(config, action, name, dispatch, payload, cb) {
  console.log('fetchDispatcher')
  action = action.toUpperCase();
  if(!config) config = {};
  if(config.fetchFunction) {
    console.log( 
      buildURL(config, action, name, payload), 
      buildFetchOptions(config, action, payload) 
    )
    return new Promise((resolve, reject) => {
      config.fetchFunction( 
        buildURL(config, action, name, payload), 
        buildFetchOptions(config, action, payload) 
      )
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log('server res', json)
        console.log('cb', cb)
        if(json.err) {
          dispatch({
            type: action+'_'+name.toUpperCase()+'_FAILED',
            error: json.err
          });
          reject(json.err);
        } else {
          dispatch({
            type: action+'_'+name.toUpperCase()+'_COMPLETED',
            data: json
          });
          resolve(json);
        }
        if(cb) cb(json.err, json);
        return cb;
      })
    });
  }
}