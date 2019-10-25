import { getMessegesByIndexes, getUsersByMessegeIndexes } from './test-data';

export const createInitialState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: {},
    actionErrors: {},
    lastAction: null
  });

export const createFindState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: {
      messages: { isFinding: true }
    },
    actionErrors: {},
    lastAction: action.uuid
  });

export const createFindFailedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: {
      messages: { isFinding: false }
    },
    actionErrors: {
      [action.uuid]: 'failed find'
    },
    lastAction: action.uuid
  });

export const createFindCompletedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: {
      messages: { isFinding: false, init: true }
    },
    actionErrors: {},
    lastAction: action.uuid
  });

export const createCreateState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: { [action.uuid]: { messages: getMessegesByIndexes('entities', cache.messages) }},
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action.uuid
  });

export const createCreateFailedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: 'failed create' },
    lastAction: action.uuid
  });

export const createCreateCompletedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action.uuid
  });

export const createUpdateState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: { [action.uuid]: { messages: getMessegesByIndexes('entities', cache.messages) }},
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action.uuid
  });

export const createUpdateFailedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: 'failed update' },
    lastAction: action.uuid
  });

export const createUpdateCompletedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action.uuid
  });

export const createDestroyState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: { [action.uuid]: { messages: getMessegesByIndexes('entities', cache.messages) }},
    entitieStatus: { messages: { isWriting: true }},
    actionErrors: {},
    lastAction: action.uuid
  });

export const createDestroyFailedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: { [action.uuid]: 'failed destroy' },
    lastAction: action.uuid
  });

export const createDestroyCompletedState = (state = {}, action, messages = [], users = [], cache = {}) =>
  Object.assign({}, state, {
    messages: getMessegesByIndexes('entities', messages[0], messages[1]),
    users: getUsersByMessegeIndexes('entities', users),
    actionCache: {},
    entitieStatus: { messages: { isWriting: false }},
    actionErrors: {},
    lastAction: action.uuid
  });