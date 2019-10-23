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

test('Create reducer', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const expectedState = {
    messages: { [action.payload[0].id]: action.payload[0] },
    users: {},
    actionCache: { [action.uuid]: { messages: { [action.payload[0].id]: action.payload[0] }} },
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
  const preAction = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const preState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    preAction
  );
  const preStateCompleted = testReducers.messages['CREATE_MESSAGES_COMPLETED'](
    preState,
    { uuid: preAction.uuid }
  );
  const action = updateMessages({ id: preAction.payload[0].id, body: 'text2' });
  const updatedState = testReducers.messages['UPDATE_MESSAGES'](
    preStateCompleted,
    action
  );
  const expectedState = {
    messages: { [preAction.payload[0].id]: Object.assign({}, preAction.payload[0], { body: 'text2' }) },
    users: {},
    actionCache: { [action.uuid]: { messages: { [preAction.payload[0].id]: preAction.payload[0] } } },
    entitieStatus: { messages: { isWriting: true } },
    actionErrors: {},
    lastAction: action.uuid
  };
  expect(updatedState).toEqual(expectedState);
});