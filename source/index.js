import createIoActions from './actions/createIoActions';
import { createGetAction, createPostAction, createPutAction, createDeleteAction } from './actions/createCrudAction';
import createIoReducers, { normalizeToEntities } from './reducers/createIoReducers';
import createRootReducer from './reducers/createRootReducer';
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

  createGetAction = (name, options = {}) =>
    createGetAction(name, this.mergeOptions(options));

  createPostAction = (name, options = {}) =>
    createPostAction(name, this.mergeOptions(options));

  createPutAction = (name, options = {}) =>
    createPutAction(name, this.mergeOptions(options));

  createDeleteAction = (name, options = {}) =>
    createDeleteAction(name, this.mergeOptions(options));

  createIoReducers = (name, customActions = {}, options = {}) =>
    createIoReducers(name, customActions, this.mergeOptions(options));

  createRootReducer = (reducers = []) =>
    createRootReducer(reducers);

  createInitialState = () =>
    createInitialState();

  createOfflineOptions = (options = {}) =>
    createOfflineOptions(this.options, options);

  normalizeToEntities = (data, name, options) =>
    normalizeToEntities(data, name, this.mergeOptions(options));
}

export * from './reducers/stateOperations';