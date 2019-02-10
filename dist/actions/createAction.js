"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAction;

function createAction(name, binding) {
  return function (data) {
    var action = {
      type: name
    };
    if (binding) action[binding] = data;
    return action;
  };
}