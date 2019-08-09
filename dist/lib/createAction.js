"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mergeLocalFields = exports.getActionType = exports.parseData = void 0;

var _lodash = require("lodash");

var _constants = require("./constants");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parseData = function parseData(options, operation, payload) {
  var keyName = options.keyName;

  if (options.addKeyOnCreate && operation == _constants.ActionOperationEnum.CREATE && !payload[keyName]) {
    var now = new Date().getTime();
    payload._tempId = now;
    payload[keyName] = now;
  }

  return payload;
};

exports.parseData = parseData;

var getActionType = function getActionType(options, operation, name) {
  return (options.prefix + (operation ? (0, _lodash.snakeCase)(operation) + '_' + (0, _lodash.snakeCase)(name) : (0, _lodash.snakeCase)(name))).toUpperCase();
};

exports.getActionType = getActionType;

var mergeLocalFields = function mergeLocalFields(options) {
  return (0, _lodash.union)(['_tempId', '_rewrite'], options);
};

exports.mergeLocalFields = mergeLocalFields;

var _default = function _default(options, operation, name, payload) {
  var _ref;

  var local = options.local,
      transport = options.transport,
      validationScheme = options.validationScheme,
      localFieldsName = options.localFieldsName,
      virtualFieldsName = options.virtualFieldsName;
  var data = parseData(options, operation, payload);
  return _ref = {
    reduxwork: true,
    name: name,
    operation: operation,
    type: getActionType(options, operation, name),
    data: data,
    local: local,
    transport: transport,
    validationScheme: validationScheme
  }, _defineProperty(_ref, localFieldsName, options[localFieldsName]), _defineProperty(_ref, virtualFieldsName, options[virtualFieldsName]), _ref;
};

exports.default = _default;