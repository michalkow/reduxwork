"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createRootRecucer = function createRootRecucer(reduxworkReducer, combinedReducer) {
  return function (state, action) {
    if (action.reduxwork && reduxworkReducer[action.type]) return reduxworkReducer[action.type](state, action);else if (combinedReducer) return combinedReducer(state, action);else return state;
  };
};

var _default = createRootRecucer;
exports.default = _default;