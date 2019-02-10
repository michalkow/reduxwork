"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketPostAction = createSocketPostAction;
exports.createFetchPostAction = createFetchPostAction;
exports.createPostAction = createPostAction;

var _buildAction = _interopRequireDefault(require("../lib/buildAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketPostAction() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'POST';
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createFetchPostAction() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'POST';
  config.type = 'fetch';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createPostAction(config, name) {
  if (config.type == 'socket') return createSocketPostAction(config, name);
  if (config.type == 'fetch') return createFetchPostAction(config, name);
}