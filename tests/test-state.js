import { getMessegesByIndexes, getUsersByMessegeIndexes } from './test-data';

export const createInitialState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: {},
    actionErrors: {},
    lastAction: null
  });

export const createFindState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: {
      messages: { isFinding: true }
    },
    actionErrors: {},
    lastAction: action
  });

export const createFindFailedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: {
      messages: { isFinding: false }
    },
    actionErrors: { [action.uuid]: { message: 'failed find', action }},
    lastAction: action
  });

export const createFindCompletedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: {
      messages: { isFinding: false, init: true }
    },
    actionErrors: {},
    lastAction: action
  });

export const createCreateState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: { [action.uuid]: { messages: getMessegesByIndexes('entities', cache.messages) }},
    entitiesStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action
  });

export const createCreateFailedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: { message: 'failed create', action }},
    lastAction: action
  });

export const createCreateCompletedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action
  });

export const createUpdateState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1], messages[2]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: { [action.uuid]: { messages: getMessegesByIndexes('entities', cache.messages) }},
    entitiesStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action
  });

export const createUpdateFailedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: { message: 'failed update', action }},
    lastAction: action
  });

export const createUpdateCompletedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1], messages[2]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action
  });

export const createDestroyState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: { [action.uuid]: { messages: getMessegesByIndexes('entities', cache.messages) }},
    entitiesStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action
  });

export const createDestroyFailedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: { message: 'failed destroy', action }},
    lastAction: action
  });

export const createDestroyCompletedState = (state = {}, action, messages = [], users = []) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitiesStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action
  });