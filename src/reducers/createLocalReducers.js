import _ from 'lodash';

export default function createLocalReducers(config, name, customState, customActions, options) {
  options = Object.assign({keyName: "id"}, options);
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    params: null,
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
  console.log('createLocalReducers', name)
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`FIND_${name}`](state, action) {
        let data = action.data;
        if(!_.isArray(data)) data = [data];
        return Object.assign({}, state, {
          init: true,
          items: data,
        });  
      },
      [`SYNC_${name}`](state, action) {
        let data = action.data;
        if(!_.isArray(data)) data = [data];
        let items = _.unionBy(data, [...state.items], config.keyName);
        return Object.assign({}, state, {
          init: true,
          items: items,
        });  
      },
      [`RECEIVE_${name}`](state, action) {
        let data = action.data;
        if(!_.isArray(data)) data = [data];
        let items = _.unionBy(data, [...state.items], config.keyName);
        return Object.assign({}, state, {
          items: items,
        })      
      },
      [`CREATE_${name}`](state, action) {
        return Object.assign({}, state, {
          items: [...state.items, action.data]
        })      
      },
      [`UPDATE_${name}`](state, action) {
      	var update = {};
        if(_.isObject(action.data) && action.data[config.keyName]) {
          var items = [...state.items];
          var updatedItem = _.find(items, (item) => item[config.keyName] == action.data[config.keyName]);
          items.splice(
          	_.findIndex(items, (item) => item[config.keyName] == action.data[config.keyName]), 
          	1, 
          	Object.assign({}, updatedItem, action.data)
          );
          update.items = items;
        }
        return Object.assign({}, state, update)      
      },
      [`DESTROY_${name}`](state, action) {
        var update = {};
        if(action.data[config.keyName]) {
          var items = [...state.items];
          let destroyedItem = _.find(items, (item) => item[config.keyName] == action.data[config.keyName]);
          items.splice(destroyedItemIndex, 1);
          update.items = items;
        }
        return Object.assign({}, state, update)      
      },
      [`CLEAR_${name}`](state, action) {
        return Object.assign({}, state, {
          items: []
        })     
      },
      [`SELECT_${name}`](state, action) {
        return Object.assign({}, state, {
          selected: action.data
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