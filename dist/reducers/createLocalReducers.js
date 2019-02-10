"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLocalReducers;

var _lodash = require("lodash");

var _selectedUpdate = _interopRequireDefault(require("../lib/selectedUpdate"));

var _fieldsOperations = require("../lib/fieldsOperations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createLocalReducers() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reducerName = arguments.length > 1 ? arguments[1] : undefined;
  var customState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var customActions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!config.keyName) config.keyName = 'id';
  var initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    isFinding: false,
    isSyncing: false,
    isWritting: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    error: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: []
  }, customState);
  var name = (0, _lodash.toUpper)((0, _lodash.snakeCase)(reducerName));
  return function () {
    var _Object$assign;

    var rState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var rAction = arguments.length > 1 ? arguments[1] : undefined;
    var defaultActions = Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, "FIND_".concat(name), function FIND_(state, action) {
      var data = action.data;
      if (!(0, _lodash.isArray)(data)) data = [data];
      var selected = (0, _selectedUpdate.default)(config, state, data);
      return Object.assign({}, state, {
        init: true,
        items: data
      }, selected);
    }), _defineProperty(_Object$assign, "SYNC_".concat(name), function SYNC_(state, action) {
      var data = action.data;
      if (!(0, _lodash.isArray)(data)) data = [data];
      var items = (0, _lodash.unionBy)(data, _toConsumableArray(state.items), config.keyName);
      var selected = (0, _selectedUpdate.default)(config, state, items);
      return Object.assign({}, state, {
        init: true,
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, "RECEIVE_".concat(name), function RECEIVE_(state, action) {
      var data = action.data;
      if (!(0, _lodash.isArray)(data)) data = [data];
      var items = (0, _lodash.unionBy)(data, _toConsumableArray(state.items), config.keyName);
      var selected = (0, _selectedUpdate.default)(config, state, items);
      return Object.assign({}, state, {
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, "CREATE_".concat(name), function CREATE_(state, action) {
      return Object.assign({}, state, {
        items: [].concat(_toConsumableArray(state.items), [(0, _fieldsOperations.stripVirtualParseLocalFields)(action.data)])
      });
    }), _defineProperty(_Object$assign, "UPDATE_".concat(name), function UPDATE_(state, action) {
      var update = {};
      var data = (0, _fieldsOperations.stripVirtualParseLocalFields)(action.data);

      if ((0, _lodash.isObject)(data) && data[config.keyName]) {
        var items = _toConsumableArray(state.items);

        var updatedItem = (0, _lodash.find)(items, function (item) {
          return item[config.keyName] == data[config.keyName];
        });
        items.splice((0, _lodash.findIndex)(items, function (item) {
          return item[config.keyName] == data[config.keyName];
        }), 1, Object.assign({}, updatedItem, data));
        update.items = items;
      }

      var selected = update.items ? (0, _selectedUpdate.default)(config, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, "DESTROY_".concat(name), function DESTROY_(state, action) {
      var update = {};

      if (action.data[config.keyName]) {
        var items = _toConsumableArray(state.items);

        update.items = (0, _lodash.reject)(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
        });
      }

      var selected = update.items ? (0, _selectedUpdate.default)(config, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, "CLEAR_".concat(name), function CLEAR_(state) {
      return Object.assign({}, state, {
        items: [],
        selected: null
      });
    }), _defineProperty(_Object$assign, "SELECT_".concat(name), function SELECT_(state, action) {
      return Object.assign({}, state, {
        selected: action.data
      });
    }), _defineProperty(_Object$assign, "RESET_".concat(name), function RESET_() {
      return Object.assign({}, initialState);
    }), _Object$assign));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}