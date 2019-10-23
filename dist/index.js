"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _createIoActions = _interopRequireDefault(require("./actions/createIoActions"));
var _createIoReducers = _interopRequireDefault(require("./reducers/createIoReducers"));
var _createRootReducer = _interopRequireDefault(require("./reducers/createRootReducer"));
var _createReducer = _interopRequireDefault(require("./reducers/createReducer"));
var _createInitialState = _interopRequireDefault(require("./lib/createInitialState"));
var _createOfflineOptions = _interopRequireDefault(require("./offline/createOfflineOptions"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var DEFAULT_OPTIONS = {
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
  actionInject: function actionInject(action) {return action;},
  validationHook: null,
  createKey: null,
  schemas: {} };var


Reduxwork =

function Reduxwork(_options) {var _this = this;_classCallCheck(this, Reduxwork);_defineProperty(this, "mergeOptions",



  function () {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (
      Object.assign({}, _this.options, options));});_defineProperty(this, "createIoActions",

  function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createIoActions.default)(name, _this.mergeOptions(options)));});_defineProperty(this, "createIoReducers",

  function (name) {var customActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return (
      (0, _createIoReducers.default)(name, customActions, _this.mergeOptions(options)));});_defineProperty(this, "createReducer",

  function (name) {var customActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createReducer.default)(name, customActions));});_defineProperty(this, "createRootReducer",

  function () {var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];return (
      (0, _createRootReducer.default)(reducers));});_defineProperty(this, "createInitialState",

  function () {return (
      (0, _createInitialState.default)());});_defineProperty(this, "createOfflineOptions",

  function () {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (
      (0, _createOfflineOptions.default)(_this.options, options));});this.options = Object.assign({}, DEFAULT_OPTIONS, _options);};exports.default = Reduxwork;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX09QVElPTlMiLCJrZXlOYW1lIiwiYWRkS2V5T25DcmVhdGUiLCJyZXdyaXRlT25VcGRhdGUiLCJzb2NrZXRFdmVudE5hbWUiLCJzb2NrZXQiLCJ0cmFuc3BvcnQiLCJ2aXJ0dWFsRmllbGRzTmFtZSIsImxvY2FsRmllbGRzTmFtZSIsInV1aWRPcHRpb25zIiwidXVpZFZlcnNpb24iLCJhY3Rpb25JbmplY3QiLCJhY3Rpb24iLCJ2YWxpZGF0aW9uSG9vayIsImNyZWF0ZUtleSIsInNjaGVtYXMiLCJSZWR1eHdvcmsiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwibmFtZSIsIm1lcmdlT3B0aW9ucyIsImN1c3RvbUFjdGlvbnMiLCJyZWR1Y2VycyJdLCJtYXBwaW5ncyI6Im9HQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Rjs7QUFFQSxJQUFNQSxlQUFlLEdBQUc7QUFDdEJDLEVBQUFBLE9BQU8sRUFBRSxJQURhO0FBRXRCQyxFQUFBQSxjQUFjLEVBQUUsS0FGTTtBQUd0QkMsRUFBQUEsZUFBZSxFQUFFLElBSEs7QUFJdEJDLEVBQUFBLGVBQWUsRUFBRSxvQkFKSztBQUt0QkMsRUFBQUEsTUFBTSxFQUFFLElBTGM7QUFNdEJDLEVBQUFBLFNBQVMsRUFBRSxPQU5XO0FBT3RCQyxFQUFBQSxpQkFBaUIsRUFBRSxlQVBHO0FBUXRCQyxFQUFBQSxlQUFlLEVBQUUsYUFSSztBQVN0QkMsRUFBQUEsV0FBVyxFQUFFLEVBVFM7QUFVdEJDLEVBQUFBLFdBQVcsRUFBRSxJQVZTO0FBV3RCQyxFQUFBQSxZQUFZLEVBQUUsc0JBQUNDLE1BQUQsVUFBWUEsTUFBWixFQVhRO0FBWXRCQyxFQUFBQSxjQUFjLEVBQUUsSUFaTTtBQWF0QkMsRUFBQUEsU0FBUyxFQUFFLElBYlc7QUFjdEJDLEVBQUFBLE9BQU8sRUFBRSxFQWRhLEVBQXhCLEM7OztBQWlCcUJDLFM7O0FBRW5CLG1CQUFZQyxRQUFaLEVBQXFCOzs7O0FBSU4sbUJBQUNBLE9BQUQsdUVBQVcsRUFBWDtBQUNiQyxNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUksQ0FBQ0YsT0FBdkIsRUFBZ0NBLE9BQWhDLENBRGEsR0FKTTs7QUFPSCxZQUFDRyxJQUFELE9BQU9ILE9BQVAsdUVBQWlCLEVBQWpCO0FBQ2hCLG9DQUFnQkcsSUFBaEIsRUFBc0IsS0FBSSxDQUFDQyxZQUFMLENBQWtCSixPQUFsQixDQUF0QixDQURnQixHQVBHOztBQVVGLFlBQUNHLElBQUQsT0FBT0UsYUFBUCx1RUFBdUIsRUFBdkIsS0FBMkJMLE9BQTNCLHVFQUFxQyxFQUFyQztBQUNqQixxQ0FBaUJHLElBQWpCLEVBQXVCRSxhQUF2QixFQUFzQyxLQUFJLENBQUNELFlBQUwsQ0FBa0JKLE9BQWxCLENBQXRDLENBRGlCLEdBVkU7O0FBYUwsWUFBQ0csSUFBRCxPQUFPRSxhQUFQLHVFQUF1QixFQUF2QjtBQUNkLGtDQUFjRixJQUFkLEVBQW9CRSxhQUFwQixDQURjLEdBYks7O0FBZ0JELG1CQUFDQyxRQUFELHVFQUFZLEVBQVo7QUFDbEIsc0NBQWtCQSxRQUFsQixDQURrQixHQWhCQzs7QUFtQkE7QUFDbkIsd0NBRG1CLEdBbkJBOztBQXNCRSxtQkFBQ04sT0FBRCx1RUFBVyxFQUFYO0FBQ3JCLHlDQUFxQixLQUFJLENBQUNBLE9BQTFCLEVBQW1DQSxPQUFuQyxDQURxQixHQXRCRixFQUNuQixLQUFLQSxPQUFMLEdBQWVDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JuQixlQUFsQixFQUFtQ2lCLFFBQW5DLENBQWYsQ0FDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUlvQWN0aW9ucyBmcm9tICcuL2FjdGlvbnMvY3JlYXRlSW9BY3Rpb25zJztcclxuaW1wb3J0IGNyZWF0ZUlvUmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2Vycy9jcmVhdGVJb1JlZHVjZXJzJztcclxuaW1wb3J0IGNyZWF0ZVJvb3RSZWR1Y2VyIGZyb20gJy4vcmVkdWNlcnMvY3JlYXRlUm9vdFJlZHVjZXInO1xyXG5pbXBvcnQgY3JlYXRlUmVkdWNlciBmcm9tICcuL3JlZHVjZXJzL2NyZWF0ZVJlZHVjZXInO1xyXG5pbXBvcnQgY3JlYXRlSW5pdGlhbFN0YXRlIGZyb20gJy4vbGliL2NyZWF0ZUluaXRpYWxTdGF0ZSc7XHJcbmltcG9ydCBjcmVhdGVPZmZsaW5lT3B0aW9ucyBmcm9tICcuL29mZmxpbmUvY3JlYXRlT2ZmbGluZU9wdGlvbnMnO1xyXG5cclxuY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xyXG4gIGtleU5hbWU6ICdpZCcsXHJcbiAgYWRkS2V5T25DcmVhdGU6IGZhbHNlLFxyXG4gIHJld3JpdGVPblVwZGF0ZTogdHJ1ZSxcclxuICBzb2NrZXRFdmVudE5hbWU6ICdyZWR1eF9hY3Rpb25fZXZlbnQnLFxyXG4gIHNvY2tldDogbnVsbCxcclxuICB0cmFuc3BvcnQ6ICdmZXRjaCcsXHJcbiAgdmlydHVhbEZpZWxkc05hbWU6ICd2aXJ0dWFsRmllbGRzJyxcclxuICBsb2NhbEZpZWxkc05hbWU6ICdsb2NhbEZpZWxkcycsXHJcbiAgdXVpZE9wdGlvbnM6IHt9LFxyXG4gIHV1aWRWZXJzaW9uOiAndjQnLFxyXG4gIGFjdGlvbkluamVjdDogKGFjdGlvbikgPT4gYWN0aW9uLFxyXG4gIHZhbGlkYXRpb25Ib29rOiBudWxsLFxyXG4gIGNyZWF0ZUtleTogbnVsbCxcclxuICBzY2hlbWFzOiB7fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkdXh3b3JrIHtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIG1lcmdlT3B0aW9ucyA9IChvcHRpb25zID0ge30pID0+XHJcbiAgICBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICBjcmVhdGVJb0FjdGlvbnMgPSAobmFtZSwgb3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlSW9BY3Rpb25zKG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgY3JlYXRlSW9SZWR1Y2VycyA9IChuYW1lLCBjdXN0b21BY3Rpb25zID0ge30sIG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZUlvUmVkdWNlcnMobmFtZSwgY3VzdG9tQWN0aW9ucywgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucykpO1xyXG5cclxuICBjcmVhdGVSZWR1Y2VyID0gKG5hbWUsIGN1c3RvbUFjdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZVJlZHVjZXIobmFtZSwgY3VzdG9tQWN0aW9ucyk7XHJcblxyXG4gIGNyZWF0ZVJvb3RSZWR1Y2VyID0gKHJlZHVjZXJzID0gW10pID0+XHJcbiAgICBjcmVhdGVSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcblxyXG4gIGNyZWF0ZUluaXRpYWxTdGF0ZSA9ICgpID0+XHJcbiAgICBjcmVhdGVJbml0aWFsU3RhdGUoKTtcclxuIFxyXG4gIGNyZWF0ZU9mZmxpbmVPcHRpb25zID0gKG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZU9mZmxpbmVPcHRpb25zKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcbn0iXX0=