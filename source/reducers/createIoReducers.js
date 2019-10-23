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
import { parseLocalData } from '../lib/fieldsOperations';
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
      const { uuid } = action;
      const statuses = {
        isFinding: true,
        findError: null
      };
      const entities = { [entityName]: {}};
      return updateState(state, {
        statusUpdate: { statuses, entities },
        uuid
      });
    },

    [`FIND_${actionName}_FAILED`](state, action) {
      const { uuid, error } = action;
      const statuses = {
        isFinding: false
      };
      const entities = { [entityName]: {}};
      return updateState(state, {
        statusUpdate: { statuses, entities },
        errorsUpdate: { uuid, error },
        uuid
      });
    },

    [`FIND_${actionName}_COMPLETED`](state, action) {
      const { uuid } = action;
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        init: true,
        isFinding: false
      };
      return upsertEntitiesToState(state, { uuid, entities, statuses });
    },

    [`RECEIVE_${actionName}`](state, action) {
      const { uuid } = action;
      const entities = normalizeToEntities(action.data, name, options);
      return upsertEntitiesToState(state, { uuid, entities });
    },

    [`REMOVE_${actionName}`](state, action) {
      const { uuid } = action;
      const entities = normalizeToEntities(action.data, name, options);
      return removeEntitiesFromState(state, { uuid, entities, cache: false });
    },

    [`CREATE_${actionName}`](state, action) {
      const { uuid } = action;
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        isWriting: true
      };
      return addEntitiesToState(state, { uuid, entities, statuses, cache: true });
    },

    [`CREATE_${actionName}_FAILED`](state, action) {
      const { uuid, error } = action;
      const entities = state.actionCache[uuid];
      const statuses = {
        isWriting: false
      };
      return removeEntitiesFromState(state, { uuid, entities, statuses, error, cache: false });
    },

    [`CREATE_${actionName}_COMPLETED`](state, action) {
      const { uuid } = action;
      const statuses = {
        isWriting: false
      };
      const entities = state.actionCache[uuid];
      return updateEntitiesInState(state, { uuid, entities, statuses, cache: false }, options);
    },

    [`UPDATE_${actionName}`](state, action) {
      const { uuid } = action;
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        isWriting: true
      };
      return updateEntitiesInState(state, { uuid, entities, statuses, cache: true }, options);
    },

    [`UPDATE_${actionName}_FAILED`](state, action) {
      const { uuid, error } = action;
      const entities = state.actionCache[uuid];
      const statuses = {
        isWriting: false
      };
      return updateEntitiesInState(state, { uuid, entities, statuses, error, cache: false }, options);
    },

    [`UPDATE_${actionName}_COMPLETED`](state, action) {
      const { uuid } = action;
      const statuses = {
        isWriting: false
      };
      const entities = state.actionCache[uuid];
      return updateEntitiesInState(state, { uuid, entities, statuses, cache: false }, options);
    },

    [`DESTROY_${actionName}`](state, action) {
      const { uuid } = action;
      const entities = normalizeToEntities(action.payload, entityName, options);
      const statuses = {
        isWriting: true
      };
      return removeEntitiesFromState(state, { uuid, entities, statuses, cache: true });
    },

    [`DESTROY_${actionName}_FAILED`](state, action) {
      const { uuid, error } = action;
      const entities = state.actionCache[uuid];
      const statuses = {
        isWriting: false
      };
      return addEntitiesToState(state, { uuid, entities, statuses, error, cache: false });
    },

    [`DESTROY_${actionName}_COMPLETED`](state, action) {
      const { uuid } = action;
      const statuses = {
        isWriting: false
      };
      const entities = { [entityName]: {}};
      return updateState(state, {
        statusUpdate: { statuses, entities },
        uuid
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
      return updateState(state, {
        statusUpdate: { statuses, entities }
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