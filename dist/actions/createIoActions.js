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
  name), function find() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.FIND,
    name,
    data);

  }), _defineProperty(_ref, "sync".concat(
  name), function sync() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.SYNC,
    name,
    data);


  }), _defineProperty(_ref, "create".concat(
  name), function create() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.CREATE,
    name,
    data);

  }), _defineProperty(_ref, "update".concat(
  name), function update() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.UPDATE,
    name,
    data);

  }), _defineProperty(_ref, "destroy".concat(
  name), function destroy() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return (0, _buildAction.buildAction)(
    options,
    _constants.ActionOperationEnum.DESTROY,
    name,
    data);

  }), _ref;

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hY3Rpb25zL2NyZWF0ZUlvQWN0aW9ucy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVJb0FjdGlvbnMiLCJuYW1lIiwib3B0aW9ucyIsInR5cGUiLCJBY3Rpb25PcGVyYXRpb25FbnVtIiwiQ0xFQVIiLCJSRVNFVCIsImRhdGEiLCJTRUxFQ1QiLCJGSU5EIiwiU1lOQyIsIkNSRUFURSIsIlVQREFURSIsIkRFU1RST1kiXSwibWFwcGluZ3MiOiI2R0FBQTtBQUNBLDZDOztBQUVlLFNBQVNBLGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCQyxPQUEvQixFQUF3QztBQUNyRDtBQUNXRCxFQUFBQSxJQURYLG9CQUNxQjtBQUNqQixXQUFPO0FBQ0xFLE1BQUFBLElBQUksRUFBRSxrQ0FBZ0JELE9BQWhCLEVBQXlCRSwrQkFBb0JDLEtBQTdDLEVBQW9ESixJQUFwRCxDQURELEVBQVA7O0FBR0QsR0FMSDtBQU1XQSxFQUFBQSxJQU5YLG9CQU1xQjtBQUNqQixXQUFPO0FBQ0xFLE1BQUFBLElBQUksRUFBRSxrQ0FBZ0JELE9BQWhCLEVBQXlCRSwrQkFBb0JFLEtBQTdDLEVBQW9ETCxJQUFwRCxDQURELEVBQVA7O0FBR0QsR0FWSDtBQVdZQSxFQUFBQSxJQVhaLG1CQVdvQk0sSUFYcEIsRUFXMEI7QUFDdEIsV0FBTztBQUNMSixNQUFBQSxJQUFJLEVBQUUsa0NBQWdCRCxPQUFoQixFQUF5QkUsK0JBQW9CSSxNQUE3QyxFQUFxRFAsSUFBckQsQ0FERDtBQUVMTSxNQUFBQSxJQUFJLEVBQUpBLElBRkssRUFBUDs7QUFJRCxHQWhCSDtBQWlCVU4sRUFBQUEsSUFqQlYsbUJBaUI2QixLQUFYTSxJQUFXLHVFQUFKLEVBQUk7QUFDekIsV0FBTztBQUNMTCxJQUFBQSxPQURLO0FBRUxFLG1DQUFvQkssSUFGZjtBQUdMUixJQUFBQSxJQUhLO0FBSUxNLElBQUFBLElBSkssQ0FBUDs7QUFNRCxHQXhCSDtBQXlCVU4sRUFBQUEsSUF6QlYsbUJBeUI2QixLQUFYTSxJQUFXLHVFQUFKLEVBQUk7QUFDekIsV0FBTztBQUNMTCxJQUFBQSxPQURLO0FBRUxFLG1DQUFvQk0sSUFGZjtBQUdMVCxJQUFBQSxJQUhLO0FBSUxNLElBQUFBLElBSkssQ0FBUDs7O0FBT0QsR0FqQ0g7QUFrQ1lOLEVBQUFBLElBbENaLHFCQWtDK0IsS0FBWE0sSUFBVyx1RUFBSixFQUFJO0FBQzNCLFdBQU87QUFDTEwsSUFBQUEsT0FESztBQUVMRSxtQ0FBb0JPLE1BRmY7QUFHTFYsSUFBQUEsSUFISztBQUlMTSxJQUFBQSxJQUpLLENBQVA7O0FBTUQsR0F6Q0g7QUEwQ1lOLEVBQUFBLElBMUNaLHFCQTBDK0IsS0FBWE0sSUFBVyx1RUFBSixFQUFJO0FBQzNCLFdBQU87QUFDTEwsSUFBQUEsT0FESztBQUVMRSxtQ0FBb0JRLE1BRmY7QUFHTFgsSUFBQUEsSUFISztBQUlMTSxJQUFBQSxJQUpLLENBQVA7O0FBTUQsR0FqREg7QUFrRGFOLEVBQUFBLElBbERiLHNCQWtEZ0MsS0FBWE0sSUFBVyx1RUFBSixFQUFJO0FBQzVCLFdBQU87QUFDTEwsSUFBQUEsT0FESztBQUVMRSxtQ0FBb0JTLE9BRmY7QUFHTFosSUFBQUEsSUFISztBQUlMTSxJQUFBQSxJQUpLLENBQVA7O0FBTUQsR0F6REg7O0FBMkREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYnVpbGRBY3Rpb24sIGJ1aWxkQWN0aW9uVHlwZSB9IGZyb20gJy4vYnVpbGRBY3Rpb24nO1xyXG5pbXBvcnQgeyBBY3Rpb25PcGVyYXRpb25FbnVtIH0gZnJvbSAnLi4vbGliL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVJb0FjdGlvbnMobmFtZSwgb3B0aW9ucykge1xyXG4gIHJldHVybiB7XHJcbiAgICBbYGNsZWFyJHtuYW1lfWBdKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGJ1aWxkQWN0aW9uVHlwZShvcHRpb25zLCBBY3Rpb25PcGVyYXRpb25FbnVtLkNMRUFSLCBuYW1lKVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIFtgcmVzZXQke25hbWV9YF0oKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogYnVpbGRBY3Rpb25UeXBlKG9wdGlvbnMsIEFjdGlvbk9wZXJhdGlvbkVudW0uUkVTRVQsIG5hbWUpXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW2BzZWxlY3Qke25hbWV9YF0oZGF0YSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGJ1aWxkQWN0aW9uVHlwZShvcHRpb25zLCBBY3Rpb25PcGVyYXRpb25FbnVtLlNFTEVDVCwgbmFtZSksXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIFtgZmluZCR7bmFtZX1gXShkYXRhID0gW10pIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5GSU5ELFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgc3luYyR7bmFtZX1gXShkYXRhID0gW10pIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5TWU5DLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgIH0sXHJcbiAgICBbYGNyZWF0ZSR7bmFtZX1gXShkYXRhID0gW10pIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5DUkVBVEUsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkYXRhXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgW2B1cGRhdGUke25hbWV9YF0oZGF0YSA9IFtdKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEFjdGlvbihcclxuICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgIEFjdGlvbk9wZXJhdGlvbkVudW0uVVBEQVRFLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgZGVzdHJveSR7bmFtZX1gXShkYXRhID0gW10pIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5ERVNUUk9ZLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcbn0iXX0=