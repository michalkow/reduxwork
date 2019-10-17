import createIoActions from './lib/createIoActions';
import createIoReducers from './reducers/createIoReducers';
import createReducer from './lib/createReducer';
import buildEffect from './lib/buildEffect';
import buildDiscard from './lib/buildDiscard';

export default class Reduxwork {

  constructor(options) {
    this.options = Object.assign({}, {
      keyName: 'id',
      addKeyOnCreate: false,
      rewriteOnUpdate: true,
      socketEventName: 'redux_action_event',
      socket: null,
      transport: options.socket ? 'socket' : 'fetch',
      virtualFieldsName: 'virtualFields',
      localFieldsName: 'localFields',
      uuidOptions: {},
      uuidVersion: 'v4',
      actionInject: (action) => action,
      validationHook: null,
      schemas: {}
    }, options);
  }

  mergeOptions = (options) =>
    Object.assign({}, this.options, options);

  createIoActions = (name, options = {}) =>
    createIoActions(name, this.mergeOptions(options));

  createIoReducers = (name, customActions = {}, options = {}) =>
    createIoReducers(name, customActions, this.mergeOptions(options));

  createReducer = (name, customActions = {}) =>
    createReducer(name, customActions);

  createOfflineOptions = (options) => {
    const effect = buildEffect(this.options);
    const discard = buildDiscard(this.options);
    return {
      ...options,
      effect,
      discard
    };
  }
}