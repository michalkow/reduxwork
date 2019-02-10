import buildAction from '../lib/buildAction';

export function createSocketPostAction(config = {}, name) {
  const action = 'POST';
  config.type = 'socket';
  return function (data, cb) {
    return buildAction(config, action, name, data, cb);
  };
}

export function createFetchPostAction(config = {}, name) {
  const action = 'POST';
  config.type = 'fetch';
  return function (data, cb) {
    return buildAction(config, action, name, data, cb);
  };
}

export function createPostAction(config, name) {
  if (config.type == 'socket')
    return createSocketPostAction(config, name);
  if (config.type == 'fetch')
    return createFetchPostAction(config, name);
}