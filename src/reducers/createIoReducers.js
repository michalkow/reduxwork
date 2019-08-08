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
  isObject,
  isString,
  isNumber
} from 'lodash';
import selectedUpdate from '../lib/selectedUpdate';
import { omitVirtualFields } from '../lib/fieldsOperations';

export default function createIoReducers(reducerName, customState = {}, customActions = {}, options = {}) {
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
  const name = toUpper(snakeCase(reducerName));
  return function(rState = initialState, rAction) {
    const defaultActions = Object.assign({
      [`FIND_${name}`](state, action) {
        let find = {
          isFinding: true,
          findError: null
        };
        find.query = (action.data && !isEmpty(action.data)) ? action.data : null;
        if (!isEqual(find.query, state.query)) find.items = [];
        return Object.assign({}, state, find);
      },

      [`FIND_${name}_FAILED`](state, action) {
        return Object.assign({}, state, {
          findError: action.error || null,
          validationError: action.validationError || null,
          isFinding: false
        });
      },

      [`FIND_${name}_COMPLETED`](state, action) {
        let selected = selectedUpdate(options, state, action.data);
        return Object.assign({}, state, {
          init: true,
          isFinding: false,
          findError: null,
          validationError: null,
          items: action.data
        }, selected);
      },

      [`SYNC_${name}`](state) {
        return Object.assign({}, state, {
          isSyncing: true,
          syncError: null
        });
      },

      [`SYNC_${name}_FAILED`](state, action) {
        return Object.assign({}, state, {
          syncError: action.error || null,
          validationError: action.validationError || null,
          isSyncing: false
        });
      },

      [`SYNC_${name}_COMPLETED`](state, action) {
        let { data } = action;
        if (!isArray(data)) data = [data];
        let items = unionBy(data, [...state.items], options.keyName);
        let selected = selectedUpdate(options, state, items);
        return Object.assign({}, state, {
          isSyncing: false,
          syncError: null,
          validationError: null,
          init: true,
          items: items
        }, selected);
      },

      [`RECEIVE_${name}`](state, action) {
        let { data } = action;
        if (!isArray(data)) data = [data];
        let update = map(data, obj => {
          let existing = find(state.items, item => item[options.keyName] == obj[options.keyName]);
          return existing ? Object.assign({}, existing, obj) : obj;
        });
        let items = unionBy(update, [...state.items], options.keyName);
        let selected = selectedUpdate(options, state, items);
        return Object.assign({}, state, {
          items: items
        }, selected);
      },

      [`REMOVE_${name}`](state, action) {
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

      [`CREATE_${name}`](state, action) {
        let item = Object.assign({}, omitVirtualFields(options, action.data), { _temp: true });
        return Object.assign({}, state, {
          isWriting: true,
          items: [...state.items, item]
        });
      },

      [`CREATE_${name}_FAILED`](state, action) {
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

      [`CREATE_${name}_COMPLETED`](state, action) {
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

      [`UPDATE_${name}`](state, action) {
        var update = {
          isWriting: true
        };
        var data = omitVirtualFields(options, action.data);
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

      [`UPDATE_${name}_FAILED`](state, action) {
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

      [`UPDATE_${name}_COMPLETED`](state, action) {
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

      [`DESTROY_${name}`](state, action) {
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

      [`DESTROY_${name}_FAILED`](state, action) {
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

      [`DESTROY_${name}_COMPLETED`](state) {
        let selected = selectedUpdate(options, state, state.items);
        return Object.assign({}, state, {
          isWriting: false,
          destroyError: null,
          validationError: null,
          destroyedItem: null,
          destroyedItemIndex: null
        }, selected);
      },

      [`CLEAR_${name}`](state) {
        return Object.assign({}, state, {
          items: [],
          selected: null
        });
      },

      [`SELECT_${name}`](state, action) {
        let selected = null;
        if (isString(action.data) || isNumber(action.data)) selected = find(state.items, (item) => item[options.keyName] == action.data);
        else if (isObject(action.data) && action.data[options.keyName]) selected = find(state.items, (item) => item[options.keyName] == action.data[options.keyName]) || action.data;
        else selected = action.data;
        return Object.assign({}, state, {
          selected: selected
        });
      },

      [`RESET_${name}`]() {
        return Object.assign({}, initialState);
      }
    });
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);
    else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);
    else return rState;
  };
}