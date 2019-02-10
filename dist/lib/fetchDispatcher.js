"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchDispatcher;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _lodash = require("lodash");

var _buildFetchOptions = _interopRequireDefault(require("./buildFetchOptions"));

var _buildURL = _interopRequireDefault(require("./buildURL"));

var _getFetchMethod = _interopRequireDefault(require("./getFetchMethod"));

var _fieldsOperations = require("./fieldsOperations");

var _validationHook = _interopRequireDefault(require("./validationHook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchDispatcher() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actionName = arguments.length > 1 ? arguments[1] : undefined;
  var name = arguments.length > 2 ? arguments[2] : undefined;
  var dispatch = arguments.length > 3 ? arguments[3] : undefined;
  var data = arguments.length > 4 ? arguments[4] : undefined;
  var cb = arguments.length > 5 ? arguments[5] : undefined;
  var payload = data && (data._tempId || data._rewrite) ? (0, _lodash.omit)(data, ['_tempId', '_rewrite']) : data;
  var action = actionName.toUpperCase();

  if (config.fetchFunction) {
    return new _bluebird.default(function (resolve, reject) {
      if (config.actionInject) payload = config.actionInject(payload); //TODO: Make logic more similar to socket dispatcher

      var validationError = (0, _validationHook.default)(config, {
        type: action + '_' + name,
        data: payload
      });

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

      payload = (0, _fieldsOperations.stripLocalFields)(config, payload);
      config.fetchFunction((0, _buildURL.default)(config, action, name, payload, (0, _getFetchMethod.default)(config, action)), (0, _buildFetchOptions.default)(config, payload, (0, _getFetchMethod.default)(config, action))).then(function (response) {
        if (response.ok) return response.json();else {
          var error = response.json();
          var failedAction = {
            type: (action ? action + '_' + name : name) + '_FAILED',
            error: error
          };
          if (data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(error);
          if (cb) cb(error, null);
          return error;
        }
      }).then(function (json) {
        var completedAction = {
          type: (action ? action + '_' + name : name) + '_COMPLETED',
          data: json
        };
        if (data && data._tempId) completedAction._tempId = data._tempId;
        if (data && typeof data._rewrite !== 'undefined') completedAction._rewrite = data._rewrite;
        dispatch(completedAction);
        resolve(json);
        if (cb) cb(null, json);
        return json;
      });
    });
  }
}