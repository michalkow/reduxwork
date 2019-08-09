"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _fieldsOperations = require("./fieldsOperations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dispatchToSocket = function dispatchToSocket(options, action, next) {
  var socket = options.socket,
      socketEventName = options.socketEventName,
      validation = options.validation,
      actionInject = options.actionInject;
  if (!socket) throw new Error('Reduxwork: socket is not configured.');
  return next(function (dispatch) {
    // Dispatch Local Action
    dispatch((0, _fieldsOperations.omitVirtualFields)(action));
    return new _bluebird.default(function (resolve, reject) {
      var serverAction = (0, _fieldsOperations.omitLocalFields)(actionInject(action));

      if (validation && action.validationScheme) {
        var validationError = validation(serverAction.data, action.validationScheme);

        if (validationError) {
          var failedValidationAction = {
            type: action.type + '_FAILED',
            validationError: validationError
          };
          dispatch(failedValidationAction);
          return reject(validationError);
        }
      }

      socket.emit(socketEventName, serverAction, function (error, data) {
        if (error) {
          var failedAction = {
            type: action.type + '_FAILED',
            error: error
          };
          dispatch(failedAction);
          return reject(error);
        }

        var completedAction = {
          type: action.type + '_COMPLETED',
          data: data
        };
        dispatch(completedAction);
        return resolve(data);
      });
    });
  });
};

var _default = dispatchToSocket;
exports.default = _default;