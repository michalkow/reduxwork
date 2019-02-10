"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketGetAction = createSocketGetAction;
exports.createFetchGetAction = createFetchGetAction;
exports.createGetAction = createGetAction;

var _buildAction = _interopRequireDefault(require("../lib/buildAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketGetAction() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'GET';
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createFetchGetAction() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'GET';
  config.type = 'fetch';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createGetAction(config, name) {
  if (config.type == 'socket') return createSocketGetAction(config, name);
  if (config.type == 'fetch') return createFetchGetAction(config, name);
}