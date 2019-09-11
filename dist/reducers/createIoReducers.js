"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIoReducer;
exports.removeEntitiesFromState = exports.updateEntitiesInState = exports.mergeEntitiesToState = exports.addEntitiesToState = exports.updateStatusesInState = exports.normalizeToEntities = exports.getAffectedEntities = exports.getEntityFromState = void 0;

var _lodash = require("lodash");

var _normalizr = require("normalizr");

var _selectedUpdate = _interopRequireDefault(require("../lib/selectedUpdate"));

var _fieldsOperations = require("../lib/fieldsOperations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getEntityFromState = function getEntityFromState(state, name) {
  return _defineProperty({}, name, Object.assign({}, state[name]));
};

exports.getEntityFromState = getEntityFromState;

var getAffectedEntities = function getAffectedEntities(state) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _lodash.pickBy)(state, function (value, key) {
    return (0, _lodash.find)(entities, key);
  });
};

exports.getAffectedEntities = getAffectedEntities;

var normalizeToEntities = function normalizeToEntities(data, name, options) {
  var datasets = (0, _lodash.isArray)(data) ? data : [data];
  var normalizedDatasets = datasets.map(function (data) {
    return (0, _normalizr.normalize)(data, options.schema[name]);
  });
  var entities = {};
  normalizedDatasets.forEach(function (data) {
    return data.entities.forEach(function (value, key) {
      return entities[key] = (0, _lodash.unionBy)([value, entities[key]], options.keyName);
    });
  });
  return entities;
};

exports.normalizeToEntities = normalizeToEntities;

var updateStatusesInState = function updateStatusesInState(state) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity) {
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

exports.updateStatusesInState = updateStatusesInState;

var addEntitiesToState = function addEntitiesToState(state) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {
    entity.items = [].concat(_toConsumableArray(entity.items), _toConsumableArray(entities[name].items));
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

exports.addEntitiesToState = addEntitiesToState;

var mergeEntitiesToState = function mergeEntitiesToState(state) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {
    entity.items = (0, _lodash.unionBy)([entities[name].items, entity.items], options.keyName);
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

exports.mergeEntitiesToState = mergeEntitiesToState;

var updateEntitiesInState = function updateEntitiesInState(state) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {
    var _entities$name$items = _slicedToArray(entities[name].items, 1),
        data = _entities$name$items[0];

    var updatedItem = (0, _lodash.find)(entity.items, function (item) {
      return item[options.keyName] == data[options.keyName];
    });
    entity.items.splice((0, _lodash.findIndex)(entity.items, function (item) {
      return item[options.keyName] == data[options.keyName];
    }), 1, Object.assign({}, updatedItem, data));
    entity.updatedItem = updatedItem;
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

exports.updateEntitiesInState = updateEntitiesInState;

var removeEntitiesFromState = function removeEntitiesFromState(state) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {
    var _entities$name$items2 = _slicedToArray(entities[name].items, 1),
        data = _entities$name$items2[0];

    var update = {};
    update.destroyedItem = (0, _lodash.find)(entity.items, function (item) {
      return item[options.keyName] == data[options.keyName];
    });
    update.destroyedItemIndex = (0, _lodash.findIndex)(entity.items, function (item) {
      return item[options.keyName] == data[options.keyName];
    });
    entity.items.splice(update.destroyedItemIndex, 1);
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

exports.removeEntitiesFromState = removeEntitiesFromState;

function createIoReducer(name) {
  var _Object$assign;

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
  var actionName = (0, _lodash.toUpper)((0, _lodash.snakeCase)(name));
  if (!options.schema || !options.schema[name]) throw new Error('Missing normalize scheme');
  return Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, "RW_FIND_".concat(actionName), function RW_FIND_(state, action) {
    var entities = getEntityFromState(state, name);
    var statuses = {
      isFinding: true,
      findError: null
    };
    statuses.query = action.data && !(0, _lodash.isEmpty)(action.data) ? action.data : null;
    if (!(0, _lodash.isEqual)(statuses.query, state.query)) statuses.items = [];
    return updateStatusesInState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_FIND_".concat(actionName, "_FAILED"), function RW_FIND__FAILED(state, action) {
    var entities = getEntityFromState(state, name);
    var statuses = {
      findError: action.error || null,
      validationError: action.validationError || null,
      isFinding: false
    };
    return updateStatusesInState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_FIND_".concat(actionName, "_COMPLETED"), function RW_FIND__COMPLETED(state, action) {
    var entities = normalizeToEntities(action.data, name, options);
    var statuses = {
      init: true,
      isFinding: false,
      findError: null,
      validationError: null,
      items: action.data
    };
    return mergeEntitiesToState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_RECEIVE_".concat(actionName), function RW_RECEIVE_(state, action) {
    var entities = normalizeToEntities(action.data, name, options);
    return mergeEntitiesToState(state, entities);
  }), _defineProperty(_Object$assign, "RW_REMOVE_".concat(actionName), function RW_REMOVE_(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_CREATE_".concat(actionName), function RW_CREATE_(state, action) {
    var item = Object.assign({}, (0, _fieldsOperations.omitVirtualFields)(action.data, options), {
      _temp: true
    });
    var normalizedData = (0, _normalizr.normalize)(item, options.schema[name]);
    var entities = (0, _lodash.mapValues)(normalizedData.entities, function (entity) {
      return {
        items: (0, _lodash.flatMap)(entity)
      };
    });
    var statuses = {
      isWriting: true
    };
    return addEntitiesToState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_CREATE_".concat(actionName, "_FAILED"), function RW_CREATE__FAILED(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_CREATE_".concat(actionName, "_COMPLETED"), function RW_CREATE__COMPLETED(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_UPDATE_".concat(actionName), function RW_UPDATE_(state, action) {
    var update = {
      isWriting: true
    };
    var data = (0, _fieldsOperations.omitVirtualFields)(action.data, options);

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
  }), _defineProperty(_Object$assign, "RW_UPDATE_".concat(actionName, "_FAILED"), function RW_UPDATE__FAILED(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_UPDATE_".concat(actionName, "_COMPLETED"), function RW_UPDATE__COMPLETED(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_DESTROY_".concat(actionName), function RW_DESTROY_(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_DESTROY_".concat(actionName, "_FAILED"), function RW_DESTROY__FAILED(state, action) {
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
  }), _defineProperty(_Object$assign, "RW_DESTROY_".concat(actionName, "_COMPLETED"), function RW_DESTROY__COMPLETED(state) {
    var selected = (0, _selectedUpdate.default)(options, state, state.items);
    return Object.assign({}, state, {
      isWriting: false,
      destroyError: null,
      validationError: null,
      destroyedItem: null,
      destroyedItemIndex: null
    }, selected);
  }), _defineProperty(_Object$assign, "RW_CLEAR_".concat(actionName), function RW_CLEAR_(state) {
    return Object.assign({}, state, {
      items: [],
      selected: null
    });
  }), _defineProperty(_Object$assign, "RW_SELECT_".concat(actionName), function RW_SELECT_(state, action) {
    var selected = null;
    if ((0, _lodash.isString)(action.data) || (0, _lodash.isNumber)(action.data)) selected = (0, _lodash.find)(state.items, function (item) {
      return item[options.keyName] == action.data;
    });else if ((0, _lodash.isObject)(action.data) && action.data[options.keyName]) selected = (0, _lodash.find)(state.items, function (item) {
      return item[options.keyName] == action.data[options.keyName];
    }) || action.data;else selected = action.data;
    return Object.assign({}, state, {
      selected: selected
    });
  }), _defineProperty(_Object$assign, "RW_RESET_".concat(actionName), function RW_RESET_() {
    return Object.assign({}, initialState);
  }), _Object$assign), customActions);
}