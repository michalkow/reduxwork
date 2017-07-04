import buildAction from '../lib/buildAction';

export default function createSocketAction(config, name, options) {
  if(!options) options = {};
  options.type = "socket";
  return function (data, cb) {
    return buildAction(config, null, name, data, cb, options)
  }
}
