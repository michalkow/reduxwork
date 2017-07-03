import _ from 'lodash';
import {createFetchReducer, createLocalReducer, createGetReducer, createReducer, createSocketReducer} from './reducersHelpers.js'

var userDefaultState = {
  data: window.user,
  isWritting: false,
  editError: null,
  isFetching: false,
  fetchError: null,
  _temp: null
}

export default {
  characters: createFetchReducer('characters', {

  }, {
    IO_UPDATE_CHARACTERS(state, action) {
      var items = Object.assign({}, state.items);
      var selected = Object.assign({}, state.selected);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      if(selected._id == action.data._id) selected = action.data;
      return Object.assign({}, state, {
        items: Object.assign({}, items),
        selected: selected
      })    
    },   
    IO_SWITCH_CHARACTERS(state, action) {
      var items = Object.assign({}, state.items);
      var lastActive = _.find(items, {user_id: action.data.user_id, active: true});
      if(lastActive) {
        lastActive.active = false;
        items = _.reject(items, {_id: lastActive._id});
        items.push(lastActive);
      }
      var newActive = _.find(items, {user_id: action.data.user_id, _id: action.data.character_id});
      newActive.active = true;
      newActive.idle = false;
      items = _.reject(items, {_id: newActive._id});
      items.push(newActive);
      var selected = Object.assign({}, state.selected);
      if(selected.user_id == action.data.user_id) selected = newActive;
      return Object.assign({}, state, {
        items: Object.assign({}, items),
        selected: selected
      })    
    },   
    SWITCH_CHARACTERS(state, action) {
      var selected = {};
      if(action.data.creator) selected = {selected: action.data};
      return Object.assign({}, state, selected)        
    },   
    SWITCH_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      var lastActive = _.find(items, {user_id: action.data.user_id, active: true});
      if(lastActive) {
        lastActive.active = false;
        items = _.reject(items, {_id: lastActive._id});
        items.push(lastActive);
      }
      var newActive = _.find(items, {user_id: action.data.user_id, _id: action.data._id});
      newActive.active = true;
      newActive.idle = false;
      items = _.reject(items, {_id: newActive._id});
      items.push(newActive);
      return Object.assign({}, state, {
        selected: newActive,
        items: Object.assign({}, items)
      })        
    },    
    SELECT_RACE_CHARACTERS(state, action) {
      return Object.assign({}, state, {
        isWritting: true
      })        
    },        
    SELECT_RACE_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false
      })        
    },   
    SELECT_RACE_CHARACTERS_FAILED(state, action) {
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false
      })        
    },     
    SELECT_BREED_CHARACTERS(state, action) {
      return Object.assign({}, state, {
        isWritting: true
      })        
    },        
    SELECT_BREED_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false
      })        
    },   
    SELECT_BREED_CHARACTERS_FAILED(state, action) {
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false
      })        
    },     
    SELECT_AUSPICE_CHARACTERS(state, action) {
      return Object.assign({}, state, {
        isWritting: true
      })        
    },        
    SELECT_AUSPICE_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false
      })        
    },   
    SELECT_AUSPICE_CHARACTERS_FAILED(state, action) {
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false
      })        
    },     
    SELECT_CLAN_CHARACTERS(state, action) {
      return Object.assign({}, state, {
        isWritting: true
      })        
    },        
    SELECT_CLAN_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false
      })        
    },   
    SELECT_CLAN_CHARACTERS_FAILED(state, action) {
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false
      })        
    },     
    UPDATE_POINTS_CHARACTERS(state, action) {
      var oldSelected = _.cloneDeep(state.selected);
      var updatedSelected = _.cloneDeep(state.selected);
      if(action.data.type == "stats") updatedSelected[action.data.skill] = action.data.level;
      else updatedSelected[action.data.type][action.data.skill] = action.data.level;
      return Object.assign({}, state, {
        isWritting: true,
        selected: updatedSelected,
        oldSelected: oldSelected
      })        
    },        
    UPDATE_POINTS_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false,
        oldSelected: null
      })        
    },   
    UPDATE_POINTS_CHARACTERS_FAILED(state, action) {
      var selected = _.cloneDeep(state.oldSelected);
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false,
        selected: selected,
        oldSelected: null
      })        
    },     
    VALIDATE_SHEET_CHARACTERS(state, action) {
      return Object.assign({}, state, {
        isWritting: true
      })     
    },        
    VALIDATE_SHEET_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false
      })              
    },   
    VALIDATE_SHEET_CHARACTERS_FAILED(state, action) {
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false
      })         
    },     
    SET_SKILL_PRIORITY_CHARACTERS(state, action) {
      return Object.assign({}, state, {
        isWritting: true
      })        
    },        
    SET_SKILL_PRIORITY_CHARACTERS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items,
        selected: action.data,
        isWritting: false
      })        
    },   
    SET_SKILL_PRIORITY_CHARACTERS_FAILED(state, action) {
      return Object.assign({}, state, {
        writeError: action.error,
        isWritting: false
      })        
    },     
  }),
  users: createLocalReducer('users', {

  }, {
   
  }),
  chats: createFetchReducer('chats', {

  }, {
   
  }),
  messages: createFetchReducer('messages', {
 
  }, {

  }),
  friendships: createFetchReducer('friendships', {
 
  }, {
    ANSWER_FRIENDSHIPS_COMPLETED(state, action) {
      var items = Object.assign({}, state.items);
      items = _.reject(items, {_id: action.data._id});
      items.push(action.data);
      return Object.assign({}, state, {
        items: items
      })              
    },   
  }),
  notifications: createFetchReducer('notifications', {
   
  }, {
    READ_MESSAGES_NOTIFICATIONS(state, action) {
      var items = Object.assign({}, state.items);
      items = _.map(items, (item) => {
        if(item._about==action.data.character_id) item.read = true;
        return item
      });     
      return Object.assign({}, state, {
        items: items,
      });     
    },  
  }),
  locations: createFetchReducer('locations', {
 
  }, {

  }),
  user: createReducer('user', userDefaultState, {
    PUSH_USER_DATA(state, action) {
      return Object.assign({}, state, {
        data: action.data,
      })        
    },     
    UPDATE_USER(state, action) {
      let temp = _.cloneDeep(state.data);
      let edit = {_temp: temp, data: Object.assign({}, state.data, action.data)};
      return Object.assign({}, state, {
        isWritting: true,
      }, edit)      
    },
    UPDATE_USER_FAILED(state, action) {
      var edit = {data: _.cloneDeep(state._temp), _temp: null}
      return Object.assign({}, state, {
        isWritting: false,
        editError: action.error
      }, edit)      
    },
    UPDATE_USER_COMPLETED(state, action) {
      return Object.assign({}, state, {
        isWritting: false,
        editError: null,
        _temp: null
      });      
    },
  }),
  test: createReducer('test', userDefaultState, {
    message(state, action) {
      return Object.assign({}, state, {
        message: action.data,
      })        
    }
  }),
  confirm: createReducer('confirm', {
    show: false,
    body: '',
    action: null
  }, {
    CLOSE_CONFIRM(state, action) {
      return Object.assign({}, state, {
        show: false,
        callback: null
      })      
    },    
    SHOW_CONFIRM(state, action) {
      return Object.assign({}, state, {
        show: true,
        body: action.body,
        callback: action.callback
      })      
    }
  }),
  alert: createReducer('alert', {
    show: false,
    body: '',
  }, {
    CLOSE_ALERT(state, action) {
      return Object.assign({}, state, {
        show: false
      })      
    },    
    SHOW_ALERT(state, action) {
      return Object.assign({}, state, {
        show: true,
        body: action.body
      })      
    }
  }),
  modal: createReducer('modal', {
    show: false,
    variant: 'primary',
    title: '',
    text: '',
    button: '',
    callback: null
  }, {
    CLOSE_MODAL(state, action) {
      return Object.assign({}, state, {
        show: false,
        callback: null
      })      
    },    
    SHOW_MODAL(state, action) {
      return Object.assign({}, state, {
        show: true,
        variant: action.variant,
        title: action.title,
        text: action.text,
        button: action.button,
        callback: action.callback
      })      
    }
  }),
  phone: createReducer('phone', {
    out: false,
    screen: 'main',
    conversation: null,
    title: "Kontakty"
  }, {
    PHONE_OUT(state, action) {
      return Object.assign({}, state, {out: action.out});      
    },       
    PHONE_SCREEN(state, action) {
      return Object.assign({}, state, {screen: action.screen});      
    },       
    PHONE_CONVERSATION(state, action) {
      return Object.assign({}, state, {conversation: action.conversation});      
    },       
    PHONE_TITLE(state, action) {
      return Object.assign({}, state, {title: action.title});      
    }, 
    PHONE_NAVIGATION(state, action) {
      return Object.assign({}, state, {
        title: action.title,
        screen: action.screen,
        conversation: action.conversation
      });      
    }, 
  }),
  ui: createReducer('ui', {
    addBarVisible: false,
    formVisible: false,
    subbarEditing: null,
    barEditing: null,
    alert: null,
    modal: null
  }, {
    TOGGLE_ADD_BAR(state, action) {
      let status = (action.status||!state.addBarVisible);
      return Object.assign({}, state, {
        addBarVisible: status
      })      
    },   
    TOGGLE_FORM(state, action) {
      let status = ((typeof(action.status) != "undefined") ? action.status : !state.formVisible);
      return Object.assign({}, state, {
        formVisible: status
      })      
    },   
    SUBBAR_EDITING(state, action) {
      return Object.assign({}, state, {
        subbarEditing: action.subbar_id
      })      
    },     
    BAR_EDITING(state, action) {
      return Object.assign({}, state, {
        barEditing: action.bar_id
      })      
    },
    OPEN_MODAL(state, action) {
      return Object.assign({}, state, {
        modal: action.modal
      })      
    },  
    HIDE_MODAL(state, action) {
      return Object.assign({}, state, {
        modal: null
      })      
    }
  })
};
