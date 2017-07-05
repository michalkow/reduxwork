# Reduxwork

[![Build Status](https://travis-ci.org/michalkow/reduxwork.svg?branch=master)](https://travis-ci.org/michalkow/reduxwork)

A small [Redux](http://redux.js.org) framework for creating actions and reducers that work with AJAX or WebSocket functions and create real-time apps. 

## Install

Install from npm:

```bash
npm install reduxwork 
```

Or install from bower:

```bash
bower install reduxwork
```
You need to have redux and redux-thunk 

## Usage

### Actions and reducer configuration options

```javascript
const config = {
  keyName: '_id', // Name of identificator key in your database. Default: 'id'
  addKeyOnCreate: true, // Reducers only. When creating a temporary item (before socket/fetch) random indentificator will be added. Default: false
  eventName: "redux_action_event", // Actions only. Name of event that will be send by socket.io. Default: "redux_action_event"
  socketIoFunction: function(action, data, cb) { 
  	return socket.emit(action, data, cb) 
  }, // Actions only. Socket funtion to use for transport. Default: null
  fetchFunction: function(url, options) { 
  	return fetch(url, options)
  } // Actions only. Ajax funtion to use for transport. Default: null
}
```

### Reducer creators

```javascript
export default {
	// Standard creator
  messages: createIoReducers(config, 'messages'),
  // Creator with added state and actions to handle
  users: createLocalReducers(config, 'users', {
  	online: []
  }, {
   	WENT_ONLINE(state, action) {
      return Object.assign({}, state, {
      	online: [...state.online, action.data]
      })        
    },   
   	WENT_OFFLINE(state, action) {
      return Object.assign({}, state, {
      	online: _.reject([...state.online], action.data)
      })        
    }
  }),
  // Custom reducer
  modal: createReducer(config, 'modal', {
  	show: false
  }, {
   	TOGGLE_MODAL(state, action) {
      return Object.assign({}, state, {
      	show: action.data
      })        
    }
  })
}
```

### Action creators

```javascript
export var {
  findMessages,
  createMessages,
  updateMessages,
  destroyMessages,
  clearMessages,
  selectMessages,
  syncMessages,
  receiveMessages,
  resetMessages
} = createSocketActions(config, 'Messages');

export var {
  findUsers,
  createUsers,
  updateUsers,
  destroyUsers,
  clearUsers,
  selectUsers,
  syncUsers,
  receiveUsers,
  resetUsers
} = createSocketActions(config, 'Users');

export var wentOffline = createSocketAction(config, 'WENT_OFFLINE');
export var wentOnline = createSocketAction(config, 'WENT_ONLINE');

export var toggleModal = createAction(config, 'TOGGLE_MODAL', 'data');

```

### Importing and dispatching io actions with Redux

```javascript
import reducers from './reducers.js';
import { 
	findMessages, 
	createMessages, 
	updateMessages, 
	destroyMessages, 
	clearMessages, 
	selectMessages, 
	syncMessages, 
	receiveMessages, 
	resetMessages 
} from './actions.js';

var store = createStore(
	combineReducers(Object.assign({}, reducers)), 
	applyMiddleware(thunk)
);

store.dispatch(createMessages({body: "test message"}))
.then((res) => {
	console.log("message sent")
}, (err) => {
	console.log(err)
});

// OR 

store.dispatch(createMessages({body: "test message"}, (err, res) => {
	if(!err) console.log("message sent")
	else console.log(err)
}));
```

## Framework

I created this libary while working on my own projects. It has been really useful, so I thought others might like it as well. It was created to fit me and my own style. Did my best to turn it into an open-source project that accounts for a broad range of usecases. If you have any feedback on style, naming or other things, please let me know or submit a pull request. Thanks! 

## License

Reduxwork is released under [MIT license](http://opensource.org/licenses/mit-license.php).

## Credits

Reduxwork was created by [Michał Kowalkowski](https://github.com/michalkow). You can contact me at [kowalkowski.michal@gmail.com](mailto:kowalkowski.michal@gmail.com)
