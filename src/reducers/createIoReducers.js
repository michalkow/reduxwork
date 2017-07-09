import _ from 'lodash';
import selectedUpdate from '../lib/selectedUpdate';

export default function createIoReducers(config, name, customState, customActions) {
	if(!config) config = {};
  if(!config.keyName) config.keyName = 'id';
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    isFinding: false,
    isSyncing: false,
    isWritting: false,
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
  name = _.toUpper(_.snakeCase(name));
  console.log('createIoReducers', name)
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`FIND_${name}`](state, action) {
        let find = {
          isFinding: true,
          findError: null,
        };
        find.query = (action.data && !_.isEmpty(action.data)) ? action.data : null;
        if(!_.isEqual(find.query, state.query)) find.items = [];
        return Object.assign({}, state, find);  
      },
      [`FIND_${name}_FAILED`](state, action) {
        return Object.assign({}, state, {
          findError: action.error,
          isFinding: false,
        })
      },
      [`FIND_${name}_COMPLETED`](state, action) {
        let selected = selectedUpdate(state, action.data);
        return Object.assign({}, state, {
          init: true,
          isFinding: false,
          findError: null,
          items: action.data,
        }, selected)      
      },
      [`SYNC_${name}`](state, action) {
        return Object.assign({}, state, {
          isSyncing: true,
          syncError: null
        });  
      },
      [`SYNC_${name}_FAILED`](state, action) {
        return Object.assign({}, state, {
          syncError: action.error,
          isSyncing: false,
        })
      },
      [`SYNC_${name}_COMPLETED`](state, action) {
        let data = action.data;
        if(!_.isArray(data)) data = [data];
        let items = _.unionBy(data, [...state.items], config.keyName);
        let selected = selectedUpdate(state, items);
        return Object.assign({}, state, {
          isSyncing: false,
          syncError: null,
          init: true,
          items: items,
        }, selected)      
      },
      [`RECEIVE_${name}`](state, action) {
        let data = action.data;
        if(!_.isArray(data)) data = [data];
        let items = _.unionBy(data, [...state.items], config.keyName);
        let selected = selectedUpdate(state, items);
        return Object.assign({}, state, {
          items: items,
        }, selected)     
      },
      [`REMOVE_${name}`](state, action) {
        var update = {};
        if(action.data[config.keyName]) {
          var items = [...state.items];
          items.splice(_.findIndex(items, (item) => item[config.keyName] == action.data[config.keyName]), 1);
          update.items = items;
        }
        let selected = update.items ? selectedUpdate(state, update.items) : {};
        return Object.assign({}, state, update, selected)    
      },
      [`CREATE_${name}`](state, action) {
        let item = Object.assign({}, action.data, {_temp: true});
        console.log('CREATE', action)
        return Object.assign({}, state, {
          isWritting: true,
          items: [...state.items, item]
        })      
      },
      [`CREATE_${name}_FAILED`](state, action) {
        var items = state.items.filter(function(obj) {
            return obj[config.keyName] !== action.tempId;
        });
        return Object.assign({}, state, {
          isWritting: false,
          items: items,
          writeError: action.error
        })      
      },
      [`CREATE_${name}_COMPLETED`](state, action) {
        var items = state.items.filter(function(obj) {
            return obj[config.keyName] !== action.tempId;
        });
        return Object.assign({}, state, {
          isWritting: false,
          writeError: null,
          items: [...items, action.data]
        })      
      },
      [`UPDATE_${name}`](state, action) {
      	var update = {
        	isWritting: true
        };
        if(_.isObject(action.data) && action.data[config.keyName]) {
          var items = [...state.items];
          var updatedItem = _.find(items, (item) => item[config.keyName] == action.data[config.keyName]);
          items.splice(
          	_.findIndex(items, (item) => item[config.keyName] == action.data[config.keyName]), 
          	1, 
          	Object.assign({}, updatedItem, action.data)
          );
          update.updatedItem = updatedItem;
          update.items = items;
        }
        return Object.assign({}, state, update)      
      },
      [`UPDATE_${name}_FAILED`](state, action) {
      	var update = {
          isWritting: false,
          updateError: action.error,
          updatedItem: null
        };
        if(state.updatedItem && state.updatedItem[config.keyName]) {
          var items = [...state.items];
          items.splice(
          	_.findIndex(items, (item) => item[config.keyName] == state.updatedItem[config.keyName]), 
          	1, 
          	state.updatedItem
          );
          update.items = items;
        }
        return Object.assign({}, state, update)      
      },
      [`UPDATE_${name}_COMPLETED`](state, action) {
       	var update = {
          isWritting: false,
          updateError: null,
          updatedItem: null,
        };
        if(action.rewrite || config.rewriteOnUpdate) {
        	var items = [...state.items];
          let data = action.data;
	        if(!_.isArray(data)) data = [data];
	        update.items = _.unionBy(data, items, config.keyName);
        }
        console.log(update)
        let selected = update.items ? selectedUpdate(state, update.items) : {};
        return Object.assign({}, state, update, selected)      
      },
      [`DESTROY_${name}`](state, action) {
        var update = {
        	isWritting: true
        };
        if(action.data[config.keyName]) {
          var items = [...state.items];
          update.destroyedItem = _.find(items, (item) => item[config.keyName] == action.data[config.keyName]);
          update.destroyedItemIndex = _.findIndex(items, (item) => item[config.keyName] == action.data[config.keyName]);
          items.splice(update.destroyedItemIndex, 1);
          update.items = items;
        }
        return Object.assign({}, state, update)      
      },
      [`DESTROY_${name}_FAILED`](state, action) {
        var update = {
          isWritting: false,
          destroyError: action.error,
          destroyedItem: null,
          destroyedItemIndex: null,
        };
        if(state.destroyedItem && state.destroyedItemIndex!=null) {
        	var items = [...state.items];
          items.splice(state.destroyedItemIndex, 0, state.destroyedItem);
          update.items = items;
        }
        return Object.assign({}, state, update)      
      },
      [`DESTROY_${name}_COMPLETED`](state, action) {
        let selected = selectedUpdate(state, state.items);
        return Object.assign({}, state, {
          isWritting: false,
          destroyError: null,
          destroyedItem: null,
          destroyedItemIndex: null,
        }, selected)     
      },
      [`CLEAR_${name}`](state, action) {
        return Object.assign({}, state, {
          items: [],
          selected: null
        })     
      },
      [`SELECT_${name}`](state, action) {
        let selected = null;
        if(_.isString(action.data) || _.isNumber(action.data)) selected = _.find(state.items, (item) => item[config.keyName] == action.data);
        if(_.isObject(action.data) && action.data[config.keyName]) selected = _.find(state.items, (item) => item[config.keyName] == action.data[config.keyName]);
        else selected = action.data;
        return Object.assign({}, state, {
          selected: selected
        })  
      },
      [`RESET_${name}`](state, action) {
        return Object.assign({}, initialState);
      }
    });
    if(customActions[rAction.type]) return customActions[rAction.type](rState, rAction);
    else if(defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);
    else return rState;
  }
}