"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLocalActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createLocalActions(config, name) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, "find".concat(name), function find(data) {
    return {
      type: 'FIND_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, "sync".concat(name), function sync(data) {
    return {
      type: 'SYNC_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, "clear".concat(name), function clear() {
    return {
      type: 'CLEAR_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, "reset".concat(name), function reset() {
    return {
      type: 'RESET_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, "select".concat(name), function select(data) {
    return {
      type: 'SELECT_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, "create".concat(name), function create(data) {
    return {
      type: 'CREATE_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, "update".concat(name), function update(data) {
    return {
      type: 'UPDATE_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, "destroy".concat(name), function destroy(data) {
    return {
      type: 'DESTROY_' + name.toUpperCase(),
      data: data
    };
  }), _ref;
}