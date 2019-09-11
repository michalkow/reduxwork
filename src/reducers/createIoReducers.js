import {
  toUpper,
  snakeCase,
  isEmpty,
  isEqual,
  isArray,
  unionBy,
  map,
  find,
  each,
  findIndex,
  filter,
  mapValues,
  flatMap,
  pickBy,
  isObject,
  isString,
  isNumber
} from 'lodash';
import { normalize } from 'normalizr';
import selectedUpdate from '../lib/selectedUpdate';
import { omitVirtualFields } from '../lib/fieldsOperations';

export const getEntityFromState = (state, name) =>
  ({ [name]: Object.assign({}, state[name]) });

export const getAffectedEntities = (state, entities = {}) =>
  pickBy(state, (value, key) => find(entities, key));

export const normalizeToEntities = (data, name, options) => {
  let datasets = isArray(data) ? data : [data];
  let normalizedDatasets = datasets.map(data => normalize(data, options.schemas[name]));
  let entities = {};
  normalizedDatasets.forEach(data =>
    data.entities.forEach((value, key) =>
      entities[key] = unionBy([value, entities[key]], options.keyName)
    )
  );
  return entities;
};

export const updateStatusesInState = (state, entities = {}, statuses = {}, options = {}) => {
  const affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map((entity) =>
    Object.assign({}, entity, statuses));
  return Object.assign({}, state, affectedEntities);
};

export const addEntitiesToState = (state, entities = {}, statuses = {}, options = {}) => {
  const affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map((entity, name) => {
    entity.items = [...entity.items, ...entities[name].items];
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

export const mergeEntitiesToState = (state, entities = {}, statuses = {}, options = {}) => {
  const affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map((entity, name) => {
    entity.items = unionBy([entities[name].items, entity.items], options.keyName);
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

export const updateEntitiesInState = (state, entities = {}, statuses = {}, options = {}) => {
  const affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map((entity, name) => {
    const [data] = entities[name].items;
    var updatedItem = find(entity.items, (item) => item[options.keyName] == data[options.keyName]);
    entity.items.splice(
      findIndex(entity.items, (item) => item[options.keyName] == data[options.keyName]),
      1,
      Object.assign({}, updatedItem, data)
    );
    entity.updatedItem = updatedItem;
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

export const removeEntitiesFromState = (state, entities = {}, statuses = {}, options = {}) => {
  const affectedEntities = getAffectedEntities(state, entities);
  affectedEntities.map((entity, name) => {
    const [data] = entities[name].items;
    const update = {};
    update.destroyedItem = find(entity.items, (item) => item[options.keyName] == data[options.keyName]);
    update.destroyedItemIndex = findIndex(entity.items, (item) => item[options.keyName] == data[options.keyName]);
    entity.items.splice(update.destroyedItemIndex, 1);
    return Object.assign({}, entity, statuses);
  });
  return Object.assign({}, state, affectedEntities);
};

export default function createIoReducer(name, customState = {}, customActions = {}, options = {}) {
  const initialState = Object.assign({}, {
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
  const actionName = toUpper(snakeCase(name));

  if (!options.schemas || !options.schemas[name])
    throw new Error('Missing normalize scheme');

  return Object.assign({
    [`RW_FIND_${actionName}`](state, action) {
      let entities = getEntityFromState(state, name);
      let statuses = {
        isFinding: true,
        findError: null
      };
      statuses.query = (action.data && !isEmpty(action.data)) ? action.data : null;
      if (!isEqual(statuses.query, state.query)) statuses.items = [];
      return updateStatusesInState(state, entities, statuses);
    },

    [`RW_FIND_${actionName}_FAILED`](state, action) {
      let entities = getEntityFromState(state, name);
      let statuses = {
        findError: action.error || null,
        validationError: action.validationError || null,
        isFinding: false
      };
      return updateStatusesInState(state, entities, statuses);
    },

    [`RW_FIND_${actionName}_COMPLETED`](state, action) {
      let entities = normalizeToEntities(action.data, name, options);
      let statuses = {
        init: true,
        isFinding: false,
        findError: null,
        validationError: null,
        items: action.data
      };
      return mergeEntitiesToState(state, entities, statuses);
    },

    [`RW_RECEIVE_${actionName}`](state, action) {
      let entities = normalizeToEntities(action.data, name, options);
      return mergeEntitiesToState(state, entities);
    },

    [`RW_REMOVE_${actionName}`](state, action) {
      let update = {};
      let { data } = action;
      let items = [...state.items];
      if (!isArray(data)) data = [data];
      each(data, (obj) => {
        if (obj[options.keyName])
          items.splice(findIndex(items, (item) => item[options.keyName] == obj[options.keyName]), 1);
      });
      update.items = items;
      let selected = update.items ? selectedUpdate(options, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    },

    [`RW_CREATE_${actionName}`](state, action) {
      let item = Object.assign({}, omitVirtualFields(action.data, options), { _temp: true });
      const normalizedData = normalize(item, options.schemas[name]);
      const entities = mapValues(normalizedData.entities, entity => ({ items: flatMap(entity) }));
      const statuses = {
        isWriting: true
      };
      return addEntitiesToState(state, entities, statuses);
    },

    [`RW_CREATE_${actionName}_FAILED`](state, action) {
      var items = [...state.items];
      if (action._tempId) {
        items = filter(items, (item) => item[options.keyName] != action._tempId);
      }
      return Object.assign({}, state, {
        isWriting: false,
        items: items,
        writeError: action.error || null,
        validationError: action.validationError || null
      });
    },

    [`RW_CREATE_${actionName}_COMPLETED`](state, action) {
      var items = [...state.items];
      if (action._tempId) {
        items = filter(items, (item) => item[options.keyName] != action._tempId);
      }
      return Object.assign({}, state, {
        isWriting: false,
        writeError: null,
        validationError: null,
        items: [...items, action.data]
      });
    },

    [`RW_UPDATE_${actionName}`](state, action) {
      var update = {
        isWriting: true
      };
      var data = omitVirtualFields(action.data, options);
      if (isObject(data) && data[options.keyName]) {
        var items = [...state.items];
        var updatedItem = find(items, (item) => item[options.keyName] == data[options.keyName]);
        items.splice(
          findIndex(items, (item) => item[options.keyName] == data[options.keyName]),
          1,
          Object.assign({}, updatedItem, data)
        );
        update.updatedItem = updatedItem;
        update.items = items;
      }
      return Object.assign({}, state, update);
    },

    [`RW_UPDATE_${actionName}_FAILED`](state, action) {
      var update = {
        isWriting: false,
        updateError: action.error || null,
        validationError: action.validationError || null,
        updatedItem: null
      };
      if (state.updatedItem && state.updatedItem[options.keyName]) {
        var items = [...state.items];
        items.splice(
          findIndex(items, (item) => item[options.keyName] == state.updatedItem[options.keyName]),
          1,
          state.updatedItem
        );
        update.items = items;
      }
      return Object.assign({}, state, update);
    },

    [`RW_UPDATE_${actionName}_COMPLETED`](state, action) {
      var update = {
        isWriting: false,
        updateError: null,
        validationError: null,
        updatedItem: null
      };
      if (action._rewrite || (options.rewriteOnUpdate && action._rewrite !== false)) {
        var items = [...state.items];
        let { data } = action;
        if (!isArray(data)) data = [data];
        update.items = unionBy(data, items, options.keyName);
      }
      let selected = update.items ? selectedUpdate(options, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    },

    [`RW_DESTROY_${actionName}`](state, action) {
      var update = {
        isWriting: true
      };
      if (action.data[options.keyName]) {
        var items = [...state.items];
        update.destroyedItem = find(items, (item) => item[options.keyName] == action.data[options.keyName]);
        update.destroyedItemIndex = findIndex(items, (item) => item[options.keyName] == action.data[options.keyName]);
        items.splice(update.destroyedItemIndex, 1);
        update.items = items;
      }
      return Object.assign({}, state, update);
    },

    [`RW_DESTROY_${actionName}_FAILED`](state, action) {
      var update = {
        isWriting: false,
        destroyError: action.error || null,
        validationError: action.validationError || null,
        destroyedItem: null,
        destroyedItemIndex: null
      };
      if (state.destroyedItem && state.destroyedItemIndex != null) {
        var items = [...state.items];
        items.splice(state.destroyedItemIndex, 0, state.destroyedItem);
        update.items = items;
      }
      return Object.assign({}, state, update);
    },

    [`RW_DESTROY_${actionName}_COMPLETED`](state) {
      let selected = selectedUpdate(options, state, state.items);
      return Object.assign({}, state, {
        isWriting: false,
        destroyError: null,
        validationError: null,
        destroyedItem: null,
        destroyedItemIndex: null
      }, selected);
    },

    [`RW_CLEAR_${actionName}`](state) {
      return Object.assign({}, state, {
        items: [],
        selected: null
      });
    },

    [`RW_SELECT_${actionName}`](state, action) {
      let selected = null;
      if (isString(action.data) || isNumber(action.data)) selected = find(state.items, (item) => item[options.keyName] == action.data);
      else if (isObject(action.data) && action.data[options.keyName]) selected = find(state.items, (item) => item[options.keyName] == action.data[options.keyName]) || action.data;
      else selected = action.data;
      return Object.assign({}, state, {
        selected: selected
      });
    },

    [`RW_RESET_${actionName}`]() {
      return Object.assign({}, initialState);
    }
  }, customActions);
}