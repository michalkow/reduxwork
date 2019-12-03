import {
  mapValues,
  pick,
  keys,
  omit
} from 'lodash';

export const addActionToCache = (state, uuid, cache) =>
  Object.assign({}, state.actionCache, { [uuid]: cache });

export const removeActionFromCache = (state, uuid) =>
  omit(state.actionCache, uuid);

export const updateActionCache = (state, uuid, cache) =>
  cache ?
    addActionToCache(state, uuid, cache) :
    removeActionFromCache(state, uuid);

export const updateActionErrors = (state, action) =>
  Object.assign({}, state.actionErrors, {
    [action.uuid]: {
      message: action.error,
      action
    }
  });

export const updateEntitiesStatus = (state, name, statuses) =>
  Object.assign({}, state.entitiesStatus, { [name]: Object.assign({}, state.entitiesStatus[name], statuses) });

export const updateState = (state, action, { entitiesUpdate = {}, cacheUpdate, statusUpdate, entityName }) =>
  Object.assign({}, state, entitiesUpdate, {
    actionCache: cacheUpdate ? updateActionCache(state, cacheUpdate.uuid, cacheUpdate.entities) : {},
    entitiesStatus: statusUpdate ? updateEntitiesStatus(state, entityName, statusUpdate.statuses) : {},
    actionErrors: action.error ? updateActionErrors(state, action) : {},
    lastAction: action
  });

export const upsertEntitiesToState = (state, action, { entities = {}, statuses = {}, entityName }) => {
  let entitiesUpdate = mapValues(entities, (entity, name) =>
    Object.assign({}, state[name], entity)
  );
  return updateState(state, action, {
    entitiesUpdate,
    statusUpdate: { statuses, entities },
    entityName
  });
};

export const addEntitiesToState = (state, action, { entities = {}, statuses = {}, cache = false, entityName }) => {
  const { uuid } = action;
  let entitiesUpdate = mapValues(entities, (entity, name) =>
    Object.assign({}, state[name], (
      cache ?
        mapValues(entity, item =>
          Object.assign({}, item, { _temp: true })
        )
        :
        entity
    ))
  );
  return updateState(state, action, {
    entitiesUpdate,
    cacheUpdate: { uuid, entities: cache ? entities : null },
    statusUpdate: { statuses, entities },
    entityName
  });
};

export const updateEntitiesInState = (state, action, { entities = {}, statuses = {}, cache = false, entityName }) => {
  const { uuid } = action;
  const affectedEntities = mapValues(entities, (entity, name) =>
    pick(state[name], keys(entity))
  );
  let entitiesUpdate = mapValues(entities, (entity, name) =>
    Object.assign({}, state[name], mapValues(state[name], (item, key) =>
      entity[key] ?
        omit(
          Object.assign({}, item, entity[key], { _temp: true }),
          cache ? [] : ['_temp']
        )
        :
        item
    ))
  );
  return updateState(state, action, {
    entitiesUpdate,
    cacheUpdate: { uuid, entities: cache ? affectedEntities : null },
    statusUpdate: { statuses, entities },
    entityName
  });
};

export const removeEntitiesFromState = (state, action, { entities = {}, statuses = {}, cache = false, entityName }) => {
  const { uuid } = action;
  const affectedEntities = mapValues(entities, (entity, name) =>
    pick(state[name], keys(entity))
  );
  let entitiesUpdate = mapValues(entities, (entity, name) =>
    omit(state[name], keys(entity))
  );
  return updateState(state, action, {
    entitiesUpdate,
    cacheUpdate: { uuid, entities: cache ? affectedEntities : null },
    statusUpdate: { statuses, entities },
    entityName
  });
};