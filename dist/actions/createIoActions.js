"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIoActions;

var _createAction = _interopRequireDefault(require("../lib/createAction"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createIoActions(name, options) {
  var _ref;

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
  }), _defineProperty(_ref, "find".concat(name), function find(data) {
    var action = 'FIND';
    return (0, _createAction.default)(options, action, name, data);
  }), _defineProperty(_ref, "sync".concat(name), function sync(data) {
    var action = 'SYNC';
    return (0, _createAction.default)(options, action, name, data);
  }), _defineProperty(_ref, "create".concat(name), function create(data) {
    var action = 'CREATE';
    return (0, _createAction.default)(options, action, name, data);
  }), _defineProperty(_ref, "update".concat(name), function update(data) {
    var action = 'UPDATE';
    return (0, _createAction.default)(options, action, name, data);
  }), _defineProperty(_ref, "destroy".concat(name), function destroy(data) {
    var action = 'DESTROY';
    return (0, _createAction.default)(options, action, name, data);
  }), _ref;
}