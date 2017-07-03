import _ from 'lodash';

function toUndersocore (string) {
  return string.split(/(?=[A-Z])/).join('_').toUpperCase();
}

export function createFetchReducer(name, customState, customActions) {
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    params: null,
    isFetching: false,
    isSyncing: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: []
  }, customState);
  name = toUndersocore(name);
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`FIND_${name}`](state, action) {
        let find = {
          isFetching: true,
          findError: null
        };
        find.query = action.query || null;
        find.params = action.params || null;
        if(!_.isEqual(find.query, state.query) || !_.isEqual(find.params, state.params)) find.items = [];
        return Object.assign({}, state, find);  
      },
      [`FIND_${name}_FAILED`](state, action) {
        return Object.assign({}, state, {
          findError: action.error,
          isFetching: false,
        })
      },
      [`FIND_${name}_COMPLETED`](state, action) {
        return Object.assign({}, state, {
          init: true,
          isFetching: false,
          findError: null,
          items: action.data,
          lastUpdated: action.receivedAt
        })      
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
        let items = _.unionBy(_.clone(state.items), data, '_id');
        return Object.assign({}, state, {
          isSyncing: false,
          syncError: null,
          items: items,
          lastUpdated: action.receivedAt
        })      
      },
      [`RECEIVE_${name}`](state, action) {
        if(_.find(state.items, {_id: action.data._id})) {
          var items = Object.assign({}, state.items);
          items = _.reject(items, {_id: action.data._id});
          items.push(action.data);
        } else {
          var items = _.concat(state.items, action.data);
        }
        return Object.assign({}, state, {
          isFetching: false,
          findError: null,
          items: items,
          lastUpdated: action.receivedAt
        })      
      },
      [`CREATE_${name}`](state, action) {
        let item = Object.assign({}, action.data, {_id: action.tempId, _temp: true});
        return Object.assign({}, state, {
          isWritting: true,
          items: [...state.items, item]
        })      
      },
      [`CREATE_${name}_FAILED`](state, action) {
        var items = state.items.filter(function(obj) {
            return obj._id !== action.tempId;
        });
        return Object.assign({}, state, {
          isWritting: false,
          items: items,
          writeError: action.error
        })      
      },
      [`CREATE_${name}_COMPLETED`](state, action) {
        var items = state.items.filter(function(obj) {
            return obj._id !== action.tempId;
        });
        return Object.assign({}, state, {
          isWritting: false,
          writeError: null,
          items: [...items, action.data]
        })      
      },
      [`UPDATE_${name}`](state, action) {
        var update = {}
        if(action.data._id) {
          let items = _.cloneDeep(state.items);
          for (var i = 0; i < items.length; i++) {
            if(action.data._id==items[i]._id) {
              update.updatedItem = items[i];
              _.extend(items[i], action.data, {_temp: true});
              update.items = items;
              break;
            } 
          };
        }
        return Object.assign({}, state, {
          isWritting: true,
        }, update)      
      },
      [`UPDATE_${name}_FAILED`](state, action) {
        var update = {}
        if(state.updatedItem._id) {
          let items = _.cloneDeep(state.items);
          for (var i = 0; i < items.length; i++) {
            if(state.updatedItem._id==items[i]._id) {
              for(var key in items[i]) {
                if(key!="_id") items[i][key] = state.updatedItem[key];
              }
              update.items = items;
              update.updatedItem = null;
              break;
            } 
          };
        }
        return Object.assign({}, state, {
          isWritting: false,
          updateError: action.error
        }, update)      
      },
      [`UPDATE_${name}_COMPLETED`](state, action) {
        var update = {}
        if(action.rewrite) {
          if(action.data._id) {
            if(state.selected && action.data._id==state.selected._id) {
              update.selected = action.data;
            }
            let items = _.cloneDeep(state.items);
            for (var i = 0; i < items.length; i++) {
              if(action.data._id==items[i]._id) {
                for(var key in items[i]) {
                  if(key!="_id") items[i][key] = action.data[key];
                }
                break;
              } 
            };
            update.items = items;
          }
        }
        return Object.assign({}, state, {
          isWritting: false,
          updateError: null,
        }, update)      
      },
      [`DESTROY_${name}`](state, action) {
        var del = {}
        if(action.data._id) {
          var items = Object.assign({}, state.items);
          var items = _.filter(items, function(obj, index) {
              if(obj._id == action.data._id) {
                del.destroyedItem = action.data;
                del.destroyedItemIndex = index;
                return false;
              } else return true;
          });
          del.items = items;
        }
        return Object.assign({}, state, {
          isWritting: true,
        }, del)      
      },
      [`DESTROY_${name}_FAILED`](state, action) {
        var items = [...state.items];
        if(state.destroyedItem) {
          items.splice(state.destroyedItemIndex, 0, state.destroyedItem);
        }
        return Object.assign({}, state, {
          isWritting: false,
          items: items,
          destroyError: action.error,
          destroyedItem: null,
          destroyedItemIndex: null,
        }, del)      
      },
      [`DESTROY_${name}_COMPLETED`](state, action) {
        return Object.assign({}, state, {
          isWritting: false,
          destroyError: null,
          destroyedItem: null,
          destroyedItemIndex: null,
        })     
      },
      [`CLEAR_${name}`](state, action) {
        return Object.assign({}, state, {
          isWritting: false,
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

export function createLocalReducer(name, customState, customActions) {
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, {
    init: false,
    selected: null,
    items: [],
  }, customState);
  name = toUndersocore(name);
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`FIND_${name}`](state, action) {
        let items = _.uniqBy(_.concat(state.items, action.data), '_id');
        return Object.assign({}, state, {
          items: items,
          lastUpdated: action.receivedAt
        })    
      },
      [`SYNC_${name}`](state, action) {
        let items = _.uniqBy(_.concat(state.items, action.data), '_id');
        return Object.assign({}, state, {
          items: items,
          lastUpdated: action.receivedAt
        })   
      },
      [`RECEIVE_${name}`](state, action) {
        if(_.find(state.items, {_id: action.data._id})) return state;
        else {
          let items = _.concat(state.items, action.data);
          return Object.assign({}, state, {
            items: items,
            lastUpdated: action.receivedAt
          })      
        }
      },
      [`CREATE_${name}`](state, action) {
        if(_.find(state.items, {_id: action.data._id})) return state;
        else {
          let items = _.concat(state.items, action.data);
          return Object.assign({}, state, {
            items: items,
            lastUpdated: action.receivedAt
          })      
        }
      },
      [`UPDATE_${name}`](state, action) {
        var update = {}
        if(action.data._id) {
          let items = _.cloneDeep(state.items);
          for (var i = 0; i < items.length; i++) {
            if(action.data._id==items[i]._id) {
              update.updatedItem = items[i];
              _.extend(items[i], action.data);
              update.items = items;
              break;
            } 
          };
        }
        return Object.assign({}, state, {
          isWritting: true,
        }, update)      
      },
      [`DESTROY_${name}`](state, action) {
        var del = {}
        if(action.data._id) {
          var items = state.items.filter(function(obj, index) {
              if(obj._id == action.data._id) return false;
              else return true;
          });
          del.items = items;
        }
        return Object.assign({}, state, del)      
      },
      [`CLEAR_${name}`](state, action) {
        return Object.assign({}, state, {
          isWritting: false,
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

export function createGetReducer(name, customState, customActions) {
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, {
    selected: null,
    query: null,
    params: null,
    isFetching: false,
    findError: null,
    items: []
  }, customState);
  name = toUndersocore(name);
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`GET_${name}`](state, action) {
        let find = {
          isFetching: true,
          findError: null
        };
        find.query = action.query || null;
        find.params = action.params || null;
        if(!_.isEqual(find.query, state.query) || !_.isEqual(find.params, state.params)) find.items = [];
        return Object.assign({}, state, find);  
      },
      [`GET_${name}_FAILED`](state, action) {
        return Object.assign({}, state, {
          findError: action.error
        })
      },
      [`GET_${name}_COMPLETED`](state, action) {
        return Object.assign({}, state, {
          isFetching: false,
          findError: null,
          items: action.data,
          lastUpdated: action.receivedAt
        })      
      },
      [`RECEIVE_${name}`](state, action) {
        return Object.assign({}, state, {
          isFetching: false,
          findError: null,
          items: action.data,
          lastUpdated: action.receivedAt
        })      
      },
      [`RESET_${name}`](state, action) {
        return Object.assign({}, initialState);
      },
      [`CLEAR_${name}`](state, action) {
        return Object.assign({}, state, {
          isWritting: false,
          items: []
        })     
      },
      [`SELECT_${name}`](state, action) {
        return Object.assign({}, state, {
          selected: action.selected
        })  
      },
    });
    if(customActions[rAction.type]) return customActions[rAction.type](rState, rAction);
    else if(defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);
    else return rState;
  }
}

export function createReducer(name, customState, customActions) {
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, customState);
  name = toUndersocore(name);
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`RESET_${name}`](state, action) {
        return Object.assign({}, initialState);
      }
    });
    if(customActions[rAction.type]) return customActions[rAction.type](rState, rAction);
    else if(defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);
    else return rState;
  }
}


export function createSocketReducer(name, customState, customActions) {
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    isSyncing: false,
    error: null,
    items: []
  }, customState);
  name = toUndersocore(name);
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`SYNC_${name}`](state, action) {
        let init = state.init ? {} : {init: true};
        var mergedList = _.map(state.items, function(item){
          return _.extend(item, _.find(action.data, { _id: item._id }));
        });
        var newVale = _.differenceBy(action.data, state.items, '_id');
        return Object.assign({}, state, {
          items: _.concat(mergedList, newVale)
        }, init);  
      },
      [`CREATE_${name}`](state, action) {
        return Object.assign({}, state, {
          isWritting: true,
          items: [...state.items, action.data]
        })      
      },
      [`UPDATE_${name}`](state, action) {
        var update = {}
        if(action.data._id) {
          let items = _.cloneDeep(state.items);
          for (var i = 0; i < items.length; i++) {
            if(action.data._id==items[i]._id) {
              _.extend(items[i], action.data);
              update.items = items;
              break;
            } 
          };
        }
        if(state.selected && action.data._id == state.selected._id) update.selected = action.data;
        return Object.assign({}, state, update)      
      },
      [`DESTROY_${name}`](state, action) {
        return Object.assign({}, state, {
          items: _.reject(state.items, {_id: action.id}),
        })      
      },
      [`CLEAR_${name}`](state, action) {
        return Object.assign({}, state, {
          items: []
        })     
      },
      [`SELECT_${name}`](state, action) {
        return Object.assign({}, state, {
          selected: action.data
        });
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