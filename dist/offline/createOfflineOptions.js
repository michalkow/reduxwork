"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildEffect = _interopRequireDefault(require("./buildEffect"));
var _buildDiscard = _interopRequireDefault(require("./buildDiscard"));
var _buildDetectNetwork = _interopRequireDefault(require("./buildDetectNetwork"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

function _default(reduxWorkOptions, options) {
  var effect = (0, _buildEffect.default)(reduxWorkOptions);
  var discard = (0, _buildDiscard.default)(reduxWorkOptions);
  var detectNetwork = (0, _buildDetectNetwork.default)(reduxWorkOptions);
  return _objectSpread({},
  options, {
    effect: effect,
    discard: discard,
    detectNetwork: detectNetwork });

};exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9vZmZsaW5lL2NyZWF0ZU9mZmxpbmVPcHRpb25zLmpzIl0sIm5hbWVzIjpbInJlZHV4V29ya09wdGlvbnMiLCJvcHRpb25zIiwiZWZmZWN0IiwiZGlzY2FyZCIsImRldGVjdE5ldHdvcmsiXSwibWFwcGluZ3MiOiJvR0FBQTtBQUNBO0FBQ0Esa0Y7O0FBRWUsa0JBQUNBLGdCQUFELEVBQW1CQyxPQUFuQixFQUErQjtBQUM1QyxNQUFNQyxNQUFNLEdBQUcsMEJBQVlGLGdCQUFaLENBQWY7QUFDQSxNQUFNRyxPQUFPLEdBQUcsMkJBQWFILGdCQUFiLENBQWhCO0FBQ0EsTUFBTUksYUFBYSxHQUFHLGlDQUFtQkosZ0JBQW5CLENBQXRCO0FBQ0E7QUFDS0MsRUFBQUEsT0FETDtBQUVFQyxJQUFBQSxNQUFNLEVBQU5BLE1BRkY7QUFHRUMsSUFBQUEsT0FBTyxFQUFQQSxPQUhGO0FBSUVDLElBQUFBLGFBQWEsRUFBYkEsYUFKRjs7QUFNRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkRWZmZWN0IGZyb20gJy4vYnVpbGRFZmZlY3QnO1xyXG5pbXBvcnQgYnVpbGREaXNjYXJkIGZyb20gJy4vYnVpbGREaXNjYXJkJztcclxuaW1wb3J0IGJ1aWxkRGV0ZWN0TmV0d29yayBmcm9tICcuL2J1aWxkRGV0ZWN0TmV0d29yayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocmVkdXhXb3JrT3B0aW9ucywgb3B0aW9ucykgPT4ge1xyXG4gIGNvbnN0IGVmZmVjdCA9IGJ1aWxkRWZmZWN0KHJlZHV4V29ya09wdGlvbnMpO1xyXG4gIGNvbnN0IGRpc2NhcmQgPSBidWlsZERpc2NhcmQocmVkdXhXb3JrT3B0aW9ucyk7XHJcbiAgY29uc3QgZGV0ZWN0TmV0d29yayA9IGJ1aWxkRGV0ZWN0TmV0d29yayhyZWR1eFdvcmtPcHRpb25zKTtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIGVmZmVjdCxcclxuICAgIGRpc2NhcmQsXHJcbiAgICBkZXRlY3ROZXR3b3JrXHJcbiAgfTtcclxufTsiXX0=