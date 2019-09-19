import dispatchToRedux from './lib/dispatchToRedux';
import dispatchToSocket from './lib/dispatchToSocket';
import dispatchToFetch from './lib/dispatchToFetch';
import createIoActions from './actions/createIoActions';
import createIoReducers from './reducers/createIoReducers';
import { TransportMethodEnum } from './lib/constants';
import PQueue from 'p-queue';

export default class Reduxwork {

  constructor(options, schemas) {
    this.options = Object.assign({}, {
      keyName: 'id',
      addKeyOnCreate: false,
      rewriteOnUpdate: true,
      prefix: 'rw',
      socketEventName: 'redux_action_event',
      socket: null,
      transport: options.socket ? 'socket' : 'fetch',
      virtualFieldsName: 'virtualFields',
      localFieldsName: 'localFields',
      uuidOptions: {},
      uuidVersion: 'v4',
      actionInject: (action) => action
    }, options);
    this.schemas = schemas;
    this.queue = new PQueue({ concurrency: 1 });
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

  executeAction = (action, next) => {
    switch (action.reduxwork.transport) {
      case TransportMethodEnum.LOCAL:
        return next(action);
      case TransportMethodEnum.REDUX:
        return next(dispatchToRedux(this.options, action));
      case TransportMethodEnum.SOCKET:
        return next(dispatchToSocket(this.options, action));
      case TransportMethodEnum.FETCH:
        return next(dispatchToFetch(this.options, action));
    }
  };

  handleReduxworkAction = (action, next) => {
    if (!this.online && !action.reduxwork.transport != TransportMethodEnum.REDUX)
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