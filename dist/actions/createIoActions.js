"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createIoActions;var _buildAction = require("./buildAction");
var _constants = require("../lib/constants");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function createIoActions(name, options) {var _ref;
  return _ref = {}, _defineProperty(_ref, "clear".concat(
  name), function clear() {
    return {
      type: (0, _buildAction.buildActionType)(options, _constants.ActionOperationEnum.CLEAR, name) };

  }), _defineProperty(_ref, "reset".concat(
  name), function reset() {
    return {
      type: (0, _buildAction.buildActionType)(options, _constants.ActionOperationEnum.RESET, name) };

  }), _defineProperty(_ref, "select".concat(
  name), function select(data) {
    return {
      type: (0, _buildAction.buildActionType)(options, _constants.ActionOperationEnum.SELECT, name),
      data: data };

  }), _defineProperty(_ref, "find".concat(
  name), function find(data) {
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.FIND,
    name,
    data);

  }), _defineProperty(_ref, "sync".concat(
  name), function sync(data) {
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.SYNC,
    name,
    data);


  }), _defineProperty(_ref, "create".concat(
  name), function create(data) {
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.CREATE,
    name,
    data);

  }), _defineProperty(_ref, "update".concat(
  name), function update(data) {
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.UPDATE,
    name,
    data);

  }), _defineProperty(_ref, "destroy".concat(
  name), function destroy(data) {
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.DESTROY,
    name,
    data);

  }), _ref;

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hY3Rpb25zL2NyZWF0ZUlvQWN0aW9ucy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVJb0FjdGlvbnMiLCJuYW1lIiwib3B0aW9ucyIsInR5cGUiLCJBY3Rpb25PcGVyYXRpb25FbnVtIiwiQ0xFQVIiLCJSRVNFVCIsImRhdGEiLCJTRUxFQ1QiLCJGSU5EIiwiU1lOQyIsIkNSRUFURSIsIlVQREFURSIsIkRFU1RST1kiXSwibWFwcGluZ3MiOiI2R0FBQTtBQUNBLDZDOztBQUVlLFNBQVNBLGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCQyxPQUEvQixFQUF3QztBQUNyRDtBQUNXRCxFQUFBQSxJQURYLG9CQUNxQjtBQUNqQixXQUFPO0FBQ0xFLE1BQUFBLElBQUksRUFBRSxrQ0FBZ0JELE9BQWhCLEVBQXlCRSwrQkFBb0JDLEtBQTdDLEVBQW9ESixJQUFwRCxDQURELEVBQVA7O0FBR0QsR0FMSDtBQU1XQSxFQUFBQSxJQU5YLG9CQU1xQjtBQUNqQixXQUFPO0FBQ0xFLE1BQUFBLElBQUksRUFBRSxrQ0FBZ0JELE9BQWhCLEVBQXlCRSwrQkFBb0JFLEtBQTdDLEVBQW9ETCxJQUFwRCxDQURELEVBQVA7O0FBR0QsR0FWSDtBQVdZQSxFQUFBQSxJQVhaLG1CQVdvQk0sSUFYcEIsRUFXMEI7QUFDdEIsV0FBTztBQUNMSixNQUFBQSxJQUFJLEVBQUUsa0NBQWdCRCxPQUFoQixFQUF5QkUsK0JBQW9CSSxNQUE3QyxFQUFxRFAsSUFBckQsQ0FERDtBQUVMTSxNQUFBQSxJQUFJLEVBQUpBLElBRkssRUFBUDs7QUFJRCxHQWhCSDtBQWlCVU4sRUFBQUEsSUFqQlYsaUJBaUJrQk0sSUFqQmxCLEVBaUJ3QjtBQUNwQixXQUFPO0FBQ0xMLElBQUFBLE9BREs7QUFFTEUsbUNBQW9CSyxJQUZmO0FBR0xSLElBQUFBLElBSEs7QUFJTE0sSUFBQUEsSUFKSyxDQUFQOztBQU1ELEdBeEJIO0FBeUJVTixFQUFBQSxJQXpCVixpQkF5QmtCTSxJQXpCbEIsRUF5QndCO0FBQ3BCLFdBQU87QUFDTEwsSUFBQUEsT0FESztBQUVMRSxtQ0FBb0JNLElBRmY7QUFHTFQsSUFBQUEsSUFISztBQUlMTSxJQUFBQSxJQUpLLENBQVA7OztBQU9ELEdBakNIO0FBa0NZTixFQUFBQSxJQWxDWixtQkFrQ29CTSxJQWxDcEIsRUFrQzBCO0FBQ3RCLFdBQU87QUFDTEwsSUFBQUEsT0FESztBQUVMRSxtQ0FBb0JPLE1BRmY7QUFHTFYsSUFBQUEsSUFISztBQUlMTSxJQUFBQSxJQUpLLENBQVA7O0FBTUQsR0F6Q0g7QUEwQ1lOLEVBQUFBLElBMUNaLG1CQTBDb0JNLElBMUNwQixFQTBDMEI7QUFDdEIsV0FBTztBQUNMTCxJQUFBQSxPQURLO0FBRUxFLG1DQUFvQlEsTUFGZjtBQUdMWCxJQUFBQSxJQUhLO0FBSUxNLElBQUFBLElBSkssQ0FBUDs7QUFNRCxHQWpESDtBQWtEYU4sRUFBQUEsSUFsRGIsb0JBa0RxQk0sSUFsRHJCLEVBa0QyQjtBQUN2QixXQUFPO0FBQ0xMLElBQUFBLE9BREs7QUFFTEUsbUNBQW9CUyxPQUZmO0FBR0xaLElBQUFBLElBSEs7QUFJTE0sSUFBQUEsSUFKSyxDQUFQOztBQU1ELEdBekRIOztBQTJERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkQWN0aW9uLCBidWlsZEFjdGlvblR5cGUgfSBmcm9tICcuL2J1aWxkQWN0aW9uJztcclxuaW1wb3J0IHsgQWN0aW9uT3BlcmF0aW9uRW51bSB9IGZyb20gJy4uL2xpYi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSW9BY3Rpb25zKG5hbWUsIG9wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgW2BjbGVhciR7bmFtZX1gXSgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBidWlsZEFjdGlvblR5cGUob3B0aW9ucywgQWN0aW9uT3BlcmF0aW9uRW51bS5DTEVBUiwgbmFtZSlcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBbYHJlc2V0JHtuYW1lfWBdKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGJ1aWxkQWN0aW9uVHlwZShvcHRpb25zLCBBY3Rpb25PcGVyYXRpb25FbnVtLlJFU0VULCBuYW1lKVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIFtgc2VsZWN0JHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBidWlsZEFjdGlvblR5cGUob3B0aW9ucywgQWN0aW9uT3BlcmF0aW9uRW51bS5TRUxFQ1QsIG5hbWUpLFxyXG4gICAgICAgIGRhdGFcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBbYGZpbmQke25hbWV9YF0oZGF0YSkge1xyXG4gICAgICByZXR1cm4gYnVpbGRBY3Rpb24oXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLkZJTkQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkYXRhXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgW2BzeW5jJHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5TWU5DLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgIH0sXHJcbiAgICBbYGNyZWF0ZSR7bmFtZX1gXShkYXRhKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEFjdGlvbihcclxuICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgIEFjdGlvbk9wZXJhdGlvbkVudW0uQ1JFQVRFLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgdXBkYXRlJHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5VUERBVEUsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkYXRhXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgW2BkZXN0cm95JHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5ERVNUUk9ZLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcbn0iXX0=