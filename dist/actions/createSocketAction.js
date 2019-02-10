"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSocketAction;

var _buildAction = _interopRequireDefault(require("../lib/buildAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketAction() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, null, name, data, cb);
  };
}