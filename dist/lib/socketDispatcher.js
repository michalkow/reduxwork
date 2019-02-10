"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socketDispatcher;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _lodash = require("lodash");

var _fieldsOperations = require("./fieldsOperations");

var _validationHook = _interopRequireDefault(require("./validationHook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function socketDispatcher() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actionName = arguments.length > 1 ? arguments[1] : undefined;
  var name = arguments.length > 2 ? arguments[2] : undefined;
  var dispatch = arguments.length > 3 ? arguments[3] : undefined;
  var data = arguments.length > 4 ? arguments[4] : undefined;
  var cb = arguments.length > 5 ? arguments[5] : undefined;
  var payload = data && (data._tempId || data._rewrite) ? (0, _lodash.omit)(data, ['_tempId', '_rewrite']) : data;
  var action = actionName.toUpperCase();
  if (!config.eventName) config.eventName = 'redux_action_event';

  if (config.socketIoFunction) {
    var actionData = {
      type: action ? action + '_' + name : name
    };
    if (payload) actionData.data = payload;
    if (config.actionInject) actionData = config.actionInject(actionData);
    return new _bluebird.default(function (resolve, reject) {
      var validationError = (0, _validationHook.default)(config, actionData);

      if (validationError) {
        var failedValidationAction = {
          type: (action ? action + '_' + name : name) + '_FAILED',
          validationError: validationError
        };
        if (data && data._tempId) failedValidationAction._tempId = data._tempId;
        dispatch(failedValidationAction);
        reject(validationError);
        return {
          err: validationError,
          res: null
        };
      }

      actionData.data = (0, _fieldsOperations.stripLocalFields)(config, actionData.data);
      config.socketIoFunction(config.eventName, actionData, function (err, res) {
        if (err) {
          var failedAction = {
            type: (action ? action + '_' + name : name) + '_FAILED',
            error: err
          };
          if (data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(err);
        } else {
          var completedAction = {
            type: (action ? action + '_' + name : name) + '_COMPLETED',
            data: res
          };
          if (data && data._tempId) completedAction._tempId = data._tempId;
          if (data && typeof data._rewrite !== 'undefined') completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(res);
        }

        if (cb) cb(err, res);
        return {
          err: err,
          res: res
        };
      });
    });
  }
}