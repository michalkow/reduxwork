"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildAction;

var _lodash = require("lodash");

var _socketDispatcher = _interopRequireDefault(require("./socketDispatcher"));

var _fetchDispatcher = _interopRequireDefault(require("./fetchDispatcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildAction(config, action, name, data, cb) {
  return function (dispatch) {
    if (config.addKeyOnCreate && action == 'CREATE') {
      var keyName = config.keyName || 'id';
      var prefix = config.localPrefix || 'local';
      var prefixedKeyName = prefix + (0, _lodash.upperFirst)(keyName);

      if (!data[keyName] && !data[prefixedKeyName]) {
        data._tempId = new Date().getTime();
        data[prefixedKeyName] = data._tempId;
      }
    }

    var formatedName = (0, _lodash.snakeCase)(name).toUpperCase();
    var actionData = {
      type: action ? action + '_' + formatedName : formatedName,
      data: data && data._tempId ? (0, _lodash.omit)(data, '_tempId') : data
    };
    dispatch(actionData);
    if (config.type == 'socket') return (0, _socketDispatcher.default)(config, action, formatedName, dispatch, data, cb);else if (config.type == 'fetch') return (0, _fetchDispatcher.default)(config, action, formatedName, dispatch, data, cb);
  };
}