"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketActions = createSocketActions;
exports.createFetchActions = createFetchActions;
exports.createIoActions = createIoActions;

var _buildAction = _interopRequireDefault(require("../lib/buildAction"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSocketActions() {
  var _ref;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  config.type = 'socket';
  return _ref = {}, _defineProperty(_ref, "clear".concat(name), function clear() {
    return {
      type: 'CLEAR_' + (0, _lodash.snakeCase)(name).toUpperCase()
    };
  }), _defineProperty(_ref, "reset".concat(name), function reset() {
    return {
      type: 'RESET_' + (0, _lodash.snakeCase)(name).toUpperCase()
    };
  }), _defineProperty(_ref, "select".concat(name), function select(data) {
    return {
      type: 'SELECT_' + (0, _lodash.snakeCase)(name).toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, "find".concat(name), function find(data, cb) {
    var action = 'FIND';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, "sync".concat(name), function sync(data, cb) {
    var action = 'SYNC';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, "create".concat(name), function create(data, cb) {
    var action = 'CREATE';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, "update".concat(name), function update(data, cb) {
    var action = 'UPDATE';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, "destroy".concat(name), function destroy(data, cb) {
    var action = 'DESTROY';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _ref;
}

function createFetchActions() {
  var _ref2;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 ? arguments[1] : undefined;
  config.type = 'fetch';
  return _ref2 = {}, _defineProperty(_ref2, "clear".concat(name), function clear() {
    return {
      type: 'CLEAR_' + (0, _lodash.snakeCase)(name).toUpperCase()
    };
  }), _defineProperty(_ref2, "reset".concat(name), function reset() {
    return {
      type: 'RESET_' + (0, _lodash.snakeCase)(name).toUpperCase()
    };
  }), _defineProperty(_ref2, "select".concat(name), function select(data) {
    return {
      type: 'SELECT_' + (0, _lodash.snakeCase)(name).toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref2, "find".concat(name), function find(data, cb) {
    var action = 'FIND';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, "sync".concat(name), function sync(data, cb) {
    var action = 'SYNC';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, "create".concat(name), function create(data, cb) {
    var action = 'CREATE';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, "update".concat(name), function update(data, cb) {
    var action = 'UPDATE';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, "destroy".concat(name), function destroy(data, cb) {
    var action = 'DESTROY';
    return (0, _buildAction.default)(config, action, name, data, cb);
  }), _ref2;
}

function createIoActions(config, name) {
  if (config.type == 'socket') return createSocketActions(config, name);
  if (config.type == 'fetch') return createFetchActions(config, name);
}