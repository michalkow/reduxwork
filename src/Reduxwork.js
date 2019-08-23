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
    this.queue = [];
    this.store = null;
    this.online = true;
    this.waitQueueAction = null;
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

  sendAction = (action, next) => {
    console.log(action);
    if (action.transport == 'socket')
      return next(dispatchToSocket(this.options, action));
    if (action.transport == 'fetch')
      return dispatchToFetch(this.options, action);
  };

  executeAction = (action, next) => {
    if (action.clientAction)
      return next(action);
    return this.sendAction(action, next);
  };

  addActionToQueue = (action) =>
    this.queue.push(action);

  returnActionToQueue = (action) =>
    this.queue.unshift(action);

  sendQueueAction = () => {
    const time = new Date().getTime();
    const action = Object.assign({}, this.queue[0], { queueAction: time });
    this.waitQueueAction = time;
    this.store.dispatch(action);
  }

  runQueue = () => {

  };

  handleReduxworkAction = (action, next) => {
    if (!this.online && !action.clientAction)
      return this.addActionToQueue(action);
    return this.executeAction(action, next);
  };

  middleware = store => next => action => {/*
    if (!this.store)
      this.store = store;

    const jasonify = JSON.stringify(action);
    console.log(jasonify);
    */
    //if (action.reduxwork)
      return this.handleReduxworkAction(action, next);
   // else
     // return next(action);
  };

}