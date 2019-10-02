import createIoActions from './lib/createIoActions';
import createIoReducers from './lib/createIoReducers';
import createReducer from './lib/createReducer';
import buildEffect from './lib/buildEffect';
import buildDiscard from './lib/buildDiscard';
import { omitLocalFields, omitVirtualFields } from './lib/fieldsOperations';

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

  createIoReducers = (name, customState = {}, customActions = {}, options = {}) =>
    createIoReducers(name, customState, customActions, this.mergeOptions(options));

  createReducer = (name, customState = {}, customActions = {}) =>
    createReducer(name, customState, customActions);

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