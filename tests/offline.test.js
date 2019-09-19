import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testReducers from './test-reducers';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';
import reduxwork from './test-reduxwork';
import { normalize } from 'normalizr';
import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const mockStore = configureStore([offline(offlineConfig)]);

test.only('Find messages', () => {
  var store = mockStore({ messages: {} });

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
          validationScheme: void (0),
          localFields: void (0),
          virtualFields: void (0)
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