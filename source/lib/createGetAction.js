import buildAction from '../lib/buildAction';

export function createSocketGetAction(config = {}, name) {
  const action = 'GET';
  config.type = 'socket';
  return function (data, cb) {
    return buildAction(config, action, name, data, cb);
  };
}

export function createFetchGetAction(config = {}, name) {
  const action = 'GET';
  config.type = 'fetch';
  return function (data, cb) {
    return buildAction(config, action, name, data, cb);
  };
}

export function createGetAction(config, name) {
  if (config.type == 'socket')
    return createSocketGetAction(config, name);
  if (config.type == 'fetch')
    return createFetchGetAction(config, name);
}