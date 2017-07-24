import { createStore, combineReducers, applyMiddleware } from 'redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import testReducers from './test-reducers';
import { findMessages, createMessages, updateMessages, destroyMessages, clearMessages, selectMessages, syncMessages, receiveMessages, resetMessages } from './test-actions';

const loggerMiddleware = createLogger();
const mockStore = configureStore([thunk]);
/*
var store = createStore(
	combineReducers(Object.assign({}, testReducers)), 
	applyMiddleware(thunk)
);
*/
const dataset = require('./test-data.js');
const reducerDefaluts = {
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
};


// TEST ACTIONS

test('Find messages', () => {
	var store = mockStore({ messages: {} });
  var expectedActions = [
    { type: 'FIND_MESSAGES' }
  ];
	return store.dispatch(findMessages())
	.then((res) => {
		expectedActions.push({ type: 'FIND_MESSAGES_COMPLETED', data: res})
		expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
	});
});

test('Find messages by id', () => {
  var data = {id: 4};
  var store = mockStore({ messages: {} });
  var expectedActions = [
    { type: 'FIND_MESSAGES', data: data}
  ];
  return store.dispatch(findMessages(data))
  .then((res) => {
    console.log(res)
    expectedActions.push({ type: 'FIND_MESSAGES_COMPLETED', data: res})
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  });
});

test('Create new message', () => {
	var data = {"body": "test"};
	var store = mockStore({ messages: {} });
  var expectedActions = [
    { type: 'CREATE_MESSAGES', data: data }
  ];
	return store.dispatch(createMessages(data))
	.then((res) => {
		expectedActions.push({ type: 'CREATE_MESSAGES_COMPLETED', data: res})
		expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
	});
});

test('Update new message', () => {
	var data = {id: 2, "body": "test2"};
	var store = mockStore({ messages: {} });
  var expectedActions = [
    { type: 'UPDATE_MESSAGES', data: data }
  ];
	return store.dispatch(updateMessages(data))
	.then((res) => {
		expectedActions.push({ type: 'UPDATE_MESSAGES_COMPLETED', data: res})
		expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
	});
});

test('Update new message rewrite', () => {
  var data = {id: 2, "body": "test2", _rewrite: true};
  var store = mockStore({ messages: {} });
  var expectedActions = [
    { type: 'UPDATE_MESSAGES', data: data }
  ];
  return store.dispatch(updateMessages(data))
  .then((res) => {
    expectedActions.push({ type: 'UPDATE_MESSAGES_COMPLETED', data: res, _rewrite: true})
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  });
});


test('Destroy new message', () => {
	var data = {id: 1};
	var store = mockStore({ messages: {} });
  var expectedActions = [
    { type: 'DESTROY_MESSAGES', data: data }
  ];
	return store.dispatch(destroyMessages(data))
	.then((res) => {
		expectedActions.push({ type: 'DESTROY_MESSAGES_COMPLETED', data: res})
		expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
	});
});



// TEST REDUCERS

test('Create reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts), {
      type: 'CREATE_MESSAGES',
      data: {"body": "test"}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
	    isWritting: true,
	    items: [{"body": "test", _temp: true}]
	  })
  )
});

test('Create complete reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isWritting: true, 
	    	items: []
    	}), {
      type: 'CREATE_MESSAGES_COMPLETED',
      data: {"body": "test", id: 1}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isWritting: false, 
	    items: [{"body": "test", id: 1}]
	  })
  )
});

test('Create failed reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isWritting: true, 
	    	items: []
    	}), {
      type: 'CREATE_MESSAGES_FAILED',
      error: "failed"
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isWritting: false, 
    	writeError: "failed",
	    items: []
	  })
  )
});


test('Destroy reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test", id: 1}, {"body": "test2", id: 2}, {"body": "test3", id: 3}]
    }), {
      type: 'DESTROY_MESSAGES',
      data: {id: 1}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isWritting: true,
	    destroyedItem: {"body": "test", id: 1},
	    destroyedItemIndex: 0,
	    items: [{"body": "test2", id: 2}, {"body": "test3", id: 3}]
	  })
  )
});

test('Destroy complete reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	      isWritting: true,
	      destroyError: null,
	      destroyedItem: {"body": "test", id: 1},
	      destroyedItemIndex: 0,
        items: [{"body": "test2", id: 2}, {"body": "test3", id: 3}]
    	}), {
      type: 'DESTROY_MESSAGES_COMPLETED',
      data: true
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWritting: false,
      destroyError: null,
      destroyedItem: null,
      destroyedItemIndex: null,
      items: [{"body": "test2", id: 2}, {"body": "test3", id: 3}]
	  })
  )
});

test('Destroy failed reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isWritting: true, 
	    	destroyError: null,
	      destroyedItem: {"body": "test", id: 1},
	      destroyedItemIndex: 0,
        items: [{"body": "test2", id: 2}, {"body": "test3", id: 3}]
    	}), {
      type: 'DESTROY_MESSAGES_FAILED',
      error: "failed"
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWritting: false,
      destroyError: "failed",
      destroyedItem: null,
      destroyedItemIndex: null,
      items: [{"body": "test", id: 1}, {"body": "test2", id: 2}, {"body": "test3", id: 3}]
	  })
  )
});

test('Update reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test", id: 1}]
    }), {
      type: 'UPDATE_MESSAGES',
      data: {id: 1, body: "tested", test: true}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isWritting: true,
	    items: [{id: 1, body: "tested", test: true}],
	    updatedItem: {"body": "test", id: 1}
	  })
  )
});

test('Update complete reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	      isWritting: true,
	      updatedItem: {"body": "test", id: 1},
	      items: [{id: 1, body: "tested", test: true}],
    	}), {
      type: 'UPDATE_MESSAGES_COMPLETED',
      data: {id: 1, body: "tested", test: true}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWritting: false,
      updateError: null,
      updatedItem: null,
      items: [{id: 1, body: "tested", test: true}],
	  })
  )
});

test('Update complete reducer rewrite', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	      isWritting: true,
	      updatedItem: {"body": "test", id: 1},
	      items: [{"body": "test2", id: 1}],
    	}), {
      type: 'UPDATE_MESSAGES_COMPLETED',
      data: {id: 1, body: "tested", test: true},
      _rewrite: true
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWritting: false,
      updateError: null,
      updatedItem: null,
      items: [{id: 1, body: "tested", test: true}],
	  })
  )
});

test('Update failed reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	      isWritting: true,
	      updatedItem: {"body": "test", id: 1}
    	}), {
      type: 'UPDATE_MESSAGES_FAILED',
      error: "failed"
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWritting: false,
      updateError: "failed",
      updatedItem: null,
      items: [{"body": "test", id: 1}]
	  })
  )
});

test('Find reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test", id: 1}],
    	query: '2'
    }), {
      type: 'FIND_MESSAGES',
      data: {}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isFinding: true,
      findError: null,
      items: []
	  })
  )
});

test('Find complete reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isFinding: true,
    	}), {
      type: 'FIND_MESSAGES_COMPLETED',
      data: [{"body": "test", id: 1}, {"body": "test2", id: 2}]
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isFinding: false, 
    	init: true,
	    items: [{"body": "test", id: 1}, {"body": "test2", id: 2}]
	  })
  )
});

test('Find failed reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isFinding: true, 
    	}), {
      type: 'FIND_MESSAGES_FAILED',
      error: "failed"
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isFinding: false, 
    	findError: "failed",
	    items: []
	  })
  )
});

test('Sync reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test", id: 1}],
    }), {
      type: 'SYNC_MESSAGES',
      data: {}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isSyncing: true,
      syncError: null,
      items: [{"body": "test", id: 1}]
	  })
  )
});

test('Sync complete reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isSyncing: true,
	    	items: [{"body": "test", id: 1}]
    	}), {
      type: 'SYNC_MESSAGES_COMPLETED',
      data: [{"body": "test1", id: 1}, {"body": "test2", id: 2}]
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isSyncing: false, 
    	init: true,
	    items: [{"body": "test1", id: 1}, {"body": "test2", id: 2}]
	  })
  )
});

test('Sync failed reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
	    	isSyncing: true, 
	    	items: [{"body": "test", id: 1}]
    	}), {
      type: 'SYNC_MESSAGES_FAILED',
      error: "failed"
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	isSyncing: false, 
    	syncError: "failed",
	    items: [{"body": "test", id: 1}]
	  })
  )
});

test('Clear reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test1", id: 1}, {"body": "test2", id: 2}]
    }), {
      type: 'CLEAR_MESSAGES'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      items: []
	  })
  )
});


test('Reset reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test1", id: 1}, {"body": "test2", id: 2}],
    	isSyncing: true, 
    	syncError: "failed",
    }), {
      type: 'RESET_MESSAGES'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts)
  )
});

test('Select reducer', () => {
 expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test1", id: 1}, {"body": "test2", id: 2}],
    }), {
      type: 'SELECT_MESSAGES',
      data: {"body": "test1", id: 1}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
    	items: [{"body": "test1", id: 1}, {"body": "test2", id: 2}],
      selected: {"body": "test1", id: 1}
	  })
  )
});
