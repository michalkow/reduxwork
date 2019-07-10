import dispatchToSocket from "./lib/dispatchToSocket";
import fetchDispatcher from "./lib/fetchDispatcher";

export default class Reduxwork {

  constructor(options, schemas) {
    this.options = Object.assign({}, {
      keyName: 'id',
      prefix: 'rw',
      socketEventName: 'redux_action_event',
      socketEmitFunction: null,
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

  isLocalAction = (action) => {
    return !!action.local;
  };

  sendAction = (state, action, next) => {
    if (action.transport == 'socket')
      return dispatchToSocket(this.options, state, action, next);
    if (action.transport == 'fetch')
      return fetchDispatcher(this.options, state, action, next);
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

  createMiddleware = state => next => action => {
    if (action.reduxwork)
      return this.handleReduxworkAction(state, action, next);
    return next(action);
  };

}