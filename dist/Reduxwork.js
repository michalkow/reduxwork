"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dispatchToSocket = _interopRequireDefault(require("./lib/dispatchToSocket"));

var _createIoActions = _interopRequireDefault(require("./actions/createIoActions"));

var _createIoReducers = _interopRequireDefault(require("./reducers/createIoReducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Reduxwork = function Reduxwork(_options, schemas) {
  var _this = this;

  _classCallCheck(this, Reduxwork);

  _defineProperty(this, "mergeOptions", function (options) {
    return Object.assign({}, _this.options, options);
  });

  _defineProperty(this, "changeNetworkStatus", function (online) {
    return _this.online = online;
  });

  _defineProperty(this, "createReducer", function (name) {});

  _defineProperty(this, "createAction", function (name) {});

  _defineProperty(this, "createIoActions", function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return (0, _createIoActions.default)(name, _this.mergeOptions(options));
  });

  _defineProperty(this, "createIoReducers", function (name) {
    var customState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var customActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return (0, _createIoReducers.default)(name, customState, customActions, _this.mergeOptions(options));
  });

  _defineProperty(this, "sendAction", function (action, next) {
    if (action.transport == 'socket') return next((0, _dispatchToSocket.default)(_this.options, action));
    if (action.transport == 'fetch') return dispatchToFetch(_this.options, action);
  });

  _defineProperty(this, "executeAction", function (action, next) {
    if (action.clientAction) return next(action);
    return _this.sendAction(action, next);
  });

  _defineProperty(this, "addActionToQueue", function (action) {
    return _this.queue.push(action);
  });

  _defineProperty(this, "returnActionToQueue", function (action) {
    return _this.queue.unshift(action);
  });

  _defineProperty(this, "sendQueueAction", function () {
    var time = new Date().getTime();
    var action = Object.assign({}, _this.queue[0], {
      queueAction: time
    });
    _this.waitQueueAction = time;

    _this.store.dispatch(action);
  });

  _defineProperty(this, "runQueue", function () {});

  _defineProperty(this, "handleReduxworkAction", function (action, next) {
    if (!_this.online && !action.clientAction) return _this.addActionToQueue(action);
    return _this.executeAction(action, next);
  });

  _defineProperty(this, "middleware", function (store) {
    return function (next) {
      return function (action) {
        /*
        if (!this.store)
        this.store = store;
        const jasonify = JSON.stringify(action);
        console.log(jasonify);
        */
        //if (action.reduxwork)
        return _this.handleReduxworkAction(action, next); // else
        // return next(action);
      };
    };
  });

  this.options = Object.assign({}, {
    keyName: 'id',
    prefix: 'rw',
    socketEventName: 'redux_action_event',
    socket: null,
    transport: _options.socket ? 'socket' : 'fetch',
    virtualFieldsName: 'virtualFields',
    localFieldsName: 'localFields',
    actionInject: function actionInject(action) {
      return action;
    }
  }, _options);
  this.schemas = schemas;
  this.queue = [];
  this.store = null;
  this.online = true;
  this.waitQueueAction = null;
};

exports.default = Reduxwork;