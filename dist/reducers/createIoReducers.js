"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createIoReducer;exports.removeEntitiesFromState = exports.updateEntitiesInState = exports.mergeEntitiesToState = exports.addEntitiesToState = exports.updateStatusesInState = exports.normalizeToEntities = exports.getAffectedEntities = exports.getEntityFromState = void 0;var _lodash = require("lodash");


















var _normalizr = require("normalizr");
var _selectedUpdate = _interopRequireDefault(require("../lib/selectedUpdate"));
var _fieldsOperations = require("../lib/fieldsOperations");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var getEntityFromState = function getEntityFromState(state, name) {return _defineProperty({},
  name, Object.assign({}, state[name]));};exports.getEntityFromState = getEntityFromState;

var getAffectedEntities = function getAffectedEntities(state) {var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
    (0, _lodash.pickBy)(state, function (value, key) {return (0, _lodash.find)(entities, key);}));};exports.getAffectedEntities = getAffectedEntities;

var normalizeToEntities = function normalizeToEntities(data, name, options) {
  var datasets = (0, _lodash.isArray)(data) ? data : [data];
  var normalizedDatasets = datasets.map(function (data) {return (0, _normalizr.normalize)(data, options.schemas[name]);});
  var entities = {};
  normalizedDatasets.forEach(function (data) {return (
      data.entities.forEach(function (value, key) {return (
          entities[key] = (0, _lodash.unionBy)([value, entities[key]], options.keyName));}));});


  return entities;
};exports.normalizeToEntities = normalizeToEntities;

var updateStatusesInState = function updateStatusesInState(state) {var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity) {return (
      Object.assign({}, entity, statuses));});
  return Object.assign({}, state, affectedEntities);
};exports.updateStatusesInState = updateStatusesInState;

var addEntitiesToState = function addEntitiesToState(state) {var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {
    entity.items = [].concat(_toConsumableArray(entity.items), _toConsumableArray(entities[name].items));
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};exports.addEntitiesToState = addEntitiesToState;

var mergeEntitiesToState = function mergeEntitiesToState(state) {var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {
    entity.items = (0, _lodash.unionBy)([entities[name].items, entity.items], options.keyName);
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};exports.mergeEntitiesToState = mergeEntitiesToState;

var updateEntitiesInState = function updateEntitiesInState(state) {var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {var _entities$name$items = _slicedToArray(
    entities[name].items, 1),data = _entities$name$items[0];
    var updatedItem = (0, _lodash.find)(entity.items, function (item) {return item[options.keyName] == data[options.keyName];});
    entity.items.splice(
    (0, _lodash.findIndex)(entity.items, function (item) {return item[options.keyName] == data[options.keyName];}),
    1,
    Object.assign({}, updatedItem, data));

    entity.updatedItem = updatedItem;
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};exports.updateEntitiesInState = updateEntitiesInState;

var removeEntitiesFromState = function removeEntitiesFromState(state) {var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statuses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map(function (entity, name) {var _entities$name$items2 = _slicedToArray(
    entities[name].items, 1),data = _entities$name$items2[0];
    var update = {};
    update.destroyedItem = (0, _lodash.find)(entity.items, function (item) {return item[options.keyName] == data[options.keyName];});
    update.destroyedItemIndex = (0, _lodash.findIndex)(entity.items, function (item) {return item[options.keyName] == data[options.keyName];});
    entity.items.splice(update.destroyedItemIndex, 1);
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};exports.removeEntitiesFromState = removeEntitiesFromState;

function createIoReducer(name) {var _Object$assign;var customState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var customActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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
    items: [] },
  customState);
  var actionName = (0, _lodash.toUpper)((0, _lodash.snakeCase)(name));

  if (!options.schemas || !options.schemas[name])
  throw new Error('Missing normalize scheme');

  return Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, "RW_FIND_".concat(
  actionName), function RW_FIND_(state, action) {
    var entities = getEntityFromState(state, name);
    var statuses = {
      isFinding: true,
      findError: null };

    statuses.query = action.data && !(0, _lodash.isEmpty)(action.data) ? action.data : null;
    if (!(0, _lodash.isEqual)(statuses.query, state.query)) statuses.items = [];
    return updateStatusesInState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_FIND_".concat(

  actionName, "_FAILED"), function RW_FIND__FAILED(state, action) {
    var entities = getEntityFromState(state, name);
    var statuses = {
      findError: action.error || null,
      validationError: action.validationError || null,
      isFinding: false };

    return updateStatusesInState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_FIND_".concat(

  actionName, "_COMPLETED"), function RW_FIND__COMPLETED(state, action) {
    var entities = normalizeToEntities(action.data, name, options);
    var statuses = {
      init: true,
      isFinding: false,
      findError: null,
      validationError: null,
      items: action.data };

    return mergeEntitiesToState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_RECEIVE_".concat(

  actionName), function RW_RECEIVE_(state, action) {
    var entities = normalizeToEntities(action.data, name, options);
    return mergeEntitiesToState(state, entities);
  }), _defineProperty(_Object$assign, "RW_REMOVE_".concat(

  actionName), function RW_REMOVE_(state, action) {
    var update = {};var
    data = action.data;
    var items = _toConsumableArray(state.items);
    if (!(0, _lodash.isArray)(data)) data = [data];
    (0, _lodash.each)(data, function (obj) {
      if (obj[options.keyName])
      items.splice((0, _lodash.findIndex)(items, function (item) {return item[options.keyName] == obj[options.keyName];}), 1);
    });
    update.items = items;
    var selected = update.items ? (0, _selectedUpdate.default)(options, state, update.items) : {};
    return Object.assign({}, state, update, selected);
  }), _defineProperty(_Object$assign, "RW_CREATE_".concat(

  actionName), function RW_CREATE_(state, action) {
    var item = Object.assign({}, (0, _fieldsOperations.omitVirtualFields)(action.data, options), { _temp: true });
    var normalizedData = (0, _normalizr.normalize)(item, options.schemas[name]);
    var entities = (0, _lodash.mapValues)(normalizedData.entities, function (entity) {return { items: (0, _lodash.flatMap)(entity) };});
    var statuses = {
      isWriting: true };

    return addEntitiesToState(state, entities, statuses);
  }), _defineProperty(_Object$assign, "RW_CREATE_".concat(

  actionName, "_FAILED"), function RW_CREATE__FAILED(state, action) {
    var items = _toConsumableArray(state.items);
    if (action._tempId) {
      items = (0, _lodash.filter)(items, function (item) {return item[options.keyName] != action._tempId;});
    }
    return Object.assign({}, state, {
      isWriting: false,
      items: items,
      writeError: action.error || null,
      validationError: action.validationError || null });

  }), _defineProperty(_Object$assign, "RW_CREATE_".concat(

  actionName, "_COMPLETED"), function RW_CREATE__COMPLETED(state, action) {
    var items = _toConsumableArray(state.items);
    if (action._tempId) {
      items = (0, _lodash.filter)(items, function (item) {return item[options.keyName] != action._tempId;});
    }
    return Object.assign({}, state, {
      isWriting: false,
      writeError: null,
      validationError: null,
      items: [].concat(_toConsumableArray(items), [action.data]) });

  }), _defineProperty(_Object$assign, "RW_UPDATE_".concat(

  actionName), function RW_UPDATE_(state, action) {
    var update = {
      isWriting: true };

    var data = (0, _fieldsOperations.omitVirtualFields)(action.data, options);
    if ((0, _lodash.isObject)(data) && data[options.keyName]) {
      var items = _toConsumableArray(state.items);
      var updatedItem = (0, _lodash.find)(items, function (item) {return item[options.keyName] == data[options.keyName];});
      items.splice(
      (0, _lodash.findIndex)(items, function (item) {return item[options.keyName] == data[options.keyName];}),
      1,
      Object.assign({}, updatedItem, data));

      update.updatedItem = updatedItem;
      update.items = items;
    }
    return Object.assign({}, state, update);
  }), _defineProperty(_Object$assign, "RW_UPDATE_".concat(

  actionName, "_FAILED"), function RW_UPDATE__FAILED(state, action) {
    var update = {
      isWriting: false,
      updateError: action.error || null,
      validationError: action.validationError || null,
      updatedItem: null };

    if (state.updatedItem && state.updatedItem[options.keyName]) {
      var items = _toConsumableArray(state.items);
      items.splice(
      (0, _lodash.findIndex)(items, function (item) {return item[options.keyName] == state.updatedItem[options.keyName];}),
      1,
      state.updatedItem);

      update.items = items;
    }
    return Object.assign({}, state, update);
  }), _defineProperty(_Object$assign, "RW_UPDATE_".concat(

  actionName, "_COMPLETED"), function RW_UPDATE__COMPLETED(state, action) {
    var update = {
      isWriting: false,
      updateError: null,
      validationError: null,
      updatedItem: null };

    if (action._rewrite || options.rewriteOnUpdate && action._rewrite !== false) {
      var items = _toConsumableArray(state.items);var
      data = action.data;
      if (!(0, _lodash.isArray)(data)) data = [data];
      update.items = (0, _lodash.unionBy)(data, items, options.keyName);
    }
    var selected = update.items ? (0, _selectedUpdate.default)(options, state, update.items) : {};
    return Object.assign({}, state, update, selected);
  }), _defineProperty(_Object$assign, "RW_DESTROY_".concat(

  actionName), function RW_DESTROY_(state, action) {
    var update = {
      isWriting: true };

    if (action.data[options.keyName]) {
      var items = _toConsumableArray(state.items);
      update.destroyedItem = (0, _lodash.find)(items, function (item) {return item[options.keyName] == action.data[options.keyName];});
      update.destroyedItemIndex = (0, _lodash.findIndex)(items, function (item) {return item[options.keyName] == action.data[options.keyName];});
      items.splice(update.destroyedItemIndex, 1);
      update.items = items;
    }
    return Object.assign({}, state, update);
  }), _defineProperty(_Object$assign, "RW_DESTROY_".concat(

  actionName, "_FAILED"), function RW_DESTROY__FAILED(state, action) {
    var update = {
      isWriting: false,
      destroyError: action.error || null,
      validationError: action.validationError || null,
      destroyedItem: null,
      destroyedItemIndex: null };

    if (state.destroyedItem && state.destroyedItemIndex != null) {
      var items = _toConsumableArray(state.items);
      items.splice(state.destroyedItemIndex, 0, state.destroyedItem);
      update.items = items;
    }
    return Object.assign({}, state, update);
  }), _defineProperty(_Object$assign, "RW_DESTROY_".concat(

  actionName, "_COMPLETED"), function RW_DESTROY__COMPLETED(state) {
    var selected = (0, _selectedUpdate.default)(options, state, state.items);
    return Object.assign({}, state, {
      isWriting: false,
      destroyError: null,
      validationError: null,
      destroyedItem: null,
      destroyedItemIndex: null },
    selected);
  }), _defineProperty(_Object$assign, "RW_CLEAR_".concat(

  actionName), function RW_CLEAR_(state) {
    return Object.assign({}, state, {
      items: [],
      selected: null });

  }), _defineProperty(_Object$assign, "RW_SELECT_".concat(

  actionName), function RW_SELECT_(state, action) {
    var selected = null;
    if ((0, _lodash.isString)(action.data) || (0, _lodash.isNumber)(action.data)) selected = (0, _lodash.find)(state.items, function (item) {return item[options.keyName] == action.data;});else
    if ((0, _lodash.isObject)(action.data) && action.data[options.keyName]) selected = (0, _lodash.find)(state.items, function (item) {return item[options.keyName] == action.data[options.keyName];}) || action.data;else
    selected = action.data;
    return Object.assign({}, state, {
      selected: selected });

  }), _defineProperty(_Object$assign, "RW_RESET_".concat(

  actionName), function RW_RESET_() {
    return Object.assign({}, initialState);
  }), _Object$assign),
  customActions);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9jcmVhdGVJb1JlZHVjZXJzLmpzIl0sIm5hbWVzIjpbImdldEVudGl0eUZyb21TdGF0ZSIsInN0YXRlIiwibmFtZSIsIk9iamVjdCIsImFzc2lnbiIsImdldEFmZmVjdGVkRW50aXRpZXMiLCJlbnRpdGllcyIsInZhbHVlIiwia2V5Iiwibm9ybWFsaXplVG9FbnRpdGllcyIsImRhdGEiLCJvcHRpb25zIiwiZGF0YXNldHMiLCJub3JtYWxpemVkRGF0YXNldHMiLCJtYXAiLCJzY2hlbWFzIiwiZm9yRWFjaCIsImtleU5hbWUiLCJ1cGRhdGVTdGF0dXNlc0luU3RhdGUiLCJzdGF0dXNlcyIsImFmZmVjdGVkRW50aXRpZXMiLCJlbnRpdHkiLCJhZGRFbnRpdGllc1RvU3RhdGUiLCJpdGVtcyIsIm1lcmdlRW50aXRpZXNUb1N0YXRlIiwidXBkYXRlRW50aXRpZXNJblN0YXRlIiwidXBkYXRlZEl0ZW0iLCJpdGVtIiwic3BsaWNlIiwicmVtb3ZlRW50aXRpZXNGcm9tU3RhdGUiLCJ1cGRhdGUiLCJkZXN0cm95ZWRJdGVtIiwiZGVzdHJveWVkSXRlbUluZGV4IiwiY3JlYXRlSW9SZWR1Y2VyIiwiY3VzdG9tU3RhdGUiLCJjdXN0b21BY3Rpb25zIiwiaW5pdGlhbFN0YXRlIiwiaW5pdCIsInNlbGVjdGVkIiwicXVlcnkiLCJpc0ZpbmRpbmciLCJpc1N5bmNpbmciLCJpc1dyaXRpbmciLCJzeW5jRXJyb3IiLCJmaW5kRXJyb3IiLCJ3cml0ZUVycm9yIiwidXBkYXRlRXJyb3IiLCJkZXN0cm95RXJyb3IiLCJ2YWxpZGF0aW9uRXJyb3IiLCJlcnJvciIsImFjdGlvbk5hbWUiLCJFcnJvciIsImFjdGlvbiIsIm9iaiIsIl90ZW1wIiwibm9ybWFsaXplZERhdGEiLCJfdGVtcElkIiwiX3Jld3JpdGUiLCJyZXdyaXRlT25VcGRhdGUiXSwibWFwcGluZ3MiOiIyV0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTtBQUNBO0FBQ0EsMkQ7O0FB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QU8sQ0FBQ00sT0FBcEIsQ0FBN0IsRUFBMkRxQixRQUFRLEdBQUcsa0JBQUtyQyxLQUFLLENBQUNzQixLQUFYLEVBQWtCLFVBQUNJLElBQUQsVUFBVUEsSUFBSSxDQUFDaEIsT0FBTyxDQUFDTSxPQUFULENBQUosSUFBeUJtQyxNQUFNLENBQUMxQyxJQUFQLENBQVlDLE9BQU8sQ0FBQ00sT0FBcEIsQ0FBbkMsRUFBbEIsS0FBc0ZtQyxNQUFNLENBQUMxQyxJQUF4RyxDQUEzRDtBQUNBNEIsSUFBQUEsUUFBUSxHQUFHYyxNQUFNLENBQUMxQyxJQUFsQjtBQUNMLFdBQU9QLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JILEtBQWxCLEVBQXlCO0FBQzlCcUMsTUFBQUEsUUFBUSxFQUFFQSxRQURvQixFQUF6QixDQUFQOztBQUdELEdBeE1JOztBQTBNUVksRUFBQUEsVUExTVIsd0JBME13QjtBQUMzQixXQUFPL0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQmdDLFlBQWxCLENBQVA7QUFDRCxHQTVNSTtBQTZNSkQsRUFBQUEsYUE3TUksQ0FBUDtBQThNRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgdG9VcHBlcixcclxuICBzbmFrZUNhc2UsXHJcbiAgaXNFbXB0eSxcclxuICBpc0VxdWFsLFxyXG4gIGlzQXJyYXksXHJcbiAgdW5pb25CeSxcclxuICBtYXAsXHJcbiAgZmluZCxcclxuICBlYWNoLFxyXG4gIGZpbmRJbmRleCxcclxuICBmaWx0ZXIsXHJcbiAgbWFwVmFsdWVzLFxyXG4gIGZsYXRNYXAsXHJcbiAgcGlja0J5LFxyXG4gIGlzT2JqZWN0LFxyXG4gIGlzU3RyaW5nLFxyXG4gIGlzTnVtYmVyXHJcbn0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSAnbm9ybWFsaXpyJztcclxuaW1wb3J0IHNlbGVjdGVkVXBkYXRlIGZyb20gJy4uL2xpYi9zZWxlY3RlZFVwZGF0ZSc7XHJcbmltcG9ydCB7IG9taXRWaXJ0dWFsRmllbGRzIH0gZnJvbSAnLi4vbGliL2ZpZWxkc09wZXJhdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEVudGl0eUZyb21TdGF0ZSA9IChzdGF0ZSwgbmFtZSkgPT5cclxuICAoeyBbbmFtZV06IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlW25hbWVdKSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBZmZlY3RlZEVudGl0aWVzID0gKHN0YXRlLCBlbnRpdGllcyA9IHt9KSA9PlxyXG4gIHBpY2tCeShzdGF0ZSwgKHZhbHVlLCBrZXkpID0+IGZpbmQoZW50aXRpZXMsIGtleSkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRvRW50aXRpZXMgPSAoZGF0YSwgbmFtZSwgb3B0aW9ucykgPT4ge1xyXG4gIGxldCBkYXRhc2V0cyA9IGlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdO1xyXG4gIGxldCBub3JtYWxpemVkRGF0YXNldHMgPSBkYXRhc2V0cy5tYXAoZGF0YSA9PiBub3JtYWxpemUoZGF0YSwgb3B0aW9ucy5zY2hlbWFzW25hbWVdKSk7XHJcbiAgbGV0IGVudGl0aWVzID0ge307XHJcbiAgbm9ybWFsaXplZERhdGFzZXRzLmZvckVhY2goZGF0YSA9PlxyXG4gICAgZGF0YS5lbnRpdGllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxyXG4gICAgICBlbnRpdGllc1trZXldID0gdW5pb25CeShbdmFsdWUsIGVudGl0aWVzW2tleV1dLCBvcHRpb25zLmtleU5hbWUpXHJcbiAgICApXHJcbiAgKTtcclxuICByZXR1cm4gZW50aXRpZXM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlU3RhdHVzZXNJblN0YXRlID0gKHN0YXRlLCBlbnRpdGllcyA9IHt9LCBzdGF0dXNlcyA9IHt9LCBvcHRpb25zID0ge30pID0+IHtcclxuICBjb25zdCBhZmZlY3RlZEVudGl0aWVzID0gZ2V0QWZmZWN0ZWRFbnRpdGllcyhzdGF0ZSwgZW50aXRpZXMpO1xyXG4gIGFmZmVjdGVkRW50aXRpZXMubWFwKChlbnRpdHkpID0+XHJcbiAgICBPYmplY3QuYXNzaWduKHt9LCBlbnRpdHksIHN0YXR1c2VzKSk7XHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhZmZlY3RlZEVudGl0aWVzKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRFbnRpdGllc1RvU3RhdGUgPSAoc3RhdGUsIGVudGl0aWVzID0ge30sIHN0YXR1c2VzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGFmZmVjdGVkRW50aXRpZXMgPSBnZXRBZmZlY3RlZEVudGl0aWVzKHN0YXRlLCBlbnRpdGllcyk7XHJcbiAgYWZmZWN0ZWRFbnRpdGllcy5tYXAoKGVudGl0eSwgbmFtZSkgPT4ge1xyXG4gICAgZW50aXR5Lml0ZW1zID0gWy4uLmVudGl0eS5pdGVtcywgLi4uZW50aXRpZXNbbmFtZV0uaXRlbXNdO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGVudGl0eSwgc3RhdHVzZXMpO1xyXG4gIH0pO1xyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWZmZWN0ZWRFbnRpdGllcyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWVyZ2VFbnRpdGllc1RvU3RhdGUgPSAoc3RhdGUsIGVudGl0aWVzID0ge30sIHN0YXR1c2VzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGFmZmVjdGVkRW50aXRpZXMgPSBnZXRBZmZlY3RlZEVudGl0aWVzKHN0YXRlLCBlbnRpdGllcyk7XHJcbiAgYWZmZWN0ZWRFbnRpdGllcy5tYXAoKGVudGl0eSwgbmFtZSkgPT4ge1xyXG4gICAgZW50aXR5Lml0ZW1zID0gdW5pb25CeShbZW50aXRpZXNbbmFtZV0uaXRlbXMsIGVudGl0eS5pdGVtc10sIG9wdGlvbnMua2V5TmFtZSk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZW50aXR5LCBzdGF0dXNlcyk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhZmZlY3RlZEVudGl0aWVzKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFbnRpdGllc0luU3RhdGUgPSAoc3RhdGUsIGVudGl0aWVzID0ge30sIHN0YXR1c2VzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGFmZmVjdGVkRW50aXRpZXMgPSBnZXRBZmZlY3RlZEVudGl0aWVzKHN0YXRlLCBlbnRpdGllcyk7XHJcbiAgYWZmZWN0ZWRFbnRpdGllcy5tYXAoKGVudGl0eSwgbmFtZSkgPT4ge1xyXG4gICAgY29uc3QgW2RhdGFdID0gZW50aXRpZXNbbmFtZV0uaXRlbXM7XHJcbiAgICB2YXIgdXBkYXRlZEl0ZW0gPSBmaW5kKGVudGl0eS5pdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBkYXRhW29wdGlvbnMua2V5TmFtZV0pO1xyXG4gICAgZW50aXR5Lml0ZW1zLnNwbGljZShcclxuICAgICAgZmluZEluZGV4KGVudGl0eS5pdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBkYXRhW29wdGlvbnMua2V5TmFtZV0pLFxyXG4gICAgICAxLFxyXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCB1cGRhdGVkSXRlbSwgZGF0YSlcclxuICAgICk7XHJcbiAgICBlbnRpdHkudXBkYXRlZEl0ZW0gPSB1cGRhdGVkSXRlbTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBlbnRpdHksIHN0YXR1c2VzKTtcclxuICB9KTtcclxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFmZmVjdGVkRW50aXRpZXMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUVudGl0aWVzRnJvbVN0YXRlID0gKHN0YXRlLCBlbnRpdGllcyA9IHt9LCBzdGF0dXNlcyA9IHt9LCBvcHRpb25zID0ge30pID0+IHtcclxuICBjb25zdCBhZmZlY3RlZEVudGl0aWVzID0gZ2V0QWZmZWN0ZWRFbnRpdGllcyhzdGF0ZSwgZW50aXRpZXMpO1xyXG4gIGFmZmVjdGVkRW50aXRpZXMubWFwKChlbnRpdHksIG5hbWUpID0+IHtcclxuICAgIGNvbnN0IFtkYXRhXSA9IGVudGl0aWVzW25hbWVdLml0ZW1zO1xyXG4gICAgY29uc3QgdXBkYXRlID0ge307XHJcbiAgICB1cGRhdGUuZGVzdHJveWVkSXRlbSA9IGZpbmQoZW50aXR5Lml0ZW1zLCAoaXRlbSkgPT4gaXRlbVtvcHRpb25zLmtleU5hbWVdID09IGRhdGFbb3B0aW9ucy5rZXlOYW1lXSk7XHJcbiAgICB1cGRhdGUuZGVzdHJveWVkSXRlbUluZGV4ID0gZmluZEluZGV4KGVudGl0eS5pdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBkYXRhW29wdGlvbnMua2V5TmFtZV0pO1xyXG4gICAgZW50aXR5Lml0ZW1zLnNwbGljZSh1cGRhdGUuZGVzdHJveWVkSXRlbUluZGV4LCAxKTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBlbnRpdHksIHN0YXR1c2VzKTtcclxuICB9KTtcclxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFmZmVjdGVkRW50aXRpZXMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSW9SZWR1Y2VyKG5hbWUsIGN1c3RvbVN0YXRlID0ge30sIGN1c3RvbUFjdGlvbnMgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgaW5pdDogZmFsc2UsXHJcbiAgICBzZWxlY3RlZDogbnVsbCxcclxuICAgIHF1ZXJ5OiBudWxsLFxyXG4gICAgaXNGaW5kaW5nOiBmYWxzZSxcclxuICAgIGlzU3luY2luZzogZmFsc2UsXHJcbiAgICBpc1dyaXRpbmc6IGZhbHNlLFxyXG4gICAgc3luY0Vycm9yOiBudWxsLFxyXG4gICAgZmluZEVycm9yOiBudWxsLFxyXG4gICAgd3JpdGVFcnJvcjogbnVsbCxcclxuICAgIHVwZGF0ZUVycm9yOiBudWxsLFxyXG4gICAgZGVzdHJveUVycm9yOiBudWxsLFxyXG4gICAgdmFsaWRhdGlvbkVycm9yOiBudWxsLFxyXG4gICAgZXJyb3I6IG51bGwsXHJcbiAgICB1cGRhdGVkSXRlbTogbnVsbCxcclxuICAgIGRlc3Ryb3llZEl0ZW06IG51bGwsXHJcbiAgICBkZXN0cm95ZWRJdGVtSW5kZXg6IG51bGwsXHJcbiAgICBpdGVtczogW11cclxuICB9LCBjdXN0b21TdGF0ZSk7XHJcbiAgY29uc3QgYWN0aW9uTmFtZSA9IHRvVXBwZXIoc25ha2VDYXNlKG5hbWUpKTtcclxuXHJcbiAgaWYgKCFvcHRpb25zLnNjaGVtYXMgfHwgIW9wdGlvbnMuc2NoZW1hc1tuYW1lXSlcclxuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBub3JtYWxpemUgc2NoZW1lJyk7XHJcblxyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHtcclxuICAgIFtgUldfRklORF8ke2FjdGlvbk5hbWV9YF0oc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICBsZXQgZW50aXRpZXMgPSBnZXRFbnRpdHlGcm9tU3RhdGUoc3RhdGUsIG5hbWUpO1xyXG4gICAgICBsZXQgc3RhdHVzZXMgPSB7XHJcbiAgICAgICAgaXNGaW5kaW5nOiB0cnVlLFxyXG4gICAgICAgIGZpbmRFcnJvcjogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBzdGF0dXNlcy5xdWVyeSA9IChhY3Rpb24uZGF0YSAmJiAhaXNFbXB0eShhY3Rpb24uZGF0YSkpID8gYWN0aW9uLmRhdGEgOiBudWxsO1xyXG4gICAgICBpZiAoIWlzRXF1YWwoc3RhdHVzZXMucXVlcnksIHN0YXRlLnF1ZXJ5KSkgc3RhdHVzZXMuaXRlbXMgPSBbXTtcclxuICAgICAgcmV0dXJuIHVwZGF0ZVN0YXR1c2VzSW5TdGF0ZShzdGF0ZSwgZW50aXRpZXMsIHN0YXR1c2VzKTtcclxuICAgIH0sXHJcblxyXG4gICAgW2BSV19GSU5EXyR7YWN0aW9uTmFtZX1fRkFJTEVEYF0oc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICBsZXQgZW50aXRpZXMgPSBnZXRFbnRpdHlGcm9tU3RhdGUoc3RhdGUsIG5hbWUpO1xyXG4gICAgICBsZXQgc3RhdHVzZXMgPSB7XHJcbiAgICAgICAgZmluZEVycm9yOiBhY3Rpb24uZXJyb3IgfHwgbnVsbCxcclxuICAgICAgICB2YWxpZGF0aW9uRXJyb3I6IGFjdGlvbi52YWxpZGF0aW9uRXJyb3IgfHwgbnVsbCxcclxuICAgICAgICBpc0ZpbmRpbmc6IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB1cGRhdGVTdGF0dXNlc0luU3RhdGUoc3RhdGUsIGVudGl0aWVzLCBzdGF0dXNlcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFtgUldfRklORF8ke2FjdGlvbk5hbWV9X0NPTVBMRVRFRGBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgbGV0IGVudGl0aWVzID0gbm9ybWFsaXplVG9FbnRpdGllcyhhY3Rpb24uZGF0YSwgbmFtZSwgb3B0aW9ucyk7XHJcbiAgICAgIGxldCBzdGF0dXNlcyA9IHtcclxuICAgICAgICBpbml0OiB0cnVlLFxyXG4gICAgICAgIGlzRmluZGluZzogZmFsc2UsXHJcbiAgICAgICAgZmluZEVycm9yOiBudWxsLFxyXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcjogbnVsbCxcclxuICAgICAgICBpdGVtczogYWN0aW9uLmRhdGFcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG1lcmdlRW50aXRpZXNUb1N0YXRlKHN0YXRlLCBlbnRpdGllcywgc3RhdHVzZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX1JFQ0VJVkVfJHthY3Rpb25OYW1lfWBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgbGV0IGVudGl0aWVzID0gbm9ybWFsaXplVG9FbnRpdGllcyhhY3Rpb24uZGF0YSwgbmFtZSwgb3B0aW9ucyk7XHJcbiAgICAgIHJldHVybiBtZXJnZUVudGl0aWVzVG9TdGF0ZShzdGF0ZSwgZW50aXRpZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX1JFTU9WRV8ke2FjdGlvbk5hbWV9YF0oc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICBsZXQgdXBkYXRlID0ge307XHJcbiAgICAgIGxldCB7IGRhdGEgfSA9IGFjdGlvbjtcclxuICAgICAgbGV0IGl0ZW1zID0gWy4uLnN0YXRlLml0ZW1zXTtcclxuICAgICAgaWYgKCFpc0FycmF5KGRhdGEpKSBkYXRhID0gW2RhdGFdO1xyXG4gICAgICBlYWNoKGRhdGEsIChvYmopID0+IHtcclxuICAgICAgICBpZiAob2JqW29wdGlvbnMua2V5TmFtZV0pXHJcbiAgICAgICAgICBpdGVtcy5zcGxpY2UoZmluZEluZGV4KGl0ZW1zLCAoaXRlbSkgPT4gaXRlbVtvcHRpb25zLmtleU5hbWVdID09IG9ialtvcHRpb25zLmtleU5hbWVdKSwgMSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB1cGRhdGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgbGV0IHNlbGVjdGVkID0gdXBkYXRlLml0ZW1zID8gc2VsZWN0ZWRVcGRhdGUob3B0aW9ucywgc3RhdGUsIHVwZGF0ZS5pdGVtcykgOiB7fTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB1cGRhdGUsIHNlbGVjdGVkKTtcclxuICAgIH0sXHJcblxyXG4gICAgW2BSV19DUkVBVEVfJHthY3Rpb25OYW1lfWBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgbGV0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBvbWl0VmlydHVhbEZpZWxkcyhhY3Rpb24uZGF0YSwgb3B0aW9ucyksIHsgX3RlbXA6IHRydWUgfSk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREYXRhID0gbm9ybWFsaXplKGl0ZW0sIG9wdGlvbnMuc2NoZW1hc1tuYW1lXSk7XHJcbiAgICAgIGNvbnN0IGVudGl0aWVzID0gbWFwVmFsdWVzKG5vcm1hbGl6ZWREYXRhLmVudGl0aWVzLCBlbnRpdHkgPT4gKHsgaXRlbXM6IGZsYXRNYXAoZW50aXR5KSB9KSk7XHJcbiAgICAgIGNvbnN0IHN0YXR1c2VzID0ge1xyXG4gICAgICAgIGlzV3JpdGluZzogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gYWRkRW50aXRpZXNUb1N0YXRlKHN0YXRlLCBlbnRpdGllcywgc3RhdHVzZXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX0NSRUFURV8ke2FjdGlvbk5hbWV9X0ZBSUxFRGBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgdmFyIGl0ZW1zID0gWy4uLnN0YXRlLml0ZW1zXTtcclxuICAgICAgaWYgKGFjdGlvbi5fdGVtcElkKSB7XHJcbiAgICAgICAgaXRlbXMgPSBmaWx0ZXIoaXRlbXMsIChpdGVtKSA9PiBpdGVtW29wdGlvbnMua2V5TmFtZV0gIT0gYWN0aW9uLl90ZW1wSWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIGlzV3JpdGluZzogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IGl0ZW1zLFxyXG4gICAgICAgIHdyaXRlRXJyb3I6IGFjdGlvbi5lcnJvciB8fCBudWxsLFxyXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcjogYWN0aW9uLnZhbGlkYXRpb25FcnJvciB8fCBudWxsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX0NSRUFURV8ke2FjdGlvbk5hbWV9X0NPTVBMRVRFRGBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgdmFyIGl0ZW1zID0gWy4uLnN0YXRlLml0ZW1zXTtcclxuICAgICAgaWYgKGFjdGlvbi5fdGVtcElkKSB7XHJcbiAgICAgICAgaXRlbXMgPSBmaWx0ZXIoaXRlbXMsIChpdGVtKSA9PiBpdGVtW29wdGlvbnMua2V5TmFtZV0gIT0gYWN0aW9uLl90ZW1wSWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIGlzV3JpdGluZzogZmFsc2UsXHJcbiAgICAgICAgd3JpdGVFcnJvcjogbnVsbCxcclxuICAgICAgICB2YWxpZGF0aW9uRXJyb3I6IG51bGwsXHJcbiAgICAgICAgaXRlbXM6IFsuLi5pdGVtcywgYWN0aW9uLmRhdGFdXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX1VQREFURV8ke2FjdGlvbk5hbWV9YF0oc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICB2YXIgdXBkYXRlID0ge1xyXG4gICAgICAgIGlzV3JpdGluZzogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgICB2YXIgZGF0YSA9IG9taXRWaXJ0dWFsRmllbGRzKGFjdGlvbi5kYXRhLCBvcHRpb25zKTtcclxuICAgICAgaWYgKGlzT2JqZWN0KGRhdGEpICYmIGRhdGFbb3B0aW9ucy5rZXlOYW1lXSkge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IFsuLi5zdGF0ZS5pdGVtc107XHJcbiAgICAgICAgdmFyIHVwZGF0ZWRJdGVtID0gZmluZChpdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBkYXRhW29wdGlvbnMua2V5TmFtZV0pO1xyXG4gICAgICAgIGl0ZW1zLnNwbGljZShcclxuICAgICAgICAgIGZpbmRJbmRleChpdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBkYXRhW29wdGlvbnMua2V5TmFtZV0pLFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHVwZGF0ZWRJdGVtLCBkYXRhKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdXBkYXRlLnVwZGF0ZWRJdGVtID0gdXBkYXRlZEl0ZW07XHJcbiAgICAgICAgdXBkYXRlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB1cGRhdGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX1VQREFURV8ke2FjdGlvbk5hbWV9X0ZBSUxFRGBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgdmFyIHVwZGF0ZSA9IHtcclxuICAgICAgICBpc1dyaXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHVwZGF0ZUVycm9yOiBhY3Rpb24uZXJyb3IgfHwgbnVsbCxcclxuICAgICAgICB2YWxpZGF0aW9uRXJyb3I6IGFjdGlvbi52YWxpZGF0aW9uRXJyb3IgfHwgbnVsbCxcclxuICAgICAgICB1cGRhdGVkSXRlbTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoc3RhdGUudXBkYXRlZEl0ZW0gJiYgc3RhdGUudXBkYXRlZEl0ZW1bb3B0aW9ucy5rZXlOYW1lXSkge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IFsuLi5zdGF0ZS5pdGVtc107XHJcbiAgICAgICAgaXRlbXMuc3BsaWNlKFxyXG4gICAgICAgICAgZmluZEluZGV4KGl0ZW1zLCAoaXRlbSkgPT4gaXRlbVtvcHRpb25zLmtleU5hbWVdID09IHN0YXRlLnVwZGF0ZWRJdGVtW29wdGlvbnMua2V5TmFtZV0pLFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIHN0YXRlLnVwZGF0ZWRJdGVtXHJcbiAgICAgICAgKTtcclxuICAgICAgICB1cGRhdGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHVwZGF0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFtgUldfVVBEQVRFXyR7YWN0aW9uTmFtZX1fQ09NUExFVEVEYF0oc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICB2YXIgdXBkYXRlID0ge1xyXG4gICAgICAgIGlzV3JpdGluZzogZmFsc2UsXHJcbiAgICAgICAgdXBkYXRlRXJyb3I6IG51bGwsXHJcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yOiBudWxsLFxyXG4gICAgICAgIHVwZGF0ZWRJdGVtOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChhY3Rpb24uX3Jld3JpdGUgfHwgKG9wdGlvbnMucmV3cml0ZU9uVXBkYXRlICYmIGFjdGlvbi5fcmV3cml0ZSAhPT0gZmFsc2UpKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gWy4uLnN0YXRlLml0ZW1zXTtcclxuICAgICAgICBsZXQgeyBkYXRhIH0gPSBhY3Rpb247XHJcbiAgICAgICAgaWYgKCFpc0FycmF5KGRhdGEpKSBkYXRhID0gW2RhdGFdO1xyXG4gICAgICAgIHVwZGF0ZS5pdGVtcyA9IHVuaW9uQnkoZGF0YSwgaXRlbXMsIG9wdGlvbnMua2V5TmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHNlbGVjdGVkID0gdXBkYXRlLml0ZW1zID8gc2VsZWN0ZWRVcGRhdGUob3B0aW9ucywgc3RhdGUsIHVwZGF0ZS5pdGVtcykgOiB7fTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB1cGRhdGUsIHNlbGVjdGVkKTtcclxuICAgIH0sXHJcblxyXG4gICAgW2BSV19ERVNUUk9ZXyR7YWN0aW9uTmFtZX1gXShzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHZhciB1cGRhdGUgPSB7XHJcbiAgICAgICAgaXNXcml0aW5nOiB0cnVlXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChhY3Rpb24uZGF0YVtvcHRpb25zLmtleU5hbWVdKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gWy4uLnN0YXRlLml0ZW1zXTtcclxuICAgICAgICB1cGRhdGUuZGVzdHJveWVkSXRlbSA9IGZpbmQoaXRlbXMsIChpdGVtKSA9PiBpdGVtW29wdGlvbnMua2V5TmFtZV0gPT0gYWN0aW9uLmRhdGFbb3B0aW9ucy5rZXlOYW1lXSk7XHJcbiAgICAgICAgdXBkYXRlLmRlc3Ryb3llZEl0ZW1JbmRleCA9IGZpbmRJbmRleChpdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBhY3Rpb24uZGF0YVtvcHRpb25zLmtleU5hbWVdKTtcclxuICAgICAgICBpdGVtcy5zcGxpY2UodXBkYXRlLmRlc3Ryb3llZEl0ZW1JbmRleCwgMSk7XHJcbiAgICAgICAgdXBkYXRlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB1cGRhdGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX0RFU1RST1lfJHthY3Rpb25OYW1lfV9GQUlMRURgXShzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHZhciB1cGRhdGUgPSB7XHJcbiAgICAgICAgaXNXcml0aW5nOiBmYWxzZSxcclxuICAgICAgICBkZXN0cm95RXJyb3I6IGFjdGlvbi5lcnJvciB8fCBudWxsLFxyXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcjogYWN0aW9uLnZhbGlkYXRpb25FcnJvciB8fCBudWxsLFxyXG4gICAgICAgIGRlc3Ryb3llZEl0ZW06IG51bGwsXHJcbiAgICAgICAgZGVzdHJveWVkSXRlbUluZGV4OiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChzdGF0ZS5kZXN0cm95ZWRJdGVtICYmIHN0YXRlLmRlc3Ryb3llZEl0ZW1JbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gWy4uLnN0YXRlLml0ZW1zXTtcclxuICAgICAgICBpdGVtcy5zcGxpY2Uoc3RhdGUuZGVzdHJveWVkSXRlbUluZGV4LCAwLCBzdGF0ZS5kZXN0cm95ZWRJdGVtKTtcclxuICAgICAgICB1cGRhdGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHVwZGF0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFtgUldfREVTVFJPWV8ke2FjdGlvbk5hbWV9X0NPTVBMRVRFRGBdKHN0YXRlKSB7XHJcbiAgICAgIGxldCBzZWxlY3RlZCA9IHNlbGVjdGVkVXBkYXRlKG9wdGlvbnMsIHN0YXRlLCBzdGF0ZS5pdGVtcyk7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIGlzV3JpdGluZzogZmFsc2UsXHJcbiAgICAgICAgZGVzdHJveUVycm9yOiBudWxsLFxyXG4gICAgICAgIHZhbGlkYXRpb25FcnJvcjogbnVsbCxcclxuICAgICAgICBkZXN0cm95ZWRJdGVtOiBudWxsLFxyXG4gICAgICAgIGRlc3Ryb3llZEl0ZW1JbmRleDogbnVsbFxyXG4gICAgICB9LCBzZWxlY3RlZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFtgUldfQ0xFQVJfJHthY3Rpb25OYW1lfWBdKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICBzZWxlY3RlZDogbnVsbFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgW2BSV19TRUxFQ1RfJHthY3Rpb25OYW1lfWBdKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgbGV0IHNlbGVjdGVkID0gbnVsbDtcclxuICAgICAgaWYgKGlzU3RyaW5nKGFjdGlvbi5kYXRhKSB8fCBpc051bWJlcihhY3Rpb24uZGF0YSkpIHNlbGVjdGVkID0gZmluZChzdGF0ZS5pdGVtcywgKGl0ZW0pID0+IGl0ZW1bb3B0aW9ucy5rZXlOYW1lXSA9PSBhY3Rpb24uZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KGFjdGlvbi5kYXRhKSAmJiBhY3Rpb24uZGF0YVtvcHRpb25zLmtleU5hbWVdKSBzZWxlY3RlZCA9IGZpbmQoc3RhdGUuaXRlbXMsIChpdGVtKSA9PiBpdGVtW29wdGlvbnMua2V5TmFtZV0gPT0gYWN0aW9uLmRhdGFbb3B0aW9ucy5rZXlOYW1lXSkgfHwgYWN0aW9uLmRhdGE7XHJcbiAgICAgIGVsc2Ugc2VsZWN0ZWQgPSBhY3Rpb24uZGF0YTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBbYFJXX1JFU0VUXyR7YWN0aW9uTmFtZX1gXSgpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWxTdGF0ZSk7XHJcbiAgICB9XHJcbiAgfSwgY3VzdG9tQWN0aW9ucyk7XHJcbn0iXX0=