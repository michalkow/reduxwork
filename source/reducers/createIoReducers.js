import {
  toUpper,
  snakeCase,
  camelCase,
  isArray,
  mapValues,
  isObject,
  forEach
} from 'lodash';
import { normalize } from 'normalizr';
import {
  updateState,
  upsertEntitiesToState,
  addEntitiesToState,
  updateEntitiesInState,
  removeEntitiesFromState
} from './stateOperations';

export const normalizeToEntities = (data, name, options) => {
  let datasets = isArray(data) ? data : [data];
  let entities = {};
  forEach(datasets, dataset => {
    let normalisedData = normalize(dataset, options.schemas[name]);
    forEach(normalisedData.entities, (entity, name) => {
      entities[name] = Object.assign({}, (entities[name] || {}), entity);
    });
  });
  return entities;
};

export default function createIoReducer(name, customActions = {}, options = {}) {
  const actionName = toUpper(snakeCase(name));
  const entityName = camelCase(name);

  if (!options.schemas || !options.schemas[name])
    throw new Error('Missing normalize scheme');

  return Object.assign({
    [`FIND_${actionName}`](state, action) {
      const statuses = {
        isFinding: true
      };
      const entities = { [entityName]: {}};
      return updateState(state, action, {
        statusUpdate: { statuses, entities },
        entityName
      });
    },

    [`FIND_${actionName}_FAILED`](state, action) {
      const statuses = {
        isFinding: false
      };
      const entities = { [entityName]: {}};
      return updateState(state, action, {
        statusUpdate: { statuses, entities },
        entityName
      });
    },

    [`FIND_${actionName}_COMPLETED`](state, action) {
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        init: true,
        isFinding: false
      };
      return upsertEntitiesToState(state, action, { entities, statuses, entityName });
    },

    [`RECEIVE_${actionName}`](state, action) {
      const entities = normalizeToEntities(action.data, name, options);
      return upsertEntitiesToState(state, action, { entities, entityName });
    },

    [`REMOVE_${actionName}`](state, action) {
      const entities = normalizeToEntities(action.data, name, options);
      return removeEntitiesFromState(state, action, { entities, cache: false, entityName });
    },

    [`CREATE_${actionName}`](state, action) {
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        isWriting: true
      };
      return addEntitiesToState(state, action, { entities, statuses, cache: true, entityName });
    },

    [`CREATE_${actionName}_FAILED`](state, action) {
      const entities = state.actionCache[action.uuid];
      const statuses = {
        isWriting: false
      };
      return removeEntitiesFromState(state, action, { entities, statuses, cache: false, entityName });
    },

    [`CREATE_${actionName}_COMPLETED`](state, action) {
      const statuses = {
        isWriting: false
      };
      const entities = normalizeToEntities(action.payload, entityName, options);
      return upsertEntitiesToState(state, action, { entities, statuses, cache: false, entityName }, options);
    },

    [`UPDATE_${actionName}`](state, action) {
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        isWriting: true
      };
      return updateEntitiesInState(state, action, { entities, statuses, cache: true, entityName }, options);
    },

    [`UPDATE_${actionName}_FAILED`](state, action) {
      const entities = state.actionCache[action.uuid];
      const statuses = {
        isWriting: false
      };
      return updateEntitiesInState(state, action, { entities, statuses, cache: false, entityName }, options);
    },

    [`UPDATE_${actionName}_COMPLETED`](state, action) {
      const statuses = {
        isWriting: false
      };
      const entities = normalizeToEntities(action.payload, entityName, options);
      return upsertEntitiesToState(state, action, { entities, statuses, cache: false, entityName }, options);
    },

    [`DESTROY_${actionName}`](state, action) {
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        isWriting: true
      };
      return removeEntitiesFromState(state, action, { entities, statuses, cache: true, entityName });
    },

    [`DESTROY_${actionName}_FAILED`](state, action) {
      const entities = state.actionCache[action.uuid];
      const statuses = {
        isWriting: false
      };
      return addEntitiesToState(state, action, { entities, statuses, cache: false, entityName });
    },

    [`DESTROY_${actionName}_COMPLETED`](state, action) {
      const statuses = {
        isWriting: false
      };
      const entities = { [entityName]: {}};
      return updateState(state, action, {
        statusUpdate: { statuses, entities },
        entityName
      });
    },

    [`SELECT_${actionName}`](state, action) {
      const { data } = action;
      // TODO: Object workaround
      let key = isObject(data) ? data[options.keyName] : data;
      let selected = isArray(key) ? key : [key];
      const statuses = {
        selected
      };
      const entities = { [entityName]: {}};
      return updateState(state, action, {
        statusUpdate: { statuses, entities },
        entityName
      });
    },

    [`CLEAR_${actionName}`](state) {
      return Object.assign({}, state, {
        [entityName]: {}
      });
    },

    [`RESET_${actionName}`](state) {
      // TODO: Reset errors and cache
      return Object.assign({}, state, {
        [entityName]: {}
      });
    }
  },
  mapValues(customActions, reducer => (state, action) => {
    const instanceState = Object.assign({}, state[name]);
    return Object.assign({}, state, { [name]: reducer(instanceState, action) });
  }));
}