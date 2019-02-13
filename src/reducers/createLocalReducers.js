import {
  toUpper,
  snakeCase,
  isArray,
  unionBy,
  find,
  findIndex,
  isObject,
  reject
} from 'lodash';
import selectedUpdate from '../lib/selectedUpdate';
import { stripVirtualParseLocalFields } from '../lib/fieldsOperations';

export default function createLocalReducers(config = {}, reducerName, customState = {}, customActions = {}) {
  if (!config.keyName) config.keyName = 'id';
  let initialState = Object.assign({}, {
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
    error: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: []
  }, customState);
  const name = toUpper(snakeCase(reducerName));
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`FIND_${name}`](state, action) {
        let { data } = action;
        if (!isArray(data)) data = [data];
        let selected = selectedUpdate(config, state, data);
        return Object.assign({}, state, {
          init: true,
          items: data
        }, selected);
      },
      [`SYNC_${name}`](state, action) {
        let { data } = action;
        if (!isArray(data)) data = [data];
        let items = unionBy(data, [...state.items], config.keyName);
        let selected = selectedUpdate(config, state, items);
        return Object.assign({}, state, {
          init: true,
          items: items
        }, selected);
      },
      [`RECEIVE_${name}`](state, action) {
        let { data } = action;
        if (!isArray(data)) data = [data];
        let items = unionBy(data, [...state.items], config.keyName);
        let selected = selectedUpdate(config, state, items);
        return Object.assign({}, state, {
          items: items
        }, selected);
      },
      [`CREATE_${name}`](state, action) {
        return Object.assign({}, state, {
          items: [...state.items, stripVirtualParseLocalFields(action.data)]
        });
      },
      [`UPDATE_${name}`](state, action) {
        var update = {};
        var data = stripVirtualParseLocalFields(action.data);
        if (isObject(data) && data[config.keyName]) {
          var items = [...state.items];
          var updatedItem = find(items, (item) => item[config.keyName] == data[config.keyName]);
          items.splice(
            findIndex(items, (item) => item[config.keyName] == data[config.keyName]),
            1,
            Object.assign({}, updatedItem, data)
          );
          update.items = items;
        }
        let selected = update.items ? selectedUpdate(config, state, update.items) : {};
        return Object.assign({}, state, update, selected);
      },
      [`DESTROY_${name}`](state, action) {
        var update = {};
        if (action.data[config.keyName]) {
          var items = [...state.items];
          update.items = reject(items, (item) => item[config.keyName] == action.data[config.keyName]);
        }
        let selected = update.items ? selectedUpdate(config, state, update.items) : {};
        return Object.assign({}, state, update, selected);
      },
      [`CLEAR_${name}`](state) {
        return Object.assign({}, state, {
          items: [],
          selected: null
        });
      },
      [`SELECT_${name}`](state, action) {
        return Object.assign({}, state, {
          selected: action.data
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