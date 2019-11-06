import { applyMiddleware, createStore, compose } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { AsyncNodeStorage } from 'redux-persist-node-storage';
import reduxwork from './test-reduxwork';
import reducers from './test-reducers';
import server from './test-server';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';
import { getMessegesByIndexes } from './test-data';
import io from 'socket.io-client';

const serverAdress = 'http://127.0.0.1:1234';
const socket = io(serverAdress, {
  transports: ['websocket', 'polling']
});

const offlineOptions = Object.assign({}, offlineConfig, {
  persistOptions: { storage: new AsyncNodeStorage('tmp/') }
}, reduxwork.createOfflineOptions({ socket }));
const { middleware, enhanceReducer, enhanceStore } = createOffline(offlineOptions);
const store = createStore(
  enhanceReducer(
    reduxwork.createRootReducer([reducers])
  ),
  reduxwork.createInitialState(),
  compose(enhanceStore, applyMiddleware(middleware))
);

const serverPort = process.env.PORT || 1234;
const outbox = [];

const startServer = () => server.listen(serverPort);
const stopServer = () => server.close();
const waitForAction = (action, variant = null, callback) => {
  let wait = true;
  return store.subscribe(() => {
    const state = store.getState();
    const { lastAction } = state;
    const type = variant ? action.meta.offline[variant].type : action.type;
    if (lastAction.uuid == action.uuid && lastAction.type == type && wait) {
      wait = false;
      callback(state);
    }
  });
};

beforeAll(() => {
  startServer();
});

afterAll(() => {
  stopServer();
});

test('Initial state', () => {
  const state = store.getState();
  const initialState = {
    actionCache: {},
    entitieStatus: {},
    actionErrors: {},
    lastAction: null,
    offline: {
      busy: false,
      lastTransaction: 0,
      netInfo: {
        isConnectionExpensive: null,
        reach: 'NONE'
      },
      online: false,
      outbox: [],
      retryCount: 0,
      retryScheduled: false
    }
  };
  expect(state).toEqual(initialState);
});

test('State after create', (done) => {
  const action = createMessages(getMessegesByIndexes('data', [0, 1]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 1]));
    done();
  });

  store.dispatch(action);
});

test('State after create 2', (done) => {
  const action = createMessages(getMessegesByIndexes('data', [2]));
  waitForAction(action, 'commit', (state) => {
    try {
      expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 1, 2]));
      done();
    } catch (error) {
      done(error);
    }

  });

  store.dispatch(action);
});

test('State after create 3', (done) => {
  stopServer();
  const action = createMessages(getMessegesByIndexes('data', [3]));
  outbox.push(action);
  waitForAction(action, null, (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 1, 2, 3], [3]));
    done();
  });

  store.dispatch(action);
});

test('State after create 4', (done) => {
  const action = outbox.pop();
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 1, 2, 3]));
    done();
  });

  startServer();
});

test('State after destroy', (done) => {
  const action = destroyMessages(getMessegesByIndexes('data', [1, 3]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 2]));
    done();
  });

  store.dispatch(action);
});

test('State after update', (done) => {
  const action = updateMessages(getMessegesByIndexes('data', [], [], [2]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 2], [], [2]));
    done();
  });

  store.dispatch(action);
});

test('State after update 2', (done) => {
  const action = updateMessages(getMessegesByIndexes('data', [], [], [0, 1]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 1, 2], [], [0, 1, 2]));
    done();
  });

  store.dispatch(action);
});

test('State after destroy 2', (done) => {
  const action = destroyMessages(getMessegesByIndexes('data', [0, 1, 2]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', []));
    done();
  });

  store.dispatch(action);
});

test('State after create 5 ', (done) => {
  const action = createMessages(getMessegesByIndexes('data', [0, 1, 3, 4]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 1, 3, 4]));
    done();
  });

  store.dispatch(action);
});

test('State after destroy 3', (done) => {
  const action = destroyMessages(getMessegesByIndexes('data', [1]));
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 3, 4]));
    done();
  });

  store.dispatch(action);
});

test('State after find', (done) => {
  const action = findMessages();
  waitForAction(action, 'commit', (state) => {
    expect(state.messages).toEqual(getMessegesByIndexes('entities', [0, 3, 4]));
    done();
  });

  store.dispatch(action);
});