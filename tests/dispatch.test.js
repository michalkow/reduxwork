import { applyMiddleware, createStore, compose } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { AsyncNodeStorage } from 'redux-persist-node-storage';
import reduxwork from './test-reduxwork';
import reducers from './test-reducers';
import server from './test-server';
import { get, omit } from 'lodash';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';

const offlineOptions = Object.assign({}, offlineConfig, {
  persistOptions: { storage: new AsyncNodeStorage('tmp/') }
}, reduxwork.createOfflineOptions());
const { middleware, enhanceReducer, enhanceStore } = createOffline(offlineOptions);
const store = createStore(
  enhanceReducer(
    reduxwork.createRootReducer([reducers])
  ),
  reduxwork.createInitialState(),
  compose(enhanceStore, applyMiddleware(middleware))
);

const serverPort = process.env.PORT || 1234;

const startServer = () => server.listen(serverPort);
const stopServer = () => server.close();

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
  let isWriting = false;
  const action = createMessages({ body: 'text1' });
  store.subscribe(() => {
    const state = store.getState();
    if (isWriting && !get(state, 'entitieStatus.messages.isWriting')) {
      const [item] = action.payload;
      expect(state.messages).toEqual({ [item.id]: omit(item, ['_temp']) });
      done();
    }
    isWriting = get(state, 'entitieStatus.messages.isWriting');
  });

  store.dispatch(action);
});