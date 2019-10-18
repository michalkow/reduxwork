import buildAction from './buildAction';

export default function createSocketAction(config = {}, name) {
  config.type = 'socket';
  return function (data, cb) {
    return buildAction(config, null, name, data, cb);
  };
}