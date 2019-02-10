"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createReducer(reducerName) {
  var customState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var customActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var initialState = Object.assign({}, customState);
  var name = (0, _lodash.toUpper)((0, _lodash.snakeCase)(reducerName));
  return function () {
    var rState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var rAction = arguments.length > 1 ? arguments[1] : undefined;
    var defaultActions = Object.assign(_defineProperty({}, "RESET_".concat(name), function RESET_() {
      return Object.assign({}, initialState);
    }));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}