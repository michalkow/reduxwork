/* eslint new-cap:0 */

import testReducers from './test-reducers';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';

const initState = {
  messages: {},
  users: {},
  actionCache: {},
  entitieStatus: {},
  actionErrors: {},
  lastAction: null
};

test('Find reducer', () => {
  const action = findMessages();
  const updatedState = testReducers.messages['FIND_MESSAGES'](
    initState,
    action
  );
  const expectedState = {
    messages: { },
    users: {},
    actionCache: { },
    entitieStatus: { messages: { isFinding: true }},
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Find reducer completed', () => {
  const action = findMessages();
  const updatedState = testReducers.messages['FIND_MESSAGES_COMPLETED'](
    initState,
    {
      uuid: action.uuid,
      payload: [
        {
          body: 'text',
          id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
          author: { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }
        }
      ]
    }
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }},
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {},
    entitieStatus: {
      messages: { isFinding: false, init: true },
      users: { isFinding: false, init: true }
    },
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Find reducer failed', () => {
  const action = findMessages();
  const updatedState = testReducers.messages['FIND_MESSAGES_FAILED'](
    initState,
    { uuid: action.uuid, error: 'Test Fail error' }
  );
  const expectedState = {
    messages: {},
    users: {},
    actionCache: {},
    entitieStatus: { messages: { isFinding: false }},
    actionErrors: { [action.uuid]: 'Test Fail error' },
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Create reducer', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const expectedState = {
    messages: { [action.payload[0].id]: { id: action.payload[0].id, body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328', _temp: true }},
    users: {},
    actionCache: { [action.uuid]: { messages: { [action.payload[0].id]: { id: action.payload[0].id, body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' }}}},
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Create reducer failed', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const updatedStateFailed = testReducers.messages['CREATE_MESSAGES_FAILED'](
    updatedState,
    { uuid: action.uuid, error: 'Test Fail error' }
  );
  const expectedState = {
    messages: {},
    users: {},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: 'Test Fail error' },
    lastAction: action.uuid
  };
  expect(updatedStateFailed).toEqual(expectedState);
});

test('Create reducer success', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const updatedStateCompleted = testReducers.messages['CREATE_MESSAGES_COMPLETED'](
    updatedState,
    { uuid: action.uuid }
  );
  const expectedState = {
    messages: { [action.payload[0].id]: action.payload[0] },
    users: {},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedStateCompleted).toEqual(expectedState);
});

test('Update reducer', () => {
  const state = Object.assign({}, initState, {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        body: 'text2',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }}
  });
  const action = updateMessages([{ id: '8e8ba283-5d70-44fc-b91c-a8d94c937329', body: 'test' }]);
  const updatedState = testReducers.messages['UPDATE_MESSAGES'](
    state,
    action
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        _temp: true,
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {
      [action.uuid]: {
        messages: {
          '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
            body: 'text2',
            id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
            author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
          }
        }
      }
    },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Update reducer failed', () => {
  const { uuid } = updateMessages([]);
  const state = Object.assign({}, initState, {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        _temp: true,
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {
      [uuid]: {
        messages: {
          '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
            body: 'text2',
            id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
            author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
          }
        }
      }
    },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: uuid
  });
  const updatedState = testReducers.messages['UPDATE_MESSAGES_FAILED'](
    state,
    { uuid, error: 'failed update' }
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        body: 'text2',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [uuid]: 'failed update' },
    lastAction: uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Update reducer completed', () => {
  const { uuid } = updateMessages([]);
  const state = Object.assign({}, initState, {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        _temp: true,
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {
      [uuid]: {
        messages: {
          '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
            body: 'text2',
            id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
            author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
          }
        }
      }
    },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: uuid
  });
  const updatedState = testReducers.messages['UPDATE_MESSAGES_COMPLETED'](
    state,
    {
      uuid, payload: [{
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack2' }
      }] }
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack2' }},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }, users: { isWriting: false }},
    actionErrors: { },
    lastAction: uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Destroy reducer', () => {
  const action = destroyMessages([{ id: '8e8ba283-5d70-44fc-b91c-a8d94c937329' }]);
  const state = Object.assign({}, initState, {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {},
    entitieStatus: { },
    actionErrors: {},
    lastAction: action.uuid
  });
  const updatedState = testReducers.messages['DESTROY_MESSAGES'](
    state,
    action
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {
      [action.uuid]: {
        messages: {
          '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
            body: 'test',
            id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
            author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
          }
        }
      }
    },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Destroy reducer failed', () => {
  const { uuid } = destroyMessages([]);
  const state = Object.assign({}, initState, {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {
      [uuid]: {
        messages: {
          '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
            body: 'test',
            id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
            author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
          }
        }
      }
    },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: uuid
  });
  const updatedState = testReducers.messages['DESTROY_MESSAGES_FAILED'](
    state,
    { uuid, error: 'failed destroy' }
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      },
      '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
        body: 'test',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [uuid]: 'failed destroy' },
    lastAction: uuid
  };
  expect(updatedState).toEqual(expectedState);
});

test('Destroy reducer completed', () => {
  const { uuid } = destroyMessages([]);
  const state = Object.assign({}, initState, {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {
      [uuid]: {
        messages: {
          '8e8ba283-5d70-44fc-b91c-a8d94c937329': {
            body: 'test',
            id: '8e8ba283-5d70-44fc-b91c-a8d94c937329',
            author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
          }
        }
      }
    },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: uuid
  });
  const updatedState = testReducers.messages['DESTROY_MESSAGES_COMPLETED'](
    state,
    { uuid }
  );
  const expectedState = {
    messages: {
      '8e8ba283-5d70-44fc-b91c-a8d94c937328': {
        body: 'text',
        id: '8e8ba283-5d70-44fc-b91c-a8d94c937328',
        author: '8e8ba283-5d70-44fc-b91c-a8d94c937323'
      }
    },
    users: { '8e8ba283-5d70-44fc-b91c-a8d94c937323': { id: '8e8ba283-5d70-44fc-b91c-a8d94c937323', name: 'Jack' }},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { },
    lastAction: uuid
  };
  expect(updatedState).toEqual(expectedState);
});