"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIoReducers;

var _lodash = require("lodash");

var _selectedUpdate = _interopRequireDefault(require("../lib/selectedUpdate"));

var _fieldsOperations = require("../lib/fieldsOperations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createIoReducers(reducerName) {
  var customState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var customActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    isFinding: false,
    isSyncing: false,
    isWriting: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    validationError: null,
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
      var find = {
        isFinding: true,
        findError: null
      };
      find.query = action.data && !(0, _lodash.isEmpty)(action.data) ? action.data : null;
      if (!(0, _lodash.isEqual)(find.query, state.query)) find.items = [];
      return Object.assign({}, state, find);
    }), _defineProperty(_Object$assign, "FIND_".concat(name, "_FAILED"), function FIND__FAILED(state, action) {
      return Object.assign({}, state, {
        findError: action.error || null,
        validationError: action.validationError || null,
        isFinding: false
      });
    }), _defineProperty(_Object$assign, "FIND_".concat(name, "_COMPLETED"), function FIND__COMPLETED(state, action) {
      var selected = (0, _selectedUpdate.default)(options, state, action.data);
      return Object.assign({}, state, {
        init: true,
        isFinding: false,
        findError: null,
        validationError: null,
        items: action.data
      }, selected);
    }), _defineProperty(_Object$assign, "SYNC_".concat(name), function SYNC_(state) {
      return Object.assign({}, state, {
        isSyncing: true,
        syncError: null
      });
    }), _defineProperty(_Object$assign, "SYNC_".concat(name, "_FAILED"), function SYNC__FAILED(state, action) {
      return Object.assign({}, state, {
        syncError: action.error || null,
        validationError: action.validationError || null,
        isSyncing: false
      });
    }), _defineProperty(_Object$assign, "SYNC_".concat(name, "_COMPLETED"), function SYNC__COMPLETED(state, action) {
      var data = action.data;
      if (!(0, _lodash.isArray)(data)) data = [data];
      var items = (0, _lodash.unionBy)(data, _toConsumableArray(state.items), options.keyName);
      var selected = (0, _selectedUpdate.default)(options, state, items);
      return Object.assign({}, state, {
        isSyncing: false,
        syncError: null,
        validationError: null,
        init: true,
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, "RECEIVE_".concat(name), function RECEIVE_(state, action) {
      var data = action.data;
      if (!(0, _lodash.isArray)(data)) data = [data];
      var update = (0, _lodash.map)(data, function (obj) {
        var existing = (0, _lodash.find)(state.items, function (item) {
          return item[options.keyName] == obj[options.keyName];
        });
        return existing ? Object.assign({}, existing, obj) : obj;
      });
      var items = (0, _lodash.unionBy)(update, _toConsumableArray(state.items), options.keyName);
      var selected = (0, _selectedUpdate.default)(options, state, items);
      return Object.assign({}, state, {
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, "REMOVE_".concat(name), function REMOVE_(state, action) {
      var update = {};
      var data = action.data;

      var items = _toConsumableArray(state.items);

      if (!(0, _lodash.isArray)(data)) data = [data];
      (0, _lodash.each)(data, function (obj) {
        if (obj[options.keyName]) items.splice((0, _lodash.findIndex)(items, function (item) {
          return item[options.keyName] == obj[options.keyName];
        }), 1);
      });
      update.items = items;
      var selected = update.items ? (0, _selectedUpdate.default)(options, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, "CREATE_".concat(name), function CREATE_(state, action) {
      var item = Object.assign({}, (0, _fieldsOperations.omitVirtualFields)(options, action.data), {
        _temp: true
      });
      return Object.assign({}, state, {
        isWriting: true,
        items: [].concat(_toConsumableArray(state.items), [item])
      });
    }), _defineProperty(_Object$assign, "CREATE_".concat(name, "_FAILED"), function CREATE__FAILED(state, action) {
      var items = _toConsumableArray(state.items);

      if (action._tempId) {
        items = (0, _lodash.filter)(items, function (item) {
          return item[options.keyName] != action._tempId;
        });
      }

      return Object.assign({}, state, {
        isWriting: false,
        items: items,
        writeError: action.error || null,
        validationError: action.validationError || null
      });
    }), _defineProperty(_Object$assign, "CREATE_".concat(name, "_COMPLETED"), function CREATE__COMPLETED(state, action) {
      var items = _toConsumableArray(state.items);

      if (action._tempId) {
        items = (0, _lodash.filter)(items, function (item) {
          return item[options.keyName] != action._tempId;
        });
      }

      return Object.assign({}, state, {
        isWriting: false,
        writeError: null,
        validationError: null,
        items: [].concat(_toConsumableArray(items), [action.data])
      });
    }), _defineProperty(_Object$assign, "UPDATE_".concat(name), function UPDATE_(state, action) {
      var update = {
        isWriting: true
      };
      var data = (0, _fieldsOperations.omitVirtualFields)(options, action.data);

      if ((0, _lodash.isObject)(data) && data[options.keyName]) {
        var items = _toConsumableArray(state.items);

        var updatedItem = (0, _lodash.find)(items, function (item) {
          return item[options.keyName] == data[options.keyName];
        });
        items.splice((0, _lodash.findIndex)(items, function (item) {
          return item[options.keyName] == data[options.keyName];
        }), 1, Object.assign({}, updatedItem, data));
        update.updatedItem = updatedItem;
        update.items = items;
      }

      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, "UPDATE_".concat(name, "_FAILED"), function UPDATE__FAILED(state, action) {
      var update = {
        isWriting: false,
        updateError: action.error || null,
        validationError: action.validationError || null,
        updatedItem: null
      };

      if (state.updatedItem && state.updatedItem[options.keyName]) {
        var items = _toConsumableArray(state.items);

        items.splice((0, _lodash.findIndex)(items, function (item) {
          return item[options.keyName] == state.updatedItem[options.keyName];
        }), 1, state.updatedItem);
        update.items = items;
      }

      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, "UPDATE_".concat(name, "_COMPLETED"), function UPDATE__COMPLETED(state, action) {
      var update = {
        isWriting: false,
        updateError: null,
        validationError: null,
        updatedItem: null
      };

      if (action._rewrite || options.rewriteOnUpdate && action._rewrite !== false) {
        var items = _toConsumableArray(state.items);

        var data = action.data;
        if (!(0, _lodash.isArray)(data)) data = [data];
        update.items = (0, _lodash.unionBy)(data, items, options.keyName);
      }

      var selected = update.items ? (0, _selectedUpdate.default)(options, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, "DESTROY_".concat(name), function DESTROY_(state, action) {
      var update = {
        isWriting: true
      };

      if (action.data[options.keyName]) {
        var items = _toConsumableArray(state.items);

        update.destroyedItem = (0, _lodash.find)(items, function (item) {
          return item[options.keyName] == action.data[options.keyName];
        });
        update.destroyedItemIndex = (0, _lodash.findIndex)(items, function (item) {
          return item[options.keyName] == action.data[options.keyName];
        });
        items.splice(update.destroyedItemIndex, 1);
        update.items = items;
      }

      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, "DESTROY_".concat(name, "_FAILED"), function DESTROY__FAILED(state, action) {
      var update = {
        isWriting: false,
        destroyError: action.error || null,
        validationError: action.validationError || null,
        destroyedItem: null,
        destroyedItemIndex: null
      };

      if (state.destroyedItem && state.destroyedItemIndex != null) {
        var items = _toConsumableArray(state.items);

        items.splice(state.destroyedItemIndex, 0, state.destroyedItem);
        update.items = items;
      }

      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, "DESTROY_".concat(name, "_COMPLETED"), function DESTROY__COMPLETED(state) {
      var selected = (0, _selectedUpdate.default)(options, state, state.items);
      return Object.assign({}, state, {
        isWriting: false,
        destroyError: null,
        validationError: null,
        destroyedItem: null,
        destroyedItemIndex: null
      }, selected);
    }), _defineProperty(_Object$assign, "CLEAR_".concat(name), function CLEAR_(state) {
      return Object.assign({}, state, {
        items: [],
        selected: null
      });
    }), _defineProperty(_Object$assign, "SELECT_".concat(name), function SELECT_(state, action) {
      var selected = null;
      if ((0, _lodash.isString)(action.data) || (0, _lodash.isNumber)(action.data)) selected = (0, _lodash.find)(state.items, function (item) {
        return item[options.keyName] == action.data;
      });else if ((0, _lodash.isObject)(action.data) && action.data[options.keyName]) selected = (0, _lodash.find)(state.items, function (item) {
        return item[options.keyName] == action.data[options.keyName];
      }) || action.data;else selected = action.data;
      return Object.assign({}, state, {
        selected: selected
      });
    }), _defineProperty(_Object$assign, "RESET_".concat(name), function RESET_() {
      return Object.assign({}, initialState);
    }), _Object$assign));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}