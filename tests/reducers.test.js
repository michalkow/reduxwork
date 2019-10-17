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

const state = {
  messages: {},
  users: {},
  actionCache: {},
  entitieStatus: {},
  actionErrors: {},
  lastAction: null
};

const setState = updatedState => Object.assign(state, updatedState);
const resetState = () => Object.assign(state, initState);

test('Create reducer', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const { lastAction } = updatedState;
  const expectedState = {
    messages: { [action.payload[0].uuid]: action.payload[0] },
    users: {},
    actionCache: { [lastAction]: { messages: { [action.payload[0].uuid]: action.payload[0] }} },
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: lastAction
  };
  setState(updatedState);
  expect(updatedState).toEqual(expectedState);
});

test('Create reducer failed', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const { lastAction } = updatedState;
  const updatedStateFailed = testReducers.messages['CREATE_MESSAGES_FAILED'](
    updatedState,
    { uuid: lastAction, error: 'Test Fail error' }
  );
  const expectedState = {
    messages: {},
    users: {},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [lastAction]: 'Test Fail error' },
    lastAction: lastAction
  };
  setState(updatedState);
  expect(updatedStateFailed).toEqual(expectedState);
});

test('Create reducer success', () => {
  const action = createMessages({ body: 'text', author: '8e8ba283-5d70-44fc-b91c-a8d94c937328' });
  const updatedState = testReducers.messages['CREATE_MESSAGES'](
    initState,
    action
  );
  const { lastAction } = updatedState;
  const updatedStateCompleted = testReducers.messages['CREATE_MESSAGES_COMPLETED'](
    updatedState,
    { uuid: lastAction, error: 'Test Fail error' }
  );
  const expectedState = {
    messages: { [action.payload[0].uuid]: action.payload[0] },
    users: {},
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: lastAction
  };
  setState(updatedState);
  expect(updatedStateCompleted).toEqual(expectedState);
});