"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.removeEntitiesFromState = exports.updateEntitiesInState = exports.addEntitiesToState = exports.upsertEntitiesToState = exports.updateState = exports.updateEntitieStatus = exports.updateActionErrors = exports.updateActionCache = exports.removeActionFromCache = exports.addActionToCache = void 0;var _lodash = require("lodash");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var addActionToCache = function addActionToCache(state, uuid, cache) {return (
    Object.assign({}, state.actionCache, _defineProperty({}, uuid, cache)));};exports.addActionToCache = addActionToCache;

var removeActionFromCache = function removeActionFromCache(state, uuid) {return (
    (0, _lodash.omit)(state.actionCache, uuid));};exports.removeActionFromCache = removeActionFromCache;

var updateActionCache = function updateActionCache(state, uuid, cache) {return (
    cache ?
    addActionToCache(state, uuid, cache) :
    removeActionFromCache(state, uuid));};exports.updateActionCache = updateActionCache;

var updateActionErrors = function updateActionErrors(state, uuid, error) {return (
    Object.assign({}, state.actionErrors, _defineProperty({}, uuid, error)));};exports.updateActionErrors = updateActionErrors;

var updateEntitieStatus = function updateEntitieStatus(state, entities, statuses) {return (
    Object.assign({}, state.entitieStatus, (0, _lodash.mapValues)(entities, function (entity, name) {return (
        Object.assign({}, state.entitieStatus[name], statuses));})));};exports.updateEntitieStatus = updateEntitieStatus;


var updateState = function updateState(state, _ref) {var _ref$entitiesUpdate = _ref.entitiesUpdate,entitiesUpdate = _ref$entitiesUpdate === void 0 ? {} : _ref$entitiesUpdate,cacheUpdate = _ref.cacheUpdate,statusUpdate = _ref.statusUpdate,errorUpdate = _ref.errorUpdate,uuid = _ref.uuid;return (
    Object.assign({}, state, entitiesUpdate, {
      actionCache: cacheUpdate ? updateActionCache(state, cacheUpdate.uuid, cacheUpdate.entities) : {},
      entitieStatus: statusUpdate ? updateEntitieStatus(state, statusUpdate.entities, statusUpdate.statuses) : {},
      actionErrors: errorUpdate ? updateActionErrors(state, errorUpdate.uuid, errorUpdate.error) : {},
      lastAction: uuid }));};exports.updateState = updateState;


var upsertEntitiesToState = function upsertEntitiesToState(state, _ref2) {var uuid = _ref2.uuid,_ref2$entities = _ref2.entities,entities = _ref2$entities === void 0 ? {} : _ref2$entities,_ref2$statuses = _ref2.statuses,statuses = _ref2$statuses === void 0 ? {} : _ref2$statuses;
  var entitiesUpdate = (0, _lodash.mapValues)(entities, function (entity, name) {return (
      Object.assign({}, state[name], entity));});

  return updateState(state, {
    entitiesUpdate: entitiesUpdate,
    statusUpdate: { statuses: statuses, entities: entities },
    uuid: uuid });

};exports.upsertEntitiesToState = upsertEntitiesToState;

var addEntitiesToState = function addEntitiesToState(state, _ref3) {var uuid = _ref3.uuid,_ref3$entities = _ref3.entities,entities = _ref3$entities === void 0 ? {} : _ref3$entities,_ref3$statuses = _ref3.statuses,statuses = _ref3$statuses === void 0 ? {} : _ref3$statuses,_ref3$cache = _ref3.cache,cache = _ref3$cache === void 0 ? false : _ref3$cache,error = _ref3.error;
  var entitiesUpdate = (0, _lodash.mapValues)(entities, function (entity, name) {return (
      Object.assign({}, state[name], entity));});

  return updateState(state, {
    entitiesUpdate: entitiesUpdate,
    cacheUpdate: { uuid: uuid, entities: cache ? entities : null },
    statusUpdate: { statuses: statuses, entities: entities },
    errorUpdate: error ? { uuid: uuid, error: error } : null,
    uuid: uuid });

};exports.addEntitiesToState = addEntitiesToState;

var updateEntitiesInState = function updateEntitiesInState(state, _ref4, _ref5) {var uuid = _ref4.uuid,_ref4$entities = _ref4.entities,entities = _ref4$entities === void 0 ? {} : _ref4$entities,_ref4$statuses = _ref4.statuses,statuses = _ref4$statuses === void 0 ? {} : _ref4$statuses,_ref4$cache = _ref4.cache,cache = _ref4$cache === void 0 ? false : _ref4$cache,error = _ref4.error;var keyName = _ref5.keyName;
  var affectedEntities = (0, _lodash.mapValues)(entities, function (entity, name) {return (
      (0, _lodash.pick)(state[name], (0, _lodash.keys)(entity)));});

  var entitiesUpdate = (0, _lodash.mapValues)(entities, function (entity, name) {return (
      Object.assign({}, state[name], (0, _lodash.mapValues)(state[name], function (item) {return (
          entity[item[keyName]] ? Object.assign({}, item, entity[item[keyName]]) : item);})));});


  return updateState(state, {
    entitiesUpdate: entitiesUpdate,
    cacheUpdate: { uuid: uuid, entities: cache ? affectedEntities : null },
    statusUpdate: { statuses: statuses, entities: entities },
    errorUpdate: error ? { uuid: uuid, error: error } : null,
    uuid: uuid });

};exports.updateEntitiesInState = updateEntitiesInState;

var removeEntitiesFromState = function removeEntitiesFromState(state, _ref6) {var uuid = _ref6.uuid,_ref6$entities = _ref6.entities,entities = _ref6$entities === void 0 ? {} : _ref6$entities,_ref6$statuses = _ref6.statuses,statuses = _ref6$statuses === void 0 ? {} : _ref6$statuses,_ref6$cache = _ref6.cache,cache = _ref6$cache === void 0 ? false : _ref6$cache,error = _ref6.error;
  var affectedEntities = (0, _lodash.mapValues)(entities, function (entity, name) {return (
      (0, _lodash.pick)(state[name], (0, _lodash.keys)(entity)));});

  var entitiesUpdate = (0, _lodash.mapValues)(entities, function (entity, name) {return (
      (0, _lodash.omit)(state[name], (0, _lodash.keys)(entity)));});

  return updateState(state, {
    entitiesUpdate: entitiesUpdate,
    cacheUpdate: { uuid: uuid, entities: cache ? affectedEntities : null },
    statusUpdate: { statuses: statuses, entities: entities },
    errorUpdate: error ? { uuid: uuid, error: error } : null,
    uuid: uuid });

};exports.removeEntitiesFromState = removeEntitiesFromState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9yZWR1Y2Vycy9zdGF0ZU9wZXJhdGlvbnMuanMiXSwibmFtZXMiOlsiYWRkQWN0aW9uVG9DYWNoZSIsInN0YXRlIiwidXVpZCIsImNhY2hlIiwiT2JqZWN0IiwiYXNzaWduIiwiYWN0aW9uQ2FjaGUiLCJyZW1vdmVBY3Rpb25Gcm9tQ2FjaGUiLCJ1cGRhdGVBY3Rpb25DYWNoZSIsInVwZGF0ZUFjdGlvbkVycm9ycyIsImVycm9yIiwiYWN0aW9uRXJyb3JzIiwidXBkYXRlRW50aXRpZVN0YXR1cyIsImVudGl0aWVzIiwic3RhdHVzZXMiLCJlbnRpdGllU3RhdHVzIiwiZW50aXR5IiwibmFtZSIsInVwZGF0ZVN0YXRlIiwiZW50aXRpZXNVcGRhdGUiLCJjYWNoZVVwZGF0ZSIsInN0YXR1c1VwZGF0ZSIsImVycm9yVXBkYXRlIiwibGFzdEFjdGlvbiIsInVwc2VydEVudGl0aWVzVG9TdGF0ZSIsImFkZEVudGl0aWVzVG9TdGF0ZSIsInVwZGF0ZUVudGl0aWVzSW5TdGF0ZSIsImtleU5hbWUiLCJhZmZlY3RlZEVudGl0aWVzIiwiaXRlbSIsInJlbW92ZUVudGl0aWVzRnJvbVN0YXRlIl0sIm1hcHBpbmdzIjoieVhBQUEsZ0M7Ozs7Ozs7QUFPTyxJQUFNQSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFjQyxLQUFkO0FBQzlCQyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFLLENBQUNLLFdBQXhCLHNCQUF3Q0osSUFBeEMsRUFBK0NDLEtBQS9DLEVBRDhCLEdBQXpCLEM7O0FBR0EsSUFBTUkscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDTixLQUFELEVBQVFDLElBQVI7QUFDbkMsc0JBQUtELEtBQUssQ0FBQ0ssV0FBWCxFQUF3QkosSUFBeEIsQ0FEbUMsR0FBOUIsQzs7QUFHQSxJQUFNTSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNQLEtBQUQs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QSxXQUFXLEVBQUVaLEtBQUssR0FBRyxFQUFFUixJQUFJLEVBQUpBLElBQUYsRUFBUVEsS0FBSyxFQUFMQSxLQUFSLEVBQUgsR0FBcUIsSUFKZjtBQUt4QlIsSUFBQUEsSUFBSSxFQUFKQSxJQUx3QixFQUFSLENBQWxCOztBQU9ELENBZE0sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgbWFwVmFsdWVzLFxyXG4gIHBpY2ssXHJcbiAga2V5cyxcclxuICBvbWl0XHJcbn0gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRBY3Rpb25Ub0NhY2hlID0gKHN0YXRlLCB1dWlkLCBjYWNoZSkgPT5cclxuICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hY3Rpb25DYWNoZSwgeyBbdXVpZF06IGNhY2hlIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUFjdGlvbkZyb21DYWNoZSA9IChzdGF0ZSwgdXVpZCkgPT5cclxuICBvbWl0KHN0YXRlLmFjdGlvbkNhY2hlLCB1dWlkKTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVBY3Rpb25DYWNoZSA9IChzdGF0ZSwgdXVpZCwgY2FjaGUpID0+XHJcbiAgY2FjaGUgP1xyXG4gICAgYWRkQWN0aW9uVG9DYWNoZShzdGF0ZSwgdXVpZCwgY2FjaGUpIDpcclxuICAgIHJlbW92ZUFjdGlvbkZyb21DYWNoZShzdGF0ZSwgdXVpZCk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQWN0aW9uRXJyb3JzID0gKHN0YXRlLCB1dWlkLCBlcnJvcikgPT5cclxuICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hY3Rpb25FcnJvcnMsIHsgW3V1aWRdOiBlcnJvciB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFbnRpdGllU3RhdHVzID0gKHN0YXRlLCBlbnRpdGllcywgc3RhdHVzZXMpID0+XHJcbiAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZW50aXRpZVN0YXR1cywgbWFwVmFsdWVzKGVudGl0aWVzLCAoZW50aXR5LCBuYW1lKSA9PlxyXG4gICAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZW50aXRpZVN0YXR1c1tuYW1lXSwgc3RhdHVzZXMpXHJcbiAgKSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlU3RhdGUgPSAoc3RhdGUsIHsgZW50aXRpZXNVcGRhdGUgPSB7fSwgY2FjaGVVcGRhdGUsIHN0YXR1c1VwZGF0ZSwgZXJyb3JVcGRhdGUsIHV1aWQgfSkgPT5cclxuICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZW50aXRpZXNVcGRhdGUsIHtcclxuICAgIGFjdGlvbkNhY2hlOiBjYWNoZVVwZGF0ZSA/IHVwZGF0ZUFjdGlvbkNhY2hlKHN0YXRlLCBjYWNoZVVwZGF0ZS51dWlkLCBjYWNoZVVwZGF0ZS5lbnRpdGllcykgOiB7fSxcclxuICAgIGVudGl0aWVTdGF0dXM6IHN0YXR1c1VwZGF0ZSA/IHVwZGF0ZUVudGl0aWVTdGF0dXMoc3RhdGUsIHN0YXR1c1VwZGF0ZS5lbnRpdGllcywgc3RhdHVzVXBkYXRlLnN0YXR1c2VzKSA6IHt9LFxyXG4gICAgYWN0aW9uRXJyb3JzOiBlcnJvclVwZGF0ZSA/IHVwZGF0ZUFjdGlvbkVycm9ycyhzdGF0ZSwgZXJyb3JVcGRhdGUudXVpZCwgZXJyb3JVcGRhdGUuZXJyb3IpIDoge30sXHJcbiAgICBsYXN0QWN0aW9uOiB1dWlkXHJcbiAgfSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBzZXJ0RW50aXRpZXNUb1N0YXRlID0gKHN0YXRlLCB7IHV1aWQsIGVudGl0aWVzID0ge30sIHN0YXR1c2VzID0ge319KSA9PiB7XHJcbiAgbGV0IGVudGl0aWVzVXBkYXRlID0gbWFwVmFsdWVzKGVudGl0aWVzLCAoZW50aXR5LCBuYW1lKSA9PlxyXG4gICAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGVbbmFtZV0sIGVudGl0eSlcclxuICApO1xyXG4gIHJldHVybiB1cGRhdGVTdGF0ZShzdGF0ZSwge1xyXG4gICAgZW50aXRpZXNVcGRhdGUsXHJcbiAgICBzdGF0dXNVcGRhdGU6IHsgc3RhdHVzZXMsIGVudGl0aWVzIH0sXHJcbiAgICB1dWlkXHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYWRkRW50aXRpZXNUb1N0YXRlID0gKHN0YXRlLCB7IHV1aWQsIGVudGl0aWVzID0ge30sIHN0YXR1c2VzID0ge30sIGNhY2hlID0gZmFsc2UsIGVycm9yIH0pID0+IHtcclxuICBsZXQgZW50aXRpZXNVcGRhdGUgPSBtYXBWYWx1ZXMoZW50aXRpZXMsIChlbnRpdHksIG5hbWUpID0+XHJcbiAgICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZVtuYW1lXSwgZW50aXR5KVxyXG4gICk7XHJcbiAgcmV0dXJuIHVwZGF0ZVN0YXRlKHN0YXRlLCB7XHJcbiAgICBlbnRpdGllc1VwZGF0ZSxcclxuICAgIGNhY2hlVXBkYXRlOiB7IHV1aWQsIGVudGl0aWVzOiBjYWNoZSA/IGVudGl0aWVzIDogbnVsbCB9LFxyXG4gICAgc3RhdHVzVXBkYXRlOiB7IHN0YXR1c2VzLCBlbnRpdGllcyB9LFxyXG4gICAgZXJyb3JVcGRhdGU6IGVycm9yID8geyB1dWlkLCBlcnJvciB9IDogbnVsbCxcclxuICAgIHV1aWRcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFbnRpdGllc0luU3RhdGUgPSAoc3RhdGUsIHsgdXVpZCwgZW50aXRpZXMgPSB7fSwgc3RhdHVzZXMgPSB7fSwgY2FjaGUgPSBmYWxzZSwgZXJyb3IgfSwgeyBrZXlOYW1lIH0pID0+IHtcclxuICBjb25zdCBhZmZlY3RlZEVudGl0aWVzID0gbWFwVmFsdWVzKGVudGl0aWVzLCAoZW50aXR5LCBuYW1lKSA9PlxyXG4gICAgcGljayhzdGF0ZVtuYW1lXSwga2V5cyhlbnRpdHkpKVxyXG4gICk7XHJcbiAgbGV0IGVudGl0aWVzVXBkYXRlID0gbWFwVmFsdWVzKGVudGl0aWVzLCAoZW50aXR5LCBuYW1lKSA9PlxyXG4gICAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGVbbmFtZV0sIG1hcFZhbHVlcyhzdGF0ZVtuYW1lXSwgaXRlbSA9PlxyXG4gICAgICBlbnRpdHlbaXRlbVtrZXlOYW1lXV0gPyBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCBlbnRpdHlbaXRlbVtrZXlOYW1lXV0pIDogaXRlbVxyXG4gICAgKSlcclxuICApO1xyXG4gIHJldHVybiB1cGRhdGVTdGF0ZShzdGF0ZSwge1xyXG4gICAgZW50aXRpZXNVcGRhdGUsXHJcbiAgICBjYWNoZVVwZGF0ZTogeyB1dWlkLCBlbnRpdGllczogY2FjaGUgPyBhZmZlY3RlZEVudGl0aWVzIDogbnVsbCB9LFxyXG4gICAgc3RhdHVzVXBkYXRlOiB7IHN0YXR1c2VzLCBlbnRpdGllcyB9LFxyXG4gICAgZXJyb3JVcGRhdGU6IGVycm9yID8geyB1dWlkLCBlcnJvciB9IDogbnVsbCxcclxuICAgIHV1aWRcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVFbnRpdGllc0Zyb21TdGF0ZSA9IChzdGF0ZSwgeyB1dWlkLCBlbnRpdGllcyA9IHt9LCBzdGF0dXNlcyA9IHt9LCBjYWNoZSA9IGZhbHNlLCBlcnJvciB9KSA9PiB7XHJcbiAgY29uc3QgYWZmZWN0ZWRFbnRpdGllcyA9IG1hcFZhbHVlcyhlbnRpdGllcywgKGVudGl0eSwgbmFtZSkgPT5cclxuICAgIHBpY2soc3RhdGVbbmFtZV0sIGtleXMoZW50aXR5KSlcclxuICApO1xyXG4gIGxldCBlbnRpdGllc1VwZGF0ZSA9IG1hcFZhbHVlcyhlbnRpdGllcywgKGVudGl0eSwgbmFtZSkgPT5cclxuICAgIG9taXQoc3RhdGVbbmFtZV0sIGtleXMoZW50aXR5KSlcclxuICApO1xyXG4gIHJldHVybiB1cGRhdGVTdGF0ZShzdGF0ZSwge1xyXG4gICAgZW50aXRpZXNVcGRhdGUsXHJcbiAgICBjYWNoZVVwZGF0ZTogeyB1dWlkLCBlbnRpdGllczogY2FjaGUgPyBhZmZlY3RlZEVudGl0aWVzIDogbnVsbCB9LFxyXG4gICAgc3RhdHVzVXBkYXRlOiB7IHN0YXR1c2VzLCBlbnRpdGllcyB9LFxyXG4gICAgZXJyb3JVcGRhdGU6IGVycm9yID8geyB1dWlkLCBlcnJvciB9IDogbnVsbCxcclxuICAgIHV1aWRcclxuICB9KTtcclxufTsiXX0=