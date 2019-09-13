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
      };};});this.options = Object.assign({}, { keyName: 'id', addKeyOnCreate: false, rewriteOnUpdate: true, prefix: 'rw', socketEventName: 'redux_action_event', socket: null, transport: _options.socket ? 'socket' : 'fetch', virtualFieldsName: 'virtualFields', localFieldsName: 'localFields', actionInject: function actionInject(action) {return action;} }, _options);this.schemas = schemas;this.queue = [];this.store = null;this.online = true;this.waitQueueAction = null;};exports.default = Reduxwork;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWR1eHdvcmsuanMiXSwibmFtZXMiOlsiUmVkdXh3b3JrIiwib3B0aW9ucyIsInNjaGVtYXMiLCJPYmplY3QiLCJhc3NpZ24iLCJvbmxpbmUiLCJuYW1lIiwibWVyZ2VPcHRpb25zIiwiY3VzdG9tU3RhdGUiLCJjdXN0b21BY3Rpb25zIiwiYWN0aW9uIiwicXVldWUiLCJwdXNoIiwidW5zaGlmdCIsInRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInF1ZXVlQWN0aW9uIiwid2FpdFF1ZXVlQWN0aW9uIiwic3RvcmUiLCJkaXNwYXRjaCIsIm5leHQiLCJyZWR1eHdvcmsiLCJ0cmFuc3BvcnQiLCJUcmFuc3BvcnRNZXRob2RFbnVtIiwiUkVEVVgiLCJTT0NLRVQiLCJGRVRDSCIsImFkZEFjdGlvblRvUXVldWUiLCJleGVjdXRlQWN0aW9uIiwiaGFuZGxlUmVkdXh3b3JrQWN0aW9uIiwia2V5TmFtZSIsImFkZEtleU9uQ3JlYXRlIiwicmV3cml0ZU9uVXBkYXRlIiwicHJlZml4Iiwic29ja2V0RXZlbnROYW1lIiwic29ja2V0IiwidmlydHVhbEZpZWxkc05hbWUiLCJsb2NhbEZpZWxkc05hbWUiLCJhY3Rpb25JbmplY3QiXSwibWFwcGluZ3MiOiJvR0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7O0FBRXFCQSxTOztBQUVuQixtQkFBWUMsUUFBWixFQUFxQkMsT0FBckIsRUFBOEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JmLFlBQUNELE9BQUQ7QUFDYkUsTUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFJLENBQUNILE9BQXZCLEVBQWdDQSxPQUFoQyxDQURhLEdBcEJlOztBQXVCUixZQUFDSSxNQUFEO0FBQ3BCLE1BQUEsS0FBSSxDQUFDQSxNQUFMLEdBQWNBLE1BRE0sR0F2QlE7O0FBMEJkLFlBQUNDLElBQUQsRUFBVTs7QUFFekIsR0E1QjZCOztBQThCZixZQUFDQSxJQUFELEVBQVU7O0FBRXhCLEdBaEM2Qjs7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R0FBaUIsUUFBakIsR0FBNEIsT0FQUixFQVEvQkMsaUJBQWlCLEVBQUUsZUFSWSxFQVMvQkMsZUFBZSxFQUFFLGFBVGMsRUFVL0JDLFlBQVksRUFBRSxzQkFBQzdCLE1BQUQsVUFBWUEsTUFBWixFQVZpQixFQUFsQixFQVdaVCxRQVhZLENBQWYsQ0FZQSxLQUFLQyxPQUFMLEdBQWVBLE9BQWYsQ0FDQSxLQUFLUyxLQUFMLEdBQWEsRUFBYixDQUNBLEtBQUtRLEtBQUwsR0FBYSxJQUFiLENBQ0EsS0FBS2QsTUFBTCxHQUFjLElBQWQsQ0FDQSxLQUFLYSxlQUFMLEdBQXVCLElBQXZCLENBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNwYXRjaFRvUmVkdXggZnJvbSAnLi9saWIvZGlzcGF0Y2hUb1JlZHV4JztcclxuaW1wb3J0IGRpc3BhdGNoVG9Tb2NrZXQgZnJvbSAnLi9saWIvZGlzcGF0Y2hUb1NvY2tldCc7XHJcbmltcG9ydCBkaXNwYXRjaFRvRmV0Y2ggZnJvbSAnLi9saWIvZGlzcGF0Y2hUb0ZldGNoJztcclxuaW1wb3J0IGNyZWF0ZUlvQWN0aW9ucyBmcm9tICcuL2FjdGlvbnMvY3JlYXRlSW9BY3Rpb25zJztcclxuaW1wb3J0IGNyZWF0ZUlvUmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2Vycy9jcmVhdGVJb1JlZHVjZXJzJztcclxuaW1wb3J0IHsgVHJhbnNwb3J0TWV0aG9kRW51bSB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWR1eHdvcmsge1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBzY2hlbWFzKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgIGtleU5hbWU6ICdpZCcsXHJcbiAgICAgIGFkZEtleU9uQ3JlYXRlOiBmYWxzZSxcclxuICAgICAgcmV3cml0ZU9uVXBkYXRlOiB0cnVlLFxyXG4gICAgICBwcmVmaXg6ICdydycsXHJcbiAgICAgIHNvY2tldEV2ZW50TmFtZTogJ3JlZHV4X2FjdGlvbl9ldmVudCcsXHJcbiAgICAgIHNvY2tldDogbnVsbCxcclxuICAgICAgdHJhbnNwb3J0OiBvcHRpb25zLnNvY2tldCA/ICdzb2NrZXQnIDogJ2ZldGNoJyxcclxuICAgICAgdmlydHVhbEZpZWxkc05hbWU6ICd2aXJ0dWFsRmllbGRzJyxcclxuICAgICAgbG9jYWxGaWVsZHNOYW1lOiAnbG9jYWxGaWVsZHMnLFxyXG4gICAgICBhY3Rpb25JbmplY3Q6IChhY3Rpb24pID0+IGFjdGlvblxyXG4gICAgfSwgb3B0aW9ucyk7XHJcbiAgICB0aGlzLnNjaGVtYXMgPSBzY2hlbWFzO1xyXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG4gICAgdGhpcy5zdG9yZSA9IG51bGw7XHJcbiAgICB0aGlzLm9ubGluZSA9IHRydWU7XHJcbiAgICB0aGlzLndhaXRRdWV1ZUFjdGlvbiA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBtZXJnZU9wdGlvbnMgPSAob3B0aW9ucykgPT5cclxuICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gIGNoYW5nZU5ldHdvcmtTdGF0dXMgPSAob25saW5lKSA9PlxyXG4gICAgdGhpcy5vbmxpbmUgPSBvbmxpbmU7XHJcblxyXG4gIGNyZWF0ZVJlZHVjZXIgPSAobmFtZSkgPT4ge1xyXG5cclxuICB9O1xyXG5cclxuICBjcmVhdGVBY3Rpb24gPSAobmFtZSkgPT4ge1xyXG5cclxuICB9O1xyXG5cclxuICBjcmVhdGVJb0FjdGlvbnMgPSAobmFtZSwgb3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlSW9BY3Rpb25zKG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgY3JlYXRlSW9SZWR1Y2VycyA9IChuYW1lLCBjdXN0b21TdGF0ZSA9IHt9LCBjdXN0b21BY3Rpb25zID0ge30sIG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZUlvUmVkdWNlcnMobmFtZSwgY3VzdG9tU3RhdGUsIGN1c3RvbUFjdGlvbnMsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgYWRkQWN0aW9uVG9RdWV1ZSA9IChhY3Rpb24pID0+XHJcbiAgICB0aGlzLnF1ZXVlLnB1c2goYWN0aW9uKTtcclxuXHJcbiAgcmV0dXJuQWN0aW9uVG9RdWV1ZSA9IChhY3Rpb24pID0+XHJcbiAgICB0aGlzLnF1ZXVlLnVuc2hpZnQoYWN0aW9uKTtcclxuXHJcbiAgc2VuZFF1ZXVlQWN0aW9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgY29uc3QgYWN0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5xdWV1ZVswXSwgeyBxdWV1ZUFjdGlvbjogdGltZSB9KTtcclxuICAgIHRoaXMud2FpdFF1ZXVlQWN0aW9uID0gdGltZTtcclxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHJ1blF1ZXVlID0gKCkgPT4ge1xyXG5cclxuICB9O1xyXG5cclxuICBleGVjdXRlQWN0aW9uID0gKGFjdGlvbiwgbmV4dCkgPT4ge1xyXG4gICAgc3dpdGNoIChhY3Rpb24ucmVkdXh3b3JrLnRyYW5zcG9ydCkge1xyXG4gICAgICBjYXNlIFRyYW5zcG9ydE1ldGhvZEVudW0uUkVEVVg6XHJcbiAgICAgICAgcmV0dXJuIG5leHQoZGlzcGF0Y2hUb1JlZHV4KHRoaXMub3B0aW9ucywgYWN0aW9uKSk7XHJcbiAgICAgIGNhc2UgVHJhbnNwb3J0TWV0aG9kRW51bS5TT0NLRVQ6XHJcbiAgICAgICAgcmV0dXJuIG5leHQoZGlzcGF0Y2hUb1NvY2tldCh0aGlzLm9wdGlvbnMsIGFjdGlvbikpO1xyXG4gICAgICBjYXNlIFRyYW5zcG9ydE1ldGhvZEVudW0uRkVUQ0g6XHJcbiAgICAgICAgcmV0dXJuIG5leHQoZGlzcGF0Y2hUb0ZldGNoKHRoaXMub3B0aW9ucywgYWN0aW9uKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaGFuZGxlUmVkdXh3b3JrQWN0aW9uID0gKGFjdGlvbiwgbmV4dCkgPT4ge1xyXG4gICAgaWYgKCF0aGlzLm9ubGluZSAmJiAhYWN0aW9uLnJlZHV4d29yay50cmFuc3BvcnQgIT0gVHJhbnNwb3J0TWV0aG9kRW51bS5SRURVWClcclxuICAgICAgcmV0dXJuIHRoaXMuYWRkQWN0aW9uVG9RdWV1ZShhY3Rpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZUFjdGlvbihhY3Rpb24sIG5leHQpO1xyXG4gIH07XHJcblxyXG4gIG1pZGRsZXdhcmUgPSBzdG9yZSA9PiBuZXh0ID0+IGFjdGlvbiA9PiB7LypcclxuICAgIGlmICghdGhpcy5zdG9yZSlcclxuICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xyXG5cclxuICAgIGNvbnN0IGphc29uaWZ5ID0gSlNPTi5zdHJpbmdpZnkoYWN0aW9uKTtcclxuICAgIGNvbnNvbGUubG9nKGphc29uaWZ5KTtcclxuICAgICovXHJcbiAgICAvL2lmIChhY3Rpb24ucmVkdXh3b3JrKVxyXG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZWR1eHdvcmtBY3Rpb24oYWN0aW9uLCBuZXh0KTtcclxuICAgLy8gZWxzZVxyXG4gICAgIC8vIHJldHVybiBuZXh0KGFjdGlvbik7XHJcbiAgfTtcclxuXHJcbn0iXX0=