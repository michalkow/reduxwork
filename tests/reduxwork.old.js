import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testReducers from './test-reducers';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';
import reduxwork from './test-reduxwork';
import { normalize } from 'normalizr';

const mockStore = configureStore([reduxwork.middleware, thunk]);
const reducerDefaluts = {
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
};

// TEST ACTIONS

test.only('Find messages', () => {
  var store = mockStore({ messages: {}});

  return store.dispatch(findMessages())
    .then((res) => {
      var expectedActions = [
        {
          type: 'RW_FIND_MESSAGES',
          data: {},
          reduxwork: true,
          clientAction: true,
          name: 'messages',
          operation: 'find',
          transport: 'socket',
          validationScheme: void(0),
          localFields: void(0),
          virtualFields: void(0)
        },
        {
          type: 'RW_FIND_MESSAGES_COMPLETED',
          data: res,
          clientAction: true,
          reduxwork: true
        }
      ];
      var actions = store.getActions();
      expect(actions).toEqual(expect.arrayContaining(expectedActions));
    });
});

test('Find messages by id', () => {
  var data = { id: 4 };
  var store = mockStore({ messages: {}});
  var expectedActions = [
    { type: 'RW_FIND_MESSAGES', data: data }
  ];
  return store.dispatch(findMessages(data))
    .then((res) => {
      expectedActions.push({ type: 'RW_FIND_MESSAGES_COMPLETED', data: res });
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });
});

test('Create new message', () => {
  var data = { body: 'test', localOnly: 'isLocal', virtualData: 'some' };
  var store = mockStore({ messages: {}});
  var expectedActions = [
    { type: 'RW_CREATE_MESSAGES', data: data }
  ];
  return store.dispatch(createMessages(data))
    .then((res) => {
      expectedActions.push({ type: 'RW_CREATE_MESSAGES_COMPLETED', data: res });
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });
});

test('Update new message', () => {
  var data = { id: 2, body: 'test2' };
  var store = mockStore({ messages: {}});
  var expectedActions = [
    { type: 'RW_UPDATE_MESSAGES', data: data }
  ];
  return store.dispatch(updateMessages(data))
    .then((res) => {
      expectedActions.push({ type: 'RW_UPDATE_MESSAGES_COMPLETED', data: res });
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });
});

test('Update new message rewrite', () => {
  var data = { id: 2, body: 'test2', _rewrite: true };
  var store = mockStore({ messages: {}});
  var expectedActions = [
    { type: 'RW_UPDATE_MESSAGES', data: data }
  ];
  return store.dispatch(updateMessages(data))
    .then((res) => {
      expectedActions.push({ type: 'RW_UPDATE_MESSAGES_COMPLETED', data: res, _rewrite: true });
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });
});

test('Destroy new message', () => {
  var data = { id: 1 };
  var store = mockStore({ messages: {}});
  var expectedActions = [
    { type: 'RW_DESTROY_MESSAGES', data: data }
  ];
  return store.dispatch(destroyMessages(data))
    .then((res) => {
      expectedActions.push({ type: 'RW_DESTROY_MESSAGES_COMPLETED', data: res });
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });
});

// TEST REDUCERS

test('Create reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts), {
      type: 'CREATE_MESSAGES',
      data: { body: 'test', localOnly: 'isLocal', virtualServer: 'isVirtual' }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: true,
      items: [{ body: 'test', only: 'isLocal', _temp: true }]
    })
  );
});

test('Create complete reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      items: []
    }), {
      type: 'CREATE_MESSAGES_COMPLETED',
      data: { body: 'test', id: 1 }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      items: [{ body: 'test', id: 1 }]
    })
  );
});

test('Create failed reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      items: []
    }), {
      type: 'CREATE_MESSAGES_FAILED',
      error: 'failed'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      writeError: 'failed',
      items: []
    })
  );
});

test('Destroy reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test', id: 1 }, { body: 'test2', id: 2 }, { body: 'test3', id: 3 }]
    }), {
      type: 'DESTROY_MESSAGES',
      data: { id: 1 }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: true,
      destroyedItem: { body: 'test', id: 1 },
      destroyedItemIndex: 0,
      items: [{ body: 'test2', id: 2 }, { body: 'test3', id: 3 }]
    })
  );
});

test('Destroy complete reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      destroyError: null,
      destroyedItem: { body: 'test', id: 1 },
      destroyedItemIndex: 0,
      items: [{ body: 'test2', id: 2 }, { body: 'test3', id: 3 }]
    }), {
      type: 'DESTROY_MESSAGES_COMPLETED',
      data: true
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      destroyError: null,
      destroyedItem: null,
      destroyedItemIndex: null,
      items: [{ body: 'test2', id: 2 }, { body: 'test3', id: 3 }]
    })
  );
});

test('Destroy failed reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      destroyError: null,
      destroyedItem: { body: 'test', id: 1 },
      destroyedItemIndex: 0,
      items: [{ body: 'test2', id: 2 }, { body: 'test3', id: 3 }]
    }), {
      type: 'DESTROY_MESSAGES_FAILED',
      error: 'failed'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      destroyError: 'failed',
      destroyedItem: null,
      destroyedItemIndex: null,
      items: [{ body: 'test', id: 1 }, { body: 'test2', id: 2 }, { body: 'test3', id: 3 }]
    })
  );
});

test('Update reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test', id: 1 }]
    }), {
      type: 'UPDATE_MESSAGES',
      data: { id: 1, body: 'tested', localOnly: 'isLocal', virtualServer: 'isVirtual', test: true }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: true,
      items: [{ id: 1, body: 'tested', test: true, only: 'isLocal' }],
      updatedItem: { body: 'test', id: 1 }
    })
  );
});

test('Update complete reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      updatedItem: { body: 'test', id: 1 },
      items: [{ id: 1, body: 'tested', test: true }]
    }), {
      type: 'UPDATE_MESSAGES_COMPLETED',
      data: { id: 1, body: 'tested', test: true }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      updateError: null,
      updatedItem: null,
      items: [{ id: 1, body: 'tested', test: true }]
    })
  );
});

test('Update complete reducer rewrite', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      updatedItem: { body: 'test', id: 1 },
      items: [{ body: 'test2', id: 1 }]
    }), {
      type: 'UPDATE_MESSAGES_COMPLETED',
      data: { id: 1, body: 'tested', test: true },
      _rewrite: true
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      updateError: null,
      updatedItem: null,
      items: [{ id: 1, body: 'tested', test: true }]
    })
  );
});

test('Update failed reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isWriting: true,
      updatedItem: { body: 'test', id: 1 }
    }), {
      type: 'UPDATE_MESSAGES_FAILED',
      error: 'failed'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isWriting: false,
      updateError: 'failed',
      updatedItem: null,
      items: [{ body: 'test', id: 1 }]
    })
  );
});

test('Find reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test', id: 1 }],
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
  );
});

test('Find complete reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isFinding: true
    }), {
      type: 'FIND_MESSAGES_COMPLETED',
      data: [{ body: 'test', id: 1 }, { body: 'test2', id: 2 }]
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isFinding: false,
      init: true,
      items: [{ body: 'test', id: 1 }, { body: 'test2', id: 2 }]
    })
  );
});

test('Find failed reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isFinding: true
    }), {
      type: 'FIND_MESSAGES_FAILED',
      error: 'failed'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isFinding: false,
      findError: 'failed',
      items: []
    })
  );
});

test('Sync reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test', id: 1 }]
    }), {
      type: 'SYNC_MESSAGES',
      data: {}
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isSyncing: true,
      syncError: null,
      items: [{ body: 'test', id: 1 }]
    })
  );
});

test('Sync complete reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isSyncing: true,
      items: [{ body: 'test', id: 1 }]
    }), {
      type: 'SYNC_MESSAGES_COMPLETED',
      data: [{ body: 'test1', id: 1 }, { body: 'test2', id: 2 }]
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isSyncing: false,
      init: true,
      items: [{ body: 'test1', id: 1 }, { body: 'test2', id: 2 }]
    })
  );
});

test('Sync failed reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      isSyncing: true,
      items: [{ body: 'test', id: 1 }]
    }), {
      type: 'SYNC_MESSAGES_FAILED',
      error: 'failed'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      isSyncing: false,
      syncError: 'failed',
      items: [{ body: 'test', id: 1 }]
    })
  );
});

test('Clear reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test1', id: 1 }, { body: 'test2', id: 2 }]
    }), {
      type: 'CLEAR_MESSAGES'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      items: []
    })
  );
});

test('Reset reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test1', id: 1 }, { body: 'test2', id: 2 }],
      isSyncing: true,
      syncError: 'failed'
    }), {
      type: 'RESET_MESSAGES'
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts)
  );
});

test('Select reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test1', id: 1 }, { body: 'test2', id: 2 }]
    }), {
      type: 'SELECT_MESSAGES',
      data: { body: 'test1', id: 1 }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      items: [{ body: 'test1', id: 1 }, { body: 'test2', id: 2 }],
      selected: { body: 'test1', id: 1 }
    })
  );
});

test('Receive reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ mark: 'mark1', body: 'test1', id: 1 }, { mark: 'mark2', body: 'test2', id: 2 }],
      selected: { mark: 'mark1', body: 'test1', id: 1 }
    }), {
      type: 'RECEIVE_MESSAGES',
      data: { body: 'test3', id: 1 }
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      items: [{ mark: 'mark1', body: 'test3', id: 1 }, { mark: 'mark2', body: 'test2', id: 2 }],
      selected: { mark: 'mark1', body: 'test3', id: 1 }
    })
  );
});

test('Remove reducer', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ mark: 'mark1', body: 'test1', id: 1 }, { mark: 'mark2', body: 'test2', id: 2 }, { mark: 'mark3', body: 'test3', id: 3 }],
      selected: { mark: 'mark2', body: 'test2', id: 2 }
    }), {
      type: 'REMOVE_MESSAGES',
      data: [{ id: 3 }, { id: 2 }]
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      items: [{ mark: 'mark1', body: 'test1', id: 1 }],
      selected: {}
    })
  );
});

test('Remove reducer single', () => {
  expect(
    testReducers.messages(Object.assign({}, reducerDefaluts, {
      items: [{ mark: 'mark1', body: 'test1', id: 1 }, { mark: 'mark2', body: 'test2', id: 2 }, { mark: 'mark3', body: 'test3', id: 3 }],
      selected: { mark: 'mark2', body: 'test2', id: 2 }
    }), {
      type: 'REMOVE_MESSAGES',
      data: [{ id: 3 }]
    })
  ).toEqual(
    Object.assign({}, reducerDefaluts, {
      items: [{ mark: 'mark1', body: 'test1', id: 1 }, { mark: 'mark2', body: 'test2', id: 2 }],
      selected: { mark: 'mark2', body: 'test2', id: 2 }
    })
  );
});