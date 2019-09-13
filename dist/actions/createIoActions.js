"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createIoActions;var _createAction = require("../lib/createAction");
var _constants = require("../lib/constants");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function createIoActions(name, options) {var _ref;
  return _ref = {}, _defineProperty(_ref, "clear".concat(
  name), function clear() {
    return (0, _createAction.createAction)(
    Object.assign({}, options, { transport: _constants.TransportMethodEnum.REDUX }),
    _constants.ActionOperationEnum.CLEAR,
    name);

  }), _defineProperty(_ref, "reset".concat(
  name), function reset() {
    return (0, _createAction.createAction)(
    Object.assign({}, options, { transport: _constants.TransportMethodEnum.REDUX }),
    _constants.ActionOperationEnum.RESET,
    name);

  }), _defineProperty(_ref, "select".concat(
  name), function select(data) {
    return (0, _createAction.createAction)(
    Object.assign({}, options, { transport: _constants.TransportMethodEnum.REDUX }),
    _constants.ActionOperationEnum.SELECT,
    name,
    data);

  }), _defineProperty(_ref, "find".concat(
  name), function find(data) {
    return (0, _createAction.createAction)(
    options,
    _constants.ActionOperationEnum.FIND,
    name,
    data);

  }), _defineProperty(_ref, "sync".concat(
  name), function sync(data) {
    return (0, _createAction.createAction)(
    options,
    _constants.ActionOperationEnum.SYNC,
    name,
    data);


  }), _defineProperty(_ref, "create".concat(
  name), function create(data) {
    return (0, _createAction.createAction)(
    options,
    _constants.ActionOperationEnum.CREATE,
    name,
    data);

  }), _defineProperty(_ref, "update".concat(
  name), function update(data) {
    return (0, _createAction.createAction)(
    options,
    _constants.ActionOperationEnum.UPDATE,
    name,
    data);

  }), _defineProperty(_ref, "destroy".concat(
  name), function destroy(data) {
    return (0, _createAction.createAction)(
    options,
    _constants.ActionOperationEnum.DESTROY,
    name,
    data);

  }), _ref;

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2NyZWF0ZUlvQWN0aW9ucy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVJb0FjdGlvbnMiLCJuYW1lIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsInRyYW5zcG9ydCIsIlRyYW5zcG9ydE1ldGhvZEVudW0iLCJSRURVWCIsIkFjdGlvbk9wZXJhdGlvbkVudW0iLCJDTEVBUiIsIlJFU0VUIiwiZGF0YSIsIlNFTEVDVCIsIkZJTkQiLCJTWU5DIiwiQ1JFQVRFIiwiVVBEQVRFIiwiREVTVFJPWSJdLCJtYXBwaW5ncyI6IjZHQUFBO0FBQ0EsNkM7O0FBRWUsU0FBU0EsZUFBVCxDQUF5QkMsSUFBekIsRUFBK0JDLE9BQS9CLEVBQXdDO0FBQ3JEO0FBQ1dELEVBQUFBLElBRFgsb0JBQ3FCO0FBQ2pCLFdBQU87QUFDTEUsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkYsT0FBbEIsRUFBMkIsRUFBRUcsU0FBUyxFQUFFQywrQkFBb0JDLEtBQWpDLEVBQTNCLENBREs7QUFFTEMsbUNBQW9CQyxLQUZmO0FBR0xSLElBQUFBLElBSEssQ0FBUDs7QUFLRCxHQVBIO0FBUVdBLEVBQUFBLElBUlgsb0JBUXFCO0FBQ2pCLFdBQU87QUFDTEUsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkYsT0FBbEIsRUFBMkIsRUFBRUcsU0FBUyxFQUFFQywrQkFBb0JDLEtBQWpDLEVBQTNCLENBREs7QUFFTEMsbUNBQW9CRSxLQUZmO0FBR0xULElBQUFBLElBSEssQ0FBUDs7QUFLRCxHQWRIO0FBZVlBLEVBQUFBLElBZlosbUJBZW9CVSxJQWZwQixFQWUwQjtBQUN0QixXQUFPO0FBQ0xSLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JGLE9BQWxCLEVBQTJCLEVBQUVHLFNBQVMsRUFBRUMsK0JBQW9CQyxLQUFqQyxFQUEzQixDQURLO0FBRUxDLG1DQUFvQkksTUFGZjtBQUdMWCxJQUFBQSxJQUhLO0FBSUxVLElBQUFBLElBSkssQ0FBUDs7QUFNRCxHQXRCSDtBQXVCVVYsRUFBQUEsSUF2QlYsaUJBdUJrQlUsSUF2QmxCLEVBdUJ3QjtBQUNwQixXQUFPO0FBQ0xULElBQUFBLE9BREs7QUFFTE0sbUNBQW9CSyxJQUZmO0FBR0xaLElBQUFBLElBSEs7QUFJTFUsSUFBQUEsSUFKSyxDQUFQOztBQU1ELEdBOUJIO0FBK0JVVixFQUFBQSxJQS9CVixpQkErQmtCVSxJQS9CbEIsRUErQndCO0FBQ3BCLFdBQU87QUFDTFQsSUFBQUEsT0FESztBQUVMTSxtQ0FBb0JNLElBRmY7QUFHTGIsSUFBQUEsSUFISztBQUlMVSxJQUFBQSxJQUpLLENBQVA7OztBQU9ELEdBdkNIO0FBd0NZVixFQUFBQSxJQXhDWixtQkF3Q29CVSxJQXhDcEIsRUF3QzBCO0FBQ3RCLFdBQU87QUFDTFQsSUFBQUEsT0FESztBQUVMTSxtQ0FBb0JPLE1BRmY7QUFHTGQsSUFBQUEsSUFISztBQUlMVSxJQUFBQSxJQUpLLENBQVA7O0FBTUQsR0EvQ0g7QUFnRFlWLEVBQUFBLElBaERaLG1CQWdEb0JVLElBaERwQixFQWdEMEI7QUFDdEIsV0FBTztBQUNMVCxJQUFBQSxPQURLO0FBRUxNLG1DQUFvQlEsTUFGZjtBQUdMZixJQUFBQSxJQUhLO0FBSUxVLElBQUFBLElBSkssQ0FBUDs7QUFNRCxHQXZESDtBQXdEYVYsRUFBQUEsSUF4RGIsb0JBd0RxQlUsSUF4RHJCLEVBd0QyQjtBQUN2QixXQUFPO0FBQ0xULElBQUFBLE9BREs7QUFFTE0sbUNBQW9CUyxPQUZmO0FBR0xoQixJQUFBQSxJQUhLO0FBSUxVLElBQUFBLElBSkssQ0FBUDs7QUFNRCxHQS9ESDs7QUFpRUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24gfSBmcm9tICcuLi9saWIvY3JlYXRlQWN0aW9uJztcclxuaW1wb3J0IHsgQWN0aW9uT3BlcmF0aW9uRW51bSwgVHJhbnNwb3J0TWV0aG9kRW51bSB9IGZyb20gJy4uL2xpYi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSW9BY3Rpb25zKG5hbWUsIG9wdGlvbnMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgW2BjbGVhciR7bmFtZX1gXSgpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihcclxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IHRyYW5zcG9ydDogVHJhbnNwb3J0TWV0aG9kRW51bS5SRURVWCB9KSxcclxuICAgICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLkNMRUFSLFxyXG4gICAgICAgIG5hbWVcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBbYHJlc2V0JHtuYW1lfWBdKCkge1xyXG4gICAgICByZXR1cm4gY3JlYXRlQWN0aW9uKFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgdHJhbnNwb3J0OiBUcmFuc3BvcnRNZXRob2RFbnVtLlJFRFVYIH0pLFxyXG4gICAgICAgIEFjdGlvbk9wZXJhdGlvbkVudW0uUkVTRVQsXHJcbiAgICAgICAgbmFtZVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgc2VsZWN0JHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihcclxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IHRyYW5zcG9ydDogVHJhbnNwb3J0TWV0aG9kRW51bS5SRURVWCB9KSxcclxuICAgICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLlNFTEVDVCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGRhdGFcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBbYGZpbmQke25hbWV9YF0oZGF0YSkge1xyXG4gICAgICByZXR1cm4gY3JlYXRlQWN0aW9uKFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgQWN0aW9uT3BlcmF0aW9uRW51bS5GSU5ELFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgc3luYyR7bmFtZX1gXShkYXRhKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24oXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLlNZTkMsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkYXRhXHJcbiAgICAgICk7XHJcblxyXG4gICAgfSxcclxuICAgIFtgY3JlYXRlJHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihcclxuICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgIEFjdGlvbk9wZXJhdGlvbkVudW0uQ1JFQVRFLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgdXBkYXRlJHtuYW1lfWBdKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihcclxuICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgIEFjdGlvbk9wZXJhdGlvbkVudW0uVVBEQVRFLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtgZGVzdHJveSR7bmFtZX1gXShkYXRhKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24oXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLkRFU1RST1ksXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkYXRhXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxufSJdfQ==