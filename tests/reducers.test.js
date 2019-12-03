/* eslint new-cap:0 */

import testReducers from './test-reducers';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';
import { getMessegesByIndexes } from './test-data';
import {
  createInitialState,
  createFindState,
  createFindFailedState,
  createFindCompletedState,
  createCreateState,
  createCreateFailedState,
  createCreateCompletedState,
  createUpdateState,
  createUpdateFailedState,
  createUpdateCompletedState,
  createDestroyState,
  createDestroyFailedState,
  createDestroyCompletedState
} from './test-state';

const initState = {
  messages: {},
  users: {},
  actionCache: {},
  entitiesStatus: {},
  actionErrors: {},
  lastAction: null
};

test('Find reducer', () => {
  const state = createInitialState();
  const action = findMessages();
  const updatedState = testReducers.messages['FIND_MESSAGES'](state, action);
  const expectedState = createFindState(state, action);
  expect(updatedState).toEqual(expectedState);
});

test('Find reducer completed', () => {
  const initialState = createInitialState();
  const initialAction = findMessages();
  const state = createFindState(initialState, initialAction);
  const action = { uuid: initialAction.uuid, payload: getMessegesByIndexes('payload', [2, 3]) };
  const updatedState = testReducers.messages['FIND_MESSAGES_COMPLETED'](state, action);
  const expectedState = createFindCompletedState(state, action, [[2, 3]], [2, 3]);
  expect(updatedState).toEqual(expectedState);
});

test('Find reducer failed', () => {
  const initialState = createInitialState();
  const initialAction = findMessages();
  const state = createFindState(initialState, initialAction);
  const action = { uuid: initialAction.uuid, error: 'failed find' };
  const updatedState = testReducers.messages['FIND_MESSAGES_FAILED'](state, action);
  const expectedState = createFindFailedState(state, action);
  expect(updatedState).toEqual(expectedState);
});

test('Create reducer', () => {
  const state = createInitialState({}, {}, [[0, 4]], [0, 4]);
  const action = createMessages(getMessegesByIndexes('data', [3, 2]));
  const updatedState = testReducers.messages['CREATE_MESSAGES'](state, action);
  const expectedState = createCreateState(state, action, [[0, 2, 3, 4], [3, 2]], [0, 4], { messages: [3, 2] });
  expect(updatedState).toEqual(expectedState);
});

test('Create reducer failed', () => {
  const initialState = createInitialState({}, {}, [[0, 4]], [0, 4]);
  const initialAction = createMessages(getMessegesByIndexes('data', [3, 2]));
  const state = createCreateState(initialState, initialAction, [[0, 2, 3, 4], [3, 2]], [0, 4], { messages: [3, 2] });
  const action = { uuid: initialAction.uuid, error: 'failed create' };
  const updatedState = testReducers.messages['CREATE_MESSAGES_FAILED'](state, action);
  const expectedState = createCreateFailedState(state, action, [[0, 4]], [0, 4]);
  expect(updatedState).toEqual(expectedState);
});

test('Create reducer success', () => {
  const initialState = createInitialState({}, {}, [[0, 4]], [0, 4]);
  const initialAction = createMessages(getMessegesByIndexes('data', [3, 2]));
  const state = createCreateState(initialState, initialAction, [[0, 2, 3, 4], [3, 2]], [0, 4], { messages: [3, 2] });
  const action = { uuid: initialAction.uuid, payload: getMessegesByIndexes('payload', [3, 2]) };
  const updatedState = testReducers.messages['CREATE_MESSAGES_COMPLETED'](state, action);
  const expectedState = createCreateCompletedState(state, action, [[0, 2, 3, 4]], [0, 2, 3, 4]);
  expect(updatedState).toEqual(expectedState);
});

test('Destroy reducer', () => {
  const state = createInitialState({}, {}, [[0, 2, 4]], [0, 2, 4]);
  const action = destroyMessages(getMessegesByIndexes('data', [0, 2]));
  const updatedState = testReducers.messages['DESTROY_MESSAGES'](state, action);
  const expectedState = createDestroyState(state, action, [[4]], [0, 2, 4], { messages: [0, 2] });
  expect(updatedState).toEqual(expectedState);
});

test('Destroy reducer failed', () => {
  const initialState = createInitialState({}, {}, [[0, 2, 4]], [0, 2, 4]);
  const initialAction = destroyMessages(getMessegesByIndexes('data', [0, 2]));
  const state = createDestroyState(initialState, initialAction, [[4]], [0, 2, 4], { messages: [0, 2] });
  const action = { uuid: initialAction.uuid, error: 'failed destroy' };
  const updatedState = testReducers.messages['DESTROY_MESSAGES_FAILED'](state, action);
  const expectedState = createDestroyFailedState(state, action, [[0, 2, 4]], [0, 2, 4]);
  expect(updatedState).toEqual(expectedState);
});

test('Destroy reducer success', () => {
  const initialState = createInitialState({}, {}, [[0, 2, 4]], [0, 2, 4]);
  const initialAction = destroyMessages(getMessegesByIndexes('data', [0, 2]));
  const state = createDestroyState(initialState, initialAction, [[4]], [0, 2, 4], { messages: [0, 2] });
  const action = { uuid: initialAction.uuid };
  const updatedState = testReducers.messages['DESTROY_MESSAGES_COMPLETED'](state, action);
  const expectedState = createDestroyCompletedState(state, action, [[4]], [0, 2, 4]);
  expect(updatedState).toEqual(expectedState);
});

test('Update reducer', () => {
  const state = createInitialState({}, {}, [[0, 1, 2, 4]], [0, 1, 2, 4]);
  const action = updateMessages(getMessegesByIndexes('data', [], [], [1, 2]));
  const updatedState = testReducers.messages['UPDATE_MESSAGES'](state, action);
  const expectedState = createUpdateState(state, action, [[0, 1, 2, 4], [1, 2], [1, 2]], [0, 1, 2, 4], { messages: [1, 2] });
  expect(updatedState).toEqual(expectedState);
});

test('Update reducer failed', () => {
  const initialState = createInitialState({}, {}, [[0, 1, 2, 4]], [0, 1, 2, 4]);
  const initialAction = updateMessages(getMessegesByIndexes('data', [], [], [1, 2]));
  const state = createUpdateState(initialState, initialAction, [[0, 1, 2, 4], [3, 2], [1, 2]], [0, 1, 2, 4], { messages: [1, 2] });
  const action = { uuid: initialAction.uuid, error: 'failed update' };
  const updatedState = testReducers.messages['UPDATE_MESSAGES_FAILED'](state, action);
  const expectedState = createUpdateFailedState(state, action, [[0, 1, 2, 4]], [0, 1, 2, 4]);
  expect(updatedState).toEqual(expectedState);
});

test('Update reducer success', () => {
  const initialState = createInitialState({}, {}, [[0, 1, 2, 4]], [0, 1, 2, 4]);
  const initialAction = updateMessages(getMessegesByIndexes('data', [], [], [1, 2]));
  const state = createUpdateState(initialState, initialAction, [[0, 1, 2, 4], [1, 2], [1, 2]], [0, 1, 2, 4], { messages: [1, 2] });
  const action = { uuid: initialAction.uuid, payload: getMessegesByIndexes('payload', [], [], [1, 2]) };
  const updatedState = testReducers.messages['UPDATE_MESSAGES_COMPLETED'](state, action);
  const expectedState = createUpdateCompletedState(state, action, [[0, 1, 2, 4], [], [1, 2]], [0, 1, 2, 4]);
  expect(updatedState).toEqual(expectedState);
});