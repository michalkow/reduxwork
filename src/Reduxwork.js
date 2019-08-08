import dispatchToSocket from './lib/dispatchToSocket';
//import dispatchToFetch from './lib/dispatchToFetch';
import createIoActions from './actions/createIoActions';
import createIoReducers from './reducers/createIoReducers';

export default class Reduxwork {

  constructor(options, schemas) {
    this.options = Object.assign({}, {
      keyName: 'id',
      prefix: 'rw',
      socketEventName: 'redux_action_event',
      socket: null,
      transport: options.socket ? 'socket' : 'fetch',
      virtualFieldsName: 'virtualFields',
      localFieldsName: 'localFields',
      actionInject: (action) => action
    }, options);
    this.schemas = schemas;
    this.online = false;
  }

  mergeOptions = (options) =>
    Object.assign({}, this.options, options);

  changeNetworkStatus = (online) =>
    this.online = online;

  createReducer = (name) => {

  };

  createAction = (name) => {

  };

  createIoActions = (name, options = {}) =>
    createIoActions(name, this.mergeOptions(options));

  createIoReducers = (name, customState = {}, customActions = {}, options = {}) =>
    createIoReducers(name, customState, customActions, this.mergeOptions(options));

  isLocalAction = (action) => {
    return !!action.local;
  };

  sendAction = (state, action, next) => {
    if (action.transport == 'socket')
      return dispatchToSocket(this.options, state, action, next);
    if (action.transport == 'fetch')
      return dispatchToFetch(this.options, state, action, next);
  };

  executeAction = (state, action, next) => {
    if (this.isLocalAction(action))
      this.updateQueue(state, action);
    else
      this.sendAction(state, action, next);
    return next(action);
  };

  handleReduxworkAction = (state, action, next) => {
    if (!this.online && !this.isLocalAction(action))
      return this.addActionToQueue(action);
    return this.executAction(state, action, next);
  };

  middleware = state => next => action => {
    if (action.reduxwork)
      return this.handleReduxworkAction(state, action, next);
    return next(action);
  };

}