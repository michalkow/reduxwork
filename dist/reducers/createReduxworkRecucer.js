"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createReduxworkRecucer = function createReduxworkRecucer(reducers) {
  var actions = {};
  reducers.forEach(function (reducer) {
    return reducer.forEach(function (action, name) {
      return actions[name] = action;
    });
  });
  return actions;
};

var _default = createReduxworkRecucer;
exports.default = _default;