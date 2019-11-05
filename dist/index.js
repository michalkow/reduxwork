"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _createIoActions = _interopRequireDefault(require("./actions/createIoActions"));
var _createCrudAction = require("./actions/createCrudAction");
var _createIoReducers = _interopRequireDefault(require("./reducers/createIoReducers"));
var _createRootReducer = _interopRequireDefault(require("./reducers/createRootReducer"));
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
      (0, _createIoActions.default)(name, _this.mergeOptions(options)));});_defineProperty(this, "createGetAction",

  function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createCrudAction.createGetAction)(name, _this.mergeOptions(options)));});_defineProperty(this, "createPostAction",

  function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createCrudAction.createPostAction)(name, _this.mergeOptions(options)));});_defineProperty(this, "createPutAction",

  function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createCrudAction.createPutAction)(name, _this.mergeOptions(options)));});_defineProperty(this, "createDeleteAction",

  function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (
      (0, _createCrudAction.createDeleteAction)(name, _this.mergeOptions(options)));});_defineProperty(this, "createIoReducers",

  function (name) {var customActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return (
      (0, _createIoReducers.default)(name, customActions, _this.mergeOptions(options)));});_defineProperty(this, "createRootReducer",

  function () {var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];return (
      (0, _createRootReducer.default)(reducers));});_defineProperty(this, "createInitialState",

  function () {return (
      (0, _createInitialState.default)());});_defineProperty(this, "createOfflineOptions",

  function () {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return (
      (0, _createOfflineOptions.default)(_this.options, options));});this.options = Object.assign({}, DEFAULT_OPTIONS, _options);};exports.default = Reduxwork;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX09QVElPTlMiLCJrZXlOYW1lIiwiYWRkS2V5T25DcmVhdGUiLCJyZXdyaXRlT25VcGRhdGUiLCJzb2NrZXRFdmVudE5hbWUiLCJzb2NrZXQiLCJ0cmFuc3BvcnQiLCJ2aXJ0dWFsRmllbGRzTmFtZSIsImxvY2FsRmllbGRzTmFtZSIsInV1aWRPcHRpb25zIiwidXVpZFZlcnNpb24iLCJhY3Rpb25JbmplY3QiLCJhY3Rpb24iLCJ2YWxpZGF0aW9uSG9vayIsImNyZWF0ZUtleSIsInNjaGVtYXMiLCJSZWR1eHdvcmsiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwibmFtZSIsIm1lcmdlT3B0aW9ucyIsImN1c3RvbUFjdGlvbnMiLCJyZWR1Y2VycyJdLCJtYXBwaW5ncyI6Im9HQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Rjs7QUFFQSxJQUFNQSxlQUFlLEdBQUc7QUFDdEJDLEVBQUFBLE9BQU8sRUFBRSxJQURhO0FBRXRCQyxFQUFBQSxjQUFjLEVBQUUsS0FGTTtBQUd0QkMsRUFBQUEsZUFBZSxFQUFFLElBSEs7QUFJdEJDLEVBQUFBLGVBQWUsRUFBRSxvQkFKSztBQUt0QkMsRUFBQUEsTUFBTSxFQUFFLElBTGM7QUFNdEJDLEVBQUFBLFNBQVMsRUFBRSxPQU5XO0FBT3RCQyxFQUFBQSxpQkFBaUIsRUFBRSxlQVBHO0FBUXRCQyxFQUFBQSxlQUFlLEVBQUUsYUFSSztBQVN0QkMsRUFBQUEsV0FBVyxFQUFFLEVBVFM7QUFVdEJDLEVBQUFBLFdBQVcsRUFBRSxJQVZTO0FBV3RCQyxFQUFBQSxZQUFZLEVBQUUsc0JBQUNDLE1BQUQsVUFBWUEsTUFBWixFQVhRO0FBWXRCQyxFQUFBQSxjQUFjLEVBQUUsSUFaTTtBQWF0QkMsRUFBQUEsU0FBUyxFQUFFLElBYlc7QUFjdEJDLEVBQUFBLE9BQU8sRUFBRSxFQWRhLEVBQXhCLEM7OztBQWlCcUJDLFM7O0FBRW5CLG1CQUFZQyxRQUFaLEVBQXFCOzs7O0FBSU4sbUJBQUNBLE9BQUQsdUVBQVcsRUFBWDtBQUNiQyxNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUksQ0FBQ0YsT0FBdkIsRUFBZ0NBLE9BQWhDLENBRGEsR0FKTTs7QUFPSCxZQUFDRyxJQUFELE9BQU9ILE9BQVAsdUVBQWlCLEVBQWpCO0FBQ2hCLG9DQUFnQkcsSUFBaEIsRUFBc0IsS0FBSSxDQUFDQyxZQUFMLENBQWtCSixPQUFsQixDQUF0QixDQURnQixHQVBHOztBQVVILFlBQUNHLElBQUQsT0FBT0gsT0FBUCx1RUFBaUIsRUFBakI7QUFDaEIsNkNBQWdCRyxJQUFoQixFQUFzQixLQUFJLENBQUNDLFlBQUwsQ0FBa0JKLE9BQWxCLENBQXRCLENBRGdCLEdBVkc7O0FBYUYsWUFBQ0csSUFBRCxPQUFPSCxPQUFQLHVFQUFpQixFQUFqQjtBQUNqQiw4Q0FBaUJHLElBQWpCLEVBQXVCLEtBQUksQ0FBQ0MsWUFBTCxDQUFrQkosT0FBbEIsQ0FBdkIsQ0FEaUIsR0FiRTs7QUFnQkgsWUFBQ0csSUFBRCxPQUFPSCxPQUFQLHVFQUFpQixFQUFqQjtBQUNoQiw2Q0FBZ0JHLElBQWhCLEVBQXNCLEtBQUksQ0FBQ0MsWUFBTCxDQUFrQkosT0FBbEIsQ0FBdEIsQ0FEZ0IsR0FoQkc7O0FBbUJBLFlBQUNHLElBQUQsT0FBT0gsT0FBUCx1RUFBaUIsRUFBakI7QUFDbkIsZ0RBQW1CRyxJQUFuQixFQUF5QixLQUFJLENBQUNDLFlBQUwsQ0FBa0JKLE9BQWxCLENBQXpCLENBRG1CLEdBbkJBOztBQXNCRixZQUFDRyxJQUFELE9BQU9FLGFBQVAsdUVBQXVCLEVBQXZCLEtBQTJCTCxPQUEzQix1RUFBcUMsRUFBckM7QUFDakIscUNBQWlCRyxJQUFqQixFQUF1QkUsYUFBdkIsRUFBc0MsS0FBSSxDQUFDRCxZQUFMLENBQWtCSixPQUFsQixDQUF0QyxDQURpQixHQXRCRTs7QUF5QkQsbUJBQUNNLFFBQUQsdUVBQVksRUFBWjtBQUNsQixzQ0FBa0JBLFFBQWxCLENBRGtCLEdBekJDOztBQTRCQTtBQUNuQix3Q0FEbUIsR0E1QkE7O0FBK0JFLG1CQUFDTixPQUFELHVFQUFXLEVBQVg7QUFDckIseUNBQXFCLEtBQUksQ0FBQ0EsT0FBMUIsRUFBbUNBLE9BQW5DLENBRHFCLEdBL0JGLEVBQ25CLEtBQUtBLE9BQUwsR0FBZUMsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQm5CLGVBQWxCLEVBQW1DaUIsUUFBbkMsQ0FBZixDQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlSW9BY3Rpb25zIGZyb20gJy4vYWN0aW9ucy9jcmVhdGVJb0FjdGlvbnMnO1xyXG5pbXBvcnQgeyBjcmVhdGVHZXRBY3Rpb24sIGNyZWF0ZVBvc3RBY3Rpb24sIGNyZWF0ZVB1dEFjdGlvbiwgY3JlYXRlRGVsZXRlQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb25zL2NyZWF0ZUNydWRBY3Rpb24nO1xyXG5pbXBvcnQgY3JlYXRlSW9SZWR1Y2VycyBmcm9tICcuL3JlZHVjZXJzL2NyZWF0ZUlvUmVkdWNlcnMnO1xyXG5pbXBvcnQgY3JlYXRlUm9vdFJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycy9jcmVhdGVSb290UmVkdWNlcic7XHJcbmltcG9ydCBjcmVhdGVJbml0aWFsU3RhdGUgZnJvbSAnLi9saWIvY3JlYXRlSW5pdGlhbFN0YXRlJztcclxuaW1wb3J0IGNyZWF0ZU9mZmxpbmVPcHRpb25zIGZyb20gJy4vb2ZmbGluZS9jcmVhdGVPZmZsaW5lT3B0aW9ucyc7XHJcblxyXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XHJcbiAga2V5TmFtZTogJ2lkJyxcclxuICBhZGRLZXlPbkNyZWF0ZTogZmFsc2UsXHJcbiAgcmV3cml0ZU9uVXBkYXRlOiB0cnVlLFxyXG4gIHNvY2tldEV2ZW50TmFtZTogJ3JlZHV4X2FjdGlvbl9ldmVudCcsXHJcbiAgc29ja2V0OiBudWxsLFxyXG4gIHRyYW5zcG9ydDogJ2ZldGNoJyxcclxuICB2aXJ0dWFsRmllbGRzTmFtZTogJ3ZpcnR1YWxGaWVsZHMnLFxyXG4gIGxvY2FsRmllbGRzTmFtZTogJ2xvY2FsRmllbGRzJyxcclxuICB1dWlkT3B0aW9uczoge30sXHJcbiAgdXVpZFZlcnNpb246ICd2NCcsXHJcbiAgYWN0aW9uSW5qZWN0OiAoYWN0aW9uKSA9PiBhY3Rpb24sXHJcbiAgdmFsaWRhdGlvbkhvb2s6IG51bGwsXHJcbiAgY3JlYXRlS2V5OiBudWxsLFxyXG4gIHNjaGVtYXM6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWR1eHdvcmsge1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2VPcHRpb25zID0gKG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gIGNyZWF0ZUlvQWN0aW9ucyA9IChuYW1lLCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVJb0FjdGlvbnMobmFtZSwgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucykpO1xyXG5cclxuICBjcmVhdGVHZXRBY3Rpb24gPSAobmFtZSwgb3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlR2V0QWN0aW9uKG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgY3JlYXRlUG9zdEFjdGlvbiA9IChuYW1lLCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVQb3N0QWN0aW9uKG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgY3JlYXRlUHV0QWN0aW9uID0gKG5hbWUsIG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZVB1dEFjdGlvbihuYW1lLCB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zKSk7XHJcblxyXG4gIGNyZWF0ZURlbGV0ZUFjdGlvbiA9IChuYW1lLCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVEZWxldGVBY3Rpb24obmFtZSwgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucykpO1xyXG5cclxuICBjcmVhdGVJb1JlZHVjZXJzID0gKG5hbWUsIGN1c3RvbUFjdGlvbnMgPSB7fSwgb3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlSW9SZWR1Y2VycyhuYW1lLCBjdXN0b21BY3Rpb25zLCB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zKSk7XHJcblxyXG4gIGNyZWF0ZVJvb3RSZWR1Y2VyID0gKHJlZHVjZXJzID0gW10pID0+XHJcbiAgICBjcmVhdGVSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcblxyXG4gIGNyZWF0ZUluaXRpYWxTdGF0ZSA9ICgpID0+XHJcbiAgICBjcmVhdGVJbml0aWFsU3RhdGUoKTtcclxuXHJcbiAgY3JlYXRlT2ZmbGluZU9wdGlvbnMgPSAob3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlT2ZmbGluZU9wdGlvbnModGhpcy5vcHRpb25zLCBvcHRpb25zKTtcclxufSJdfQ==