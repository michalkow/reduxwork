"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _dispatchToRedux = _interopRequireDefault(require("./lib/dispatchToRedux"));
var _dispatchToSocket = _interopRequireDefault(require("./lib/dispatchToSocket"));
var _dispatchToFetch = _interopRequireDefault(require("./lib/dispatchToFetch"));
var _createIoActions = _interopRequireDefault(require("./actions/createIoActions"));
var _createIoReducers = _interopRequireDefault(require("./reducers/createIoReducers"));
var _constants = require("./lib/constants");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

Reduxwork =

function Reduxwork(_options, schemas) {var _this = this;_classCallCheck(this, Reduxwork);_defineProperty(this, "mergeOptions",





















  function (options) {return (
      Object.assign({}, _this.options, options));});_defineProperty(this, "changeNetworkStatus",

  function (online) {return (
      _this.online = online);});_defineProperty(this, "createReducer",

  function (name) {

  });_defineProperty(this, "createAction",

  function (name) {

  });_defineProperty(this, "createIoActions",

  function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createIoActions.default)(name, _this.mergeOptions(options)));});_defineProperty(this, "createIoReducers",

  function (name) {var customState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var customActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};return (
      (0, _createIoReducers.default)(name, customState, customActions, _this.mergeOptions(options)));});_defineProperty(this, "addActionToQueue",

  function (action) {return (
      _this.queue.push(action));});_defineProperty(this, "returnActionToQueue",

  function (action) {return (
      _this.queue.unshift(action));});_defineProperty(this, "sendQueueAction",

  function () {
    var time = new Date().getTime();
    var action = Object.assign({}, _this.queue[0], { queueAction: time });
    _this.waitQueueAction = time;
    _this.store.dispatch(action);
  });_defineProperty(this, "runQueue",

  function () {

  });_defineProperty(this, "executeAction",

  function (action, next) {
    switch (action.reduxwork.transport) {
      case _constants.TransportMethodEnum.REDUX:
        return next((0, _dispatchToRedux.default)(_this.options, action));
      case _constants.TransportMethodEnum.SOCKET:
        return next((0, _dispatchToSocket.default)(_this.options, action));
      case _constants.TransportMethodEnum.FETCH:
        return next((0, _dispatchToFetch.default)(_this.options, action));}

  });_defineProperty(this, "handleReduxworkAction",

  function (action, next) {
    if (!_this.online && !action.reduxwork.transport != _constants.TransportMethodEnum.REDUX)
    return _this.addActionToQueue(action);
    return _this.executeAction(action, next);
  });_defineProperty(this, "middleware",

  function (store) {return function (next) {return function (action) {/*
                                                                      if (!this.store)
                                                                      this.store = store;
                                                                      const jasonify = JSON.stringify(action);
                                                                      console.log(jasonify);
                                                                      */

        //if (action.reduxwork)
        return _this.handleReduxworkAction(action, next);
        // else
        // return next(action);
      };};});this.options = Object.assign({}, { keyName: 'id', addKeyOnCreate: false, rewriteOnUpdate: true, prefix: 'rw', socketEventName: 'redux_action_event', socket: null, transport: _options.socket ? 'socket' : 'fetch', virtualFieldsName: 'virtualFields', localFieldsName: 'localFields', uuidOptions: {}, uuidVersion: 'v4', actionInject: function actionInject(action) {return action;} }, _options);this.schemas = schemas;this.queue = [];this.store = null;this.online = true;this.waitQueueAction = null;};exports.default = Reduxwork;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWR1eHdvcmsuanMiXSwibmFtZXMiOlsiUmVkdXh3b3JrIiwib3B0aW9ucyIsInNjaGVtYXMiLCJPYmplY3QiLCJhc3NpZ24iLCJvbmxpbmUiLCJuYW1lIiwibWVyZ2VPcHRpb25zIiwiY3VzdG9tU3RhdGUiLCJjdXN0b21BY3Rpb25zIiwiYWN0aW9uIiwicXVldWUiLCJwdXNoIiwidW5zaGlmdCIsInRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInF1ZXVlQWN0aW9uIiwid2FpdFF1ZXVlQWN0aW9uIiwic3RvcmUiLCJkaXNwYXRjaCIsIm5leHQiLCJyZWR1eHdvcmsiLCJ0cmFuc3BvcnQiLCJUcmFuc3BvcnRNZXRob2RFbnVtIiwiUkVEVVgiLCJTT0NLRVQiLCJGRVRDSCIsImFkZEFjdGlvblRvUXVldWUiLCJleGVjdXRlQWN0aW9uIiwiaGFuZGxlUmVkdXh3b3JrQWN0aW9uIiwia2V5TmFtZSIsImFkZEtleU9uQ3JlYXRlIiwicmV3cml0ZU9uVXBkYXRlIiwicHJlZml4Iiwic29ja2V0RXZlbnROYW1lIiwic29ja2V0IiwidmlydHVhbEZpZWxkc05hbWUiLCJsb2NhbEZpZWxkc05hbWUiLCJ1dWlkT3B0aW9ucyIsInV1aWRWZXJzaW9uIiwiYWN0aW9uSW5qZWN0Il0sIm1hcHBpbmdzIjoib0dBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDOztBQUVxQkEsUzs7QUFFbkIsbUJBQVlDLFFBQVosRUFBcUJDLE9BQXJCLEVBQThCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JmLFlBQUNELE9BQUQ7QUFDYkUsTUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFJLENBQUNILE9BQXZCLEVBQWdDQSxPQUFoQyxDQURhLEdBdEJlOztBQXlCUixZQUFDSSxNQUFEO0FBQ3BCLE1BQUEsS0FBSSxDQUFDQSxNQUFMLEdBQWNBLE1BRE0sR0F6QlE7O0FBNEJkLFlBQUNDLElBQUQsRUFBVTs7QUFFekIsR0E5QjZCOztBQWdDZixZ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LFNBQVMsRUFBRXRCLFFBQU8sQ0FBQ21DLE1BQVIsR0FBaUIsUUFBakIsR0FBNEIsT0FQUixFQVEvQkMsaUJBQWlCLEVBQUUsZUFSWSxFQVMvQkMsZUFBZSxFQUFFLGFBVGMsRUFVL0JDLFdBQVcsRUFBRSxFQVZrQixFQVcvQkMsV0FBVyxFQUFFLElBWGtCLEVBWS9CQyxZQUFZLEVBQUUsc0JBQUMvQixNQUFELFVBQVlBLE1BQVosRUFaaUIsRUFBbEIsRUFhWlQsUUFiWSxDQUFmLENBY0EsS0FBS0MsT0FBTCxHQUFlQSxPQUFmLENBQ0EsS0FBS1MsS0FBTCxHQUFhLEVBQWIsQ0FDQSxLQUFLUSxLQUFMLEdBQWEsSUFBYixDQUNBLEtBQUtkLE1BQUwsR0FBYyxJQUFkLENBQ0EsS0FBS2EsZUFBTCxHQUF1QixJQUF2QixDQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGlzcGF0Y2hUb1JlZHV4IGZyb20gJy4vbGliL2Rpc3BhdGNoVG9SZWR1eCc7XHJcbmltcG9ydCBkaXNwYXRjaFRvU29ja2V0IGZyb20gJy4vbGliL2Rpc3BhdGNoVG9Tb2NrZXQnO1xyXG5pbXBvcnQgZGlzcGF0Y2hUb0ZldGNoIGZyb20gJy4vbGliL2Rpc3BhdGNoVG9GZXRjaCc7XHJcbmltcG9ydCBjcmVhdGVJb0FjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL2NyZWF0ZUlvQWN0aW9ucyc7XHJcbmltcG9ydCBjcmVhdGVJb1JlZHVjZXJzIGZyb20gJy4vcmVkdWNlcnMvY3JlYXRlSW9SZWR1Y2Vycyc7XHJcbmltcG9ydCB7IFRyYW5zcG9ydE1ldGhvZEVudW0gfSBmcm9tICcuL2xpYi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkdXh3b3JrIHtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgc2NoZW1hcykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICBrZXlOYW1lOiAnaWQnLFxyXG4gICAgICBhZGRLZXlPbkNyZWF0ZTogZmFsc2UsXHJcbiAgICAgIHJld3JpdGVPblVwZGF0ZTogdHJ1ZSxcclxuICAgICAgcHJlZml4OiAncncnLFxyXG4gICAgICBzb2NrZXRFdmVudE5hbWU6ICdyZWR1eF9hY3Rpb25fZXZlbnQnLFxyXG4gICAgICBzb2NrZXQ6IG51bGwsXHJcbiAgICAgIHRyYW5zcG9ydDogb3B0aW9ucy5zb2NrZXQgPyAnc29ja2V0JyA6ICdmZXRjaCcsXHJcbiAgICAgIHZpcnR1YWxGaWVsZHNOYW1lOiAndmlydHVhbEZpZWxkcycsXHJcbiAgICAgIGxvY2FsRmllbGRzTmFtZTogJ2xvY2FsRmllbGRzJyxcclxuICAgICAgdXVpZE9wdGlvbnM6IHt9LFxyXG4gICAgICB1dWlkVmVyc2lvbjogJ3Y0JyxcclxuICAgICAgYWN0aW9uSW5qZWN0OiAoYWN0aW9uKSA9PiBhY3Rpb25cclxuICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zY2hlbWFzID0gc2NoZW1hcztcclxuICAgIHRoaXMucXVldWUgPSBbXTtcclxuICAgIHRoaXMuc3RvcmUgPSBudWxsO1xyXG4gICAgdGhpcy5vbmxpbmUgPSB0cnVlO1xyXG4gICAgdGhpcy53YWl0UXVldWVBY3Rpb24gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2VPcHRpb25zID0gKG9wdGlvbnMpID0+XHJcbiAgICBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICBjaGFuZ2VOZXR3b3JrU3RhdHVzID0gKG9ubGluZSkgPT5cclxuICAgIHRoaXMub25saW5lID0gb25saW5lO1xyXG5cclxuICBjcmVhdGVSZWR1Y2VyID0gKG5hbWUpID0+IHtcclxuXHJcbiAgfTtcclxuXHJcbiAgY3JlYXRlQWN0aW9uID0gKG5hbWUpID0+IHtcclxuXHJcbiAgfTtcclxuXHJcbiAgY3JlYXRlSW9BY3Rpb25zID0gKG5hbWUsIG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZUlvQWN0aW9ucyhuYW1lLCB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zKSk7XHJcblxyXG4gIGNyZWF0ZUlvUmVkdWNlcnMgPSAobmFtZSwgY3VzdG9tU3RhdGUgPSB7fSwgY3VzdG9tQWN0aW9ucyA9IHt9LCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVJb1JlZHVjZXJzKG5hbWUsIGN1c3RvbVN0YXRlLCBjdXN0b21BY3Rpb25zLCB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zKSk7XHJcblxyXG4gIGFkZEFjdGlvblRvUXVldWUgPSAoYWN0aW9uKSA9PlxyXG4gICAgdGhpcy5xdWV1ZS5wdXNoKGFjdGlvbik7XHJcblxyXG4gIHJldHVybkFjdGlvblRvUXVldWUgPSAoYWN0aW9uKSA9PlxyXG4gICAgdGhpcy5xdWV1ZS51bnNoaWZ0KGFjdGlvbik7XHJcblxyXG4gIHNlbmRRdWV1ZUFjdGlvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IGFjdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucXVldWVbMF0sIHsgcXVldWVBY3Rpb246IHRpbWUgfSk7XHJcbiAgICB0aGlzLndhaXRRdWV1ZUFjdGlvbiA9IHRpbWU7XHJcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBydW5RdWV1ZSA9ICgpID0+IHtcclxuXHJcbiAgfTtcclxuXHJcbiAgZXhlY3V0ZUFjdGlvbiA9IChhY3Rpb24sIG5leHQpID0+IHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnJlZHV4d29yay50cmFuc3BvcnQpIHtcclxuICAgICAgY2FzZSBUcmFuc3BvcnRNZXRob2RFbnVtLlJFRFVYOlxyXG4gICAgICAgIHJldHVybiBuZXh0KGRpc3BhdGNoVG9SZWR1eCh0aGlzLm9wdGlvbnMsIGFjdGlvbikpO1xyXG4gICAgICBjYXNlIFRyYW5zcG9ydE1ldGhvZEVudW0uU09DS0VUOlxyXG4gICAgICAgIHJldHVybiBuZXh0KGRpc3BhdGNoVG9Tb2NrZXQodGhpcy5vcHRpb25zLCBhY3Rpb24pKTtcclxuICAgICAgY2FzZSBUcmFuc3BvcnRNZXRob2RFbnVtLkZFVENIOlxyXG4gICAgICAgIHJldHVybiBuZXh0KGRpc3BhdGNoVG9GZXRjaCh0aGlzLm9wdGlvbnMsIGFjdGlvbikpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGhhbmRsZVJlZHV4d29ya0FjdGlvbiA9IChhY3Rpb24sIG5leHQpID0+IHtcclxuICAgIGlmICghdGhpcy5vbmxpbmUgJiYgIWFjdGlvbi5yZWR1eHdvcmsudHJhbnNwb3J0ICE9IFRyYW5zcG9ydE1ldGhvZEVudW0uUkVEVVgpXHJcbiAgICAgIHJldHVybiB0aGlzLmFkZEFjdGlvblRvUXVldWUoYWN0aW9uKTtcclxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVBY3Rpb24oYWN0aW9uLCBuZXh0KTtcclxuICB9O1xyXG5cclxuICBtaWRkbGV3YXJlID0gc3RvcmUgPT4gbmV4dCA9PiBhY3Rpb24gPT4gey8qXHJcbiAgICBpZiAoIXRoaXMuc3RvcmUpXHJcbiAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuXHJcbiAgICBjb25zdCBqYXNvbmlmeSA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XHJcbiAgICBjb25zb2xlLmxvZyhqYXNvbmlmeSk7XHJcbiAgICAqL1xyXG4gICAgLy9pZiAoYWN0aW9uLnJlZHV4d29yaylcclxuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVkdXh3b3JrQWN0aW9uKGFjdGlvbiwgbmV4dCk7XHJcbiAgIC8vIGVsc2VcclxuICAgICAvLyByZXR1cm4gbmV4dChhY3Rpb24pO1xyXG4gIH07XHJcblxyXG59Il19