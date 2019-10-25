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

export const updateActionErrors = (state, uuid, error) =>
  Object.assign({}, state.actionErrors, { [uuid]: error });

export const updateEntitieStatus = (state, entities, statuses) =>
  Object.assign({}, state.entitieStatus, mapValues(entities, (entity, name) =>
    Object.assign({}, state.entitieStatus[name], statuses)
  ));

export const updateState = (state, { entitiesUpdate = {}, cacheUpdate, statusUpdate, errorUpdate, uuid }) =>
  Object.assign({}, state, entitiesUpdate, {
    actionCache: cacheUpdate ? updateActionCache(state, cacheUpdate.uuid, cacheUpdate.entities) : {},
    entitieStatus: statusUpdate ? updateEntitieStatus(state, statusUpdate.entities, statusUpdate.statuses) : {},
    actionErrors: errorUpdate ? updateActionErrors(state, errorUpdate.uuid, errorUpdate.error) : {},
    lastAction: uuid
  });

export const upsertEntitiesToState = (state, { uuid, entities = {}, statuses = {}}) => {
  let entitiesUpdate = mapValues(entities, (entity, name) =>
    Object.assign({}, state[name], entity)
  );
  return updateState(state, {
    entitiesUpdate,
    statusUpdate: { statuses, entities },
    uuid
  });
};

export const addEntitiesToState = (state, { uuid, entities = {}, statuses = {}, cache = false, error }) => {
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
  return updateState(state, {
    entitiesUpdate,
    cacheUpdate: { uuid, entities: cache ? entities : null },
    statusUpdate: { statuses, entities },
    errorUpdate: error ? { uuid, error } : null,
    uuid
  });
};

export const updateEntitiesInState = (state, { uuid, entities = {}, statuses = {}, cache = false, error }) => {
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
  return updateState(state, {
    entitiesUpdate,
    cacheUpdate: { uuid, entities: cache ? affectedEntities : null },
    statusUpdate: { statuses, entities },
    errorUpdate: error ? { uuid, error } : null,
    uuid
  });
};

export const removeEntitiesFromState = (state, { uuid, entities = {}, statuses = {}, cache = false, error }) => {
  const affectedEntities = mapValues(entities, (entity, name) =>
    pick(state[name], keys(entity))
  );
  let entitiesUpdate = mapValues(entities, (entity, name) =>
    omit(state[name], keys(entity))
  );
  return updateState(state, {
    entitiesUpdate,
    cacheUpdate: { uuid, entities: cache ? affectedEntities : null },
    statusUpdate: { statuses, entities },
    errorUpdate: error ? { uuid, error } : null,
    uuid
  });
};