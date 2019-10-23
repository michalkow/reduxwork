import createIoActions from './actions/createIoActions';
import createIoReducers from './reducers/createIoReducers';
import createRootReducer from './reducers/createRootReducer';
import createReducer from './reducers/createReducer';
import createInitialState from './lib/createInitialState';
import createOfflineOptions from './offline/createOfflineOptions';

const DEFAULT_OPTIONS = {
  keyName: 'id',
  addKeyOnCreate: false,
  rewriteOnUpdate: true,
  socketEventName: 'redux_action_event',
  socket: null,
  transport: 'fetch',
  virtualFieldsName: 'virtualFields',
  localFieldsName: 'localFields',
  uuidOptions: {},
  uuidVersion: 'v4',
  actionInject: (action) => action,
  validationHook: null,
  createKey: null,
  schemas: {}
};

export default class Reduxwork {

  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  mergeOptions = (options = {}) =>
    Object.assign({}, this.options, options);

  createIoActions = (name, options = {}) =>
    createIoActions(name, this.mergeOptions(options));

  createIoReducers = (name, customActions = {}, options = {}) =>
    createIoReducers(name, customActions, this.mergeOptions(options));

  createReducer = (name, customActions = {}) =>
    createReducer(name, customActions);

  createRootReducer = (reducers = []) =>
    createRootReducer(reducers);

  createInitialState = () =>
    createInitialState();
 
  createOfflineOptions = (options = {}) =>
    createOfflineOptions(this.options, options);
}