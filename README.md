# Reduxwork

[![Build Status](https://travis-ci.org/michalkow/reduxwork.svg?branch=master)](https://travis-ci.org/michalkow/reduxwork)

A small [Redux](http://redux.js.org) framework for creating actions and reducers that work with AJAX or WebSocket functions and create real-time apps. 

For the previous version and installation, instructions, pleas check the [https://github.com/michalkow/reduxwork/tree/v1](v1 branch). 

## Install

Install from npm:

```bash
npm install reduxwork 
```

You need to have redux and redux-offline

## Usage

### Actions and reducer configuration options and defaults

```javascript
const reduxwork = new Reduxwork({
  keyName: 'id',// Name of identificator key in your database.
  addKeyOnCreate: false, // Reducers only. When creating a temporary item (before socket/fetch) random indentificator will be added.
  rewriteOnUpdate: true,
  socketEventName: 'redux_action_event', // Actions only. Name of event that will be send by socket.io.
  socket: null, // Actions only. Socket funtion to use for transport.
  transport: 'fetch',
  virtualFieldsName: 'virtualFields',
  localFieldsName: 'localFields',
  uuidOptions: {},
  uuidVersion: 'v4',
  actionInject: (action) => action,
  validationHook: null,
  createKey: null,
  schemas: {}
});
```

### Use with redux and redux-offline

```javascript
import { applyMiddleware, createStore, compose } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reduxwork from './reduxwork';
import reducers from './reducers';

const offlineOptions = Object.assign({}, offlineConfig, reduxwork.createOfflineOptions());

const { middleware, enhanceReducer, enhanceStore } = createOffline(offlineOptions);

const store = createStore(
  enhanceReducer(reduxwork.createRootReducer([reducers])),
  reduxwork.createInitialState(),
  compose(enhanceStore, applyMiddleware(middleware))
);
```

### Reducer creators

```javascript
import reduxwork from './reduxwork';

export default {
	// Standard creator
  messages: reduxwork.createIoReducers('messages'),
  // Creator with added state and actions to handle
  users: reduxwork.createIoReducers('users', {
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
  })
}
```

### Action creators

```javascript
import reduxwork from './reduxwork';

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
} = reduxwork.createIoActions('Messages');

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
} = reduxwork.createIoActions('Users');

export var wentOffline = reduxwork.createPostAction('WENT_OFFLINE');
export var wentOnline = reduxwork.createPostAction('WENT_ONLINE');
```

## Framework

I created this libary while working on my own projects. It has been really useful, so I thought others might like it as well. It was created to fit me and my own style. Did my best to turn it into an open-source project that accounts for a broad range of usecases. If you have any feedback on style, naming or other things, please let me know or submit a pull request. Thanks! 

## License

Reduxwork is released under [MIT license](http://opensource.org/licenses/mit-license.php).

## Credits

Reduxwork was created by [Michał Kowalkowski](https://github.com/michalkow). You can contact me at [kowalkowski.michal@gmail.com](mailto:kowalkowski.michal@gmail.com)
