"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripFields = stripFields;
exports.parseFields = parseFields;
exports.stripVirtualFields = stripVirtualFields;
exports.stripLocalFields = stripLocalFields;
exports.parseVirtualFields = parseVirtualFields;
exports.parseLocalFields = parseLocalFields;
exports.stripVirtualParseLocalFields = stripVirtualParseLocalFields;

var _lodash = require("lodash");

function stripFields() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = arguments.length > 1 ? arguments[1] : undefined;
  var prefix = arguments.length > 2 ? arguments[2] : undefined;
  var prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual'
  };
  if ((0, _lodash.isArray)(data)) return (0, _lodash.map)(data, function (value) {
    return (0, _lodash.omitBy)(value, function (val, key) {
      return (0, _lodash.startsWith)(key, prefixes[prefix]);
    });
  });
  return (0, _lodash.omitBy)(data, function (val, key) {
    return (0, _lodash.startsWith)(key, prefixes[prefix]);
  });
}

function parseFields() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = arguments.length > 1 ? arguments[1] : undefined;
  var prefix = arguments.length > 2 ? arguments[2] : undefined;
  var prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual'
  };
  return (0, _lodash.mapKeys)(data, function (val, key) {
    return (0, _lodash.startsWith)(key, prefixes[prefix]) ? (0, _lodash.lowerFirst)((0, _lodash.replace)(key, prefixes[prefix], '')) : key;
  });
}

function stripVirtualFields(config, data) {
  return stripFields(config, data, 'virtual');
}

function stripLocalFields(config, data) {
  return stripFields(config, data, 'local');
}

function parseVirtualFields(config, data) {
  return parseFields(config, data, 'virtual');
}

function parseLocalFields(config, data) {
  return parseFields(config, data, 'local');
}

function stripVirtualParseLocalFields(config, data) {
  return parseFields(config, stripFields(config, data, 'virtual'), 'local');
}