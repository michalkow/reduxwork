import buildAction from '../lib/buildAction';

export default function createSocketAction(config, name) {
  if(!config) config = {};
  config.type = "socket";
  return function (data, cb) {
    return buildAction(config, null, name, data, cb)
  }
}
