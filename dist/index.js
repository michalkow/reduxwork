"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _exportNames = {};exports.default = void 0;var _createIoActions = _interopRequireDefault(require("./actions/createIoActions"));
var _createCrudAction = require("./actions/createCrudAction");
var _createIoReducers = _interopRequireWildcard(require("./reducers/createIoReducers"));
var _createRootReducer = _interopRequireDefault(require("./reducers/createRootReducer"));
var _createInitialState = _interopRequireDefault(require("./lib/createInitialState"));
var _createOfflineOptions = _interopRequireDefault(require("./offline/createOfflineOptions"));


























































var _stateOperations = require("./reducers/stateOperations");Object.keys(_stateOperations).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;Object.defineProperty(exports, key, { enumerable: true, get: function get() {return _stateOperations[key];} });});function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var DEFAULT_OPTIONS = { keyName: 'id', addKeyOnCreate: false, rewriteOnUpdate: true, socketEventName: 'redux_action_event', socket: null, transport: 'fetch', virtualFieldsName: 'virtualFields', localFieldsName: 'localFields', uuidOptions: {}, uuidVersion: 'v4', actionInject: function actionInject(action) {return action;}, validationHook: null, createKey: null, schemas: {} };var Reduxwork = function Reduxwork(_options) {var _this = this;_classCallCheck(this, Reduxwork);_defineProperty(this, "mergeOptions", function () {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return Object.assign({}, _this.options, options);});_defineProperty(this, "createIoActions", function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (0, _createIoActions.default)(name, _this.mergeOptions(options));});_defineProperty(this, "createGetAction", function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (0, _createCrudAction.createGetAction)(name, _this.mergeOptions(options));});_defineProperty(this, "createPostAction", function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (0, _createCrudAction.createPostAction)(name, _this.mergeOptions(options));});_defineProperty(this, "createPutAction", function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (0, _createCrudAction.createPutAction)(name, _this.mergeOptions(options));});_defineProperty(this, "createDeleteAction", function (name) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (0, _createCrudAction.createDeleteAction)(name, _this.mergeOptions(options));});_defineProperty(this, "createIoReducers", function (name) {var customActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return (0, _createIoReducers.default)(name, customActions, _this.mergeOptions(options));});_defineProperty(this, "createRootReducer", function () {var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];return (0, _createRootReducer.default)(reducers);});_defineProperty(this, "createInitialState", function () {return (0, _createInitialState.default)();});_defineProperty(this, "createOfflineOptions", function () {var transportOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return (0, _createOfflineOptions.default)(_this.options, transportOptions, options);});_defineProperty(this, "normalizeToEntities", function (data, name, options) {return (0, _createIoReducers.normalizeToEntities)(data, name, _this.mergeOptions(options));});this.options = Object.assign({}, DEFAULT_OPTIONS, _options);};exports.default = Reduxwork;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX09QVElPTlMiLCJrZXlOYW1lIiwiYWRkS2V5T25DcmVhdGUiLCJyZXdyaXRlT25VcGRhdGUiLCJzb2NrZXRFdmVudE5hbWUiLCJzb2NrZXQiLCJ0cmFuc3BvcnQiLCJ2aXJ0dWFsRmllbGRzTmFtZSIsImxvY2FsRmllbGRzTmFtZSIsInV1aWRPcHRpb25zIiwidXVpZFZlcnNpb24iLCJhY3Rpb25JbmplY3QiLCJhY3Rpb24iLCJ2YWxpZGF0aW9uSG9vayIsImNyZWF0ZUtleSIsInNjaGVtYXMiLCJSZWR1eHdvcmsiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwibmFtZSIsIm1lcmdlT3B0aW9ucyIsImN1c3RvbUFjdGlvbnMiLCJyZWR1Y2VycyIsInRyYW5zcG9ydE9wdGlvbnMiLCJkYXRhIl0sIm1hcHBpbmdzIjoiMEhBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJEQSwrVixnNEJBekRBLElBQU1BLGVBQWUsR0FBRyxFQUN0QkMsT0FBTyxFQUFFLElBRGEsRUFFdEJDLGNBQWMsRUFBRSxLQUZNLEVBR3RCQyxlQUFlLEVBQUUsSUFISyxFQUl0QkMsZUFBZSxFQUFFLG9CQUpLLEVBS3RCQyxNQUFNLEVBQUUsSUFMYyxFQU10QkMsU0FBUyxFQUFFLE9BTlcsRUFPdEJDLGlCQUFpQixFQUFFLGVBUEcsRUFRdEJDLGVBQWUsRUFBRSxhQVJLLEVBU3RCQyxXQUFXLEVBQUUsRUFUUyxFQVV0QkMsV0FBVyxFQUFFLElBVlMsRUFXdEJDLFlBQVksRUFBRSxzQkFBQ0MsTUFBRCxVQUFZQSxNQUFaLEVBWFEsRUFZdEJDLGNBQWMsRUFBRSxJQVpNLEVBYXRCQyxTQUFTLEVBQUUsSUFiVyxFQWN0QkMsT0FBTyxFQUFFLEVBZGEsRUFBeEIsQyxJQWlCcUJDLFMsR0FFbkIsbUJBQVlDLFFBQVosRUFBcUIseUZBSU4saUJBQUNBLE9BQUQsdUVBQVcsRUFBWCxRQUNiQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUksQ0FBQ0YsT0FBdkIsRUFBZ0NBLE9BQWhDLENBRGEsRUFKTSwyQ0FPSCxVQUFDRyxJQUFELE9BQU9ILE9BQVAsdUVBQWlCLEVBQWpCLFFBQ2hCLDhCQUFnQkcsSUFBaEIsRUFBc0IsS0FBSSxDQUFDQyxZQUFMLENBQWtCSixPQUFsQixDQUF0QixDQURnQixFQVBHLDJDQVVILFVBQUNHLElBQUQsT0FBT0gsT0FBUCx1RUFBaUIsRUFBakIsUUFDaEIsdUNBQWdCRyxJQUFoQixFQUFzQixLQUFJLENBQUNDLFlBQUwsQ0FBa0JKLE9BQWxCLENBQXRCLENBRGdCLEVBVkcsNENBYUYsVUFBQ0csSUFBRCxPQUFPSCxPQUFQLHVFQUFpQixFQUFqQixRQUNqQix3Q0FBaUJHLElBQWpCLEVBQXVCLEtBQUksQ0FBQ0MsWUFBTCxDQUFrQkosT0FBbEIsQ0FBdkIsQ0FEaUIsRUFiRSwyQ0FnQkgsVUFBQ0csSUFBRCxPQUFPSCxPQUFQLHVFQUFpQixFQUFqQixRQUNoQix1Q0FBZ0JHLElBQWhCLEVBQXNCLEtBQUksQ0FBQ0MsWUFBTCxDQUFrQkosT0FBbEIsQ0FBdEIsQ0FEZ0IsRUFoQkcsOENBbUJBLFVBQUNHLElBQUQsT0FBT0gsT0FBUCx1RUFBaUIsRUFBakIsUUFDbkIsMENBQW1CRyxJQUFuQixFQUF5QixLQUFJLENBQUNDLFlBQUwsQ0FBa0JKLE9BQWxCLENBQXpCLENBRG1CLEVBbkJBLDRDQXNCRixVQUFDRyxJQUFELE9BQU9FLGFBQVAsdUVBQXVCLEVBQXZCLEtBQTJCTCxPQUEzQix1RUFBcUMsRUFBckMsUUFDakIsK0JBQWlCRyxJQUFqQixFQUF1QkUsYUFBdkIsRUFBc0MsS0FBSSxDQUFDRCxZQUFMLENBQWtCSixPQUFsQixDQUF0QyxDQURpQixFQXRCRSw2Q0F5QkQsaUJBQUNNLFFBQUQsdUVBQVksRUFBWixRQUNsQixnQ0FBa0JBLFFBQWxCLENBRGtCLEVBekJDLDhDQTRCQSxvQkFDbkIsa0NBRG1CLEVBNUJBLGdEQStCRSxpQkFBQ0MsZ0JBQUQsdUVBQW9CLEVBQXBCLEtBQXdCUCxPQUF4Qix1RUFBa0MsRUFBbEMsUUFDckIsbUNBQXFCLEtBQUksQ0FBQ0EsT0FBMUIsRUFBbUNPLGdCQUFuQyxFQUFxRFAsT0FBckQsQ0FEcUIsRUEvQkYsK0NBa0NDLFVBQUNRLElBQUQsRUFBT0wsSUFBUCxFQUFhSCxPQUFiLFVBQ3BCLDJDQUFvQlEsSUFBcEIsRUFBMEJMLElBQTFCLEVBQWdDLEtBQUksQ0FBQ0MsWUFBTCxDQUFrQkosT0FBbEIsQ0FBaEMsQ0FEb0IsRUFsQ0QsRUFDbkIsS0FBS0EsT0FBTCxHQUFlQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCbkIsZUFBbEIsRUFBbUNpQixRQUFuQyxDQUFmLENBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVJb0FjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL2NyZWF0ZUlvQWN0aW9ucyc7XHJcbmltcG9ydCB7IGNyZWF0ZUdldEFjdGlvbiwgY3JlYXRlUG9zdEFjdGlvbiwgY3JlYXRlUHV0QWN0aW9uLCBjcmVhdGVEZWxldGVBY3Rpb24gfSBmcm9tICcuL2FjdGlvbnMvY3JlYXRlQ3J1ZEFjdGlvbic7XHJcbmltcG9ydCBjcmVhdGVJb1JlZHVjZXJzLCB7IG5vcm1hbGl6ZVRvRW50aXRpZXMgfSBmcm9tICcuL3JlZHVjZXJzL2NyZWF0ZUlvUmVkdWNlcnMnO1xyXG5pbXBvcnQgY3JlYXRlUm9vdFJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycy9jcmVhdGVSb290UmVkdWNlcic7XHJcbmltcG9ydCBjcmVhdGVJbml0aWFsU3RhdGUgZnJvbSAnLi9saWIvY3JlYXRlSW5pdGlhbFN0YXRlJztcclxuaW1wb3J0IGNyZWF0ZU9mZmxpbmVPcHRpb25zIGZyb20gJy4vb2ZmbGluZS9jcmVhdGVPZmZsaW5lT3B0aW9ucyc7XHJcblxyXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XHJcbiAga2V5TmFtZTogJ2lkJyxcclxuICBhZGRLZXlPbkNyZWF0ZTogZmFsc2UsXHJcbiAgcmV3cml0ZU9uVXBkYXRlOiB0cnVlLFxyXG4gIHNvY2tldEV2ZW50TmFtZTogJ3JlZHV4X2FjdGlvbl9ldmVudCcsXHJcbiAgc29ja2V0OiBudWxsLFxyXG4gIHRyYW5zcG9ydDogJ2ZldGNoJyxcclxuICB2aXJ0dWFsRmllbGRzTmFtZTogJ3ZpcnR1YWxGaWVsZHMnLFxyXG4gIGxvY2FsRmllbGRzTmFtZTogJ2xvY2FsRmllbGRzJyxcclxuICB1dWlkT3B0aW9uczoge30sXHJcbiAgdXVpZFZlcnNpb246ICd2NCcsXHJcbiAgYWN0aW9uSW5qZWN0OiAoYWN0aW9uKSA9PiBhY3Rpb24sXHJcbiAgdmFsaWRhdGlvbkhvb2s6IG51bGwsXHJcbiAgY3JlYXRlS2V5OiBudWxsLFxyXG4gIHNjaGVtYXM6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWR1eHdvcmsge1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2VPcHRpb25zID0gKG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gIGNyZWF0ZUlvQWN0aW9ucyA9IChuYW1lLCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVJb0FjdGlvbnMobmFtZSwgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucykpO1xyXG5cclxuICBjcmVhdGVHZXRBY3Rpb24gPSAobmFtZSwgb3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlR2V0QWN0aW9uKG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgY3JlYXRlUG9zdEFjdGlvbiA9IChuYW1lLCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVQb3N0QWN0aW9uKG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxuXHJcbiAgY3JlYXRlUHV0QWN0aW9uID0gKG5hbWUsIG9wdGlvbnMgPSB7fSkgPT5cclxuICAgIGNyZWF0ZVB1dEFjdGlvbihuYW1lLCB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zKSk7XHJcblxyXG4gIGNyZWF0ZURlbGV0ZUFjdGlvbiA9IChuYW1lLCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVEZWxldGVBY3Rpb24obmFtZSwgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucykpO1xyXG5cclxuICBjcmVhdGVJb1JlZHVjZXJzID0gKG5hbWUsIGN1c3RvbUFjdGlvbnMgPSB7fSwgb3B0aW9ucyA9IHt9KSA9PlxyXG4gICAgY3JlYXRlSW9SZWR1Y2VycyhuYW1lLCBjdXN0b21BY3Rpb25zLCB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zKSk7XHJcblxyXG4gIGNyZWF0ZVJvb3RSZWR1Y2VyID0gKHJlZHVjZXJzID0gW10pID0+XHJcbiAgICBjcmVhdGVSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcblxyXG4gIGNyZWF0ZUluaXRpYWxTdGF0ZSA9ICgpID0+XHJcbiAgICBjcmVhdGVJbml0aWFsU3RhdGUoKTtcclxuXHJcbiAgY3JlYXRlT2ZmbGluZU9wdGlvbnMgPSAodHJhbnNwb3J0T3B0aW9ucyA9IHt9LCBvcHRpb25zID0ge30pID0+XHJcbiAgICBjcmVhdGVPZmZsaW5lT3B0aW9ucyh0aGlzLm9wdGlvbnMsIHRyYW5zcG9ydE9wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuICBub3JtYWxpemVUb0VudGl0aWVzID0gKGRhdGEsIG5hbWUsIG9wdGlvbnMpID0+XHJcbiAgICBub3JtYWxpemVUb0VudGl0aWVzKGRhdGEsIG5hbWUsIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMpKTtcclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9yZWR1Y2Vycy9zdGF0ZU9wZXJhdGlvbnMnOyJdfQ==