"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.omitLocalFields = exports.omitVirtualFields = exports.omitFields = void 0;

var _lodash = require("lodash");

var omitFields = function omitFields(action, fieldsType) {
  if (!action[fieldsType]) return action;
  return Object.assign({}, action, {
    data: (0, _lodash.omit)(action.data, action[fieldsType])
  });
};

exports.omitFields = omitFields;

var omitVirtualFields = function omitVirtualFields(action, options) {
  return omitFields(action, options.virtualFieldsName);
};

exports.omitVirtualFields = omitVirtualFields;

var omitLocalFields = function omitLocalFields(action, options) {
  return omitFields(action, options.localFieldsName);
};

exports.omitLocalFields = omitLocalFields;