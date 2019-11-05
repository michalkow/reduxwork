"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createDeleteAction = exports.createPutAction = exports.createPostAction = exports.createGetAction = void 0;var _buildAction = require("./buildAction");
var _constants = require("../lib/constants");

var createGetAction = function createGetAction(name, options) {return (
    function (data) {
      return (0, _buildAction.buildAction)(
      options,
      _constants.ActionOperationEnum.GET,
      name,
      data,
      name);

    });};exports.createGetAction = createGetAction;

var createPostAction = function createPostAction(name, options) {return (
    function (data) {
      return (0, _buildAction.buildAction)(
      options,
      _constants.ActionOperationEnum.POST,
      name,
      data,
      name);

    });};exports.createPostAction = createPostAction;

var createPutAction = function createPutAction(name, options) {return (
    function (data) {
      return (0, _buildAction.buildAction)(
      options,
      _constants.ActionOperationEnum.PUT,
      name,
      data,
      name);

    });};exports.createPutAction = createPutAction;

var createDeleteAction = function createDeleteAction(name, options) {return (
    function (data) {
      return (0, _buildAction.buildAction)(
      options,
      _constants.ActionOperationEnum.DELETE,
      name,
      data,
      name);

    });};exports.createDeleteAction = createDeleteAction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hY3Rpb25zL2NyZWF0ZUNydWRBY3Rpb24uanMiXSwibmFtZXMiOlsiY3JlYXRlR2V0QWN0aW9uIiwibmFtZSIsIm9wdGlvbnMiLCJkYXRhIiwiQWN0aW9uT3BlcmF0aW9uRW51bSIsIkdFVCIsImNyZWF0ZVBvc3RBY3Rpb24iLCJQT1NUIiwiY3JlYXRlUHV0QWN0aW9uIiwiUFVUIiwiY3JlYXRlRGVsZXRlQWN0aW9uIiwiREVMRVRFIl0sIm1hcHBpbmdzIjoiOExBQUE7QUFDQTs7QUFFTyxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLElBQUQsRUFBT0MsT0FBUDtBQUM3QixjQUFDQyxJQUFELEVBQVU7QUFDUixhQUFPO0FBQ0xELE1BQUFBLE9BREs7QUFFTEUscUNBQW9CQyxHQUZmO0FBR0xKLE1BQUFBLElBSEs7QUFJTEUsTUFBQUEsSUFKSztBQUtMRixNQUFBQSxJQUxLLENBQVA7O0FBT0QsS0FUNEIsR0FBeEIsQzs7QUFXQSxJQUFNSyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNMLElBQUQsRUFBT0MsT0FBUDtBQUM5QixjQUFDQyxJQUFELEVBQVU7QUFDUixhQUFPO0FBQ0xELE1BQUFBLE9BREs7QUFFTEUscUNBQW9CRyxJQUZmO0FBR0xOLE1BQUFBLElBSEs7QUFJTEUsTUFBQUEsSUFKSztBQUtMRixNQUFBQSxJQUxLLENBQVA7O0FBT0QsS0FUNkIsR0FBekIsQzs7QUFXQSxJQUFNTyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNQLElBQUQsRUFBT0MsT0FBUDtBQUM3QixjQUFDQyxJQUFELEVBQVU7QUFDUixhQUFPO0FBQ0xELE1BQUFBLE9BREs7QUFFTEUscUNBQW9CSyxHQUZmO0FBR0xSLE1BQUFBLElBSEs7QUFJTEUsTUFBQUEsSUFKSztBQUtMRixNQUFBQSxJQUxLLENBQVA7O0FBT0QsS0FUNEIsR0FBeEIsQzs7QUFXQSxJQUFNUyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUNULElBQUQsRUFBT0MsT0FBUDtBQUNoQyxjQUFDQyxJQUFELEVBQVU7QUFDUixhQUFPO0FBQ0xELE1BQUFBLE9BREs7QUFFTEUscUNBQW9CTyxNQUZmO0FBR0xWLE1BQUFBLElBSEs7QUFJTEUsTUFBQUEsSUFKSztBQUtMRixNQUFBQSxJQUxLLENBQVA7O0FBT0QsS0FUK0IsR0FBM0IsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkQWN0aW9uIH0gZnJvbSAnLi9idWlsZEFjdGlvbic7XHJcbmltcG9ydCB7IEFjdGlvbk9wZXJhdGlvbkVudW0gfSBmcm9tICcuLi9saWIvY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVHZXRBY3Rpb24gPSAobmFtZSwgb3B0aW9ucykgPT5cclxuICAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLkdFVCxcclxuICAgICAgbmFtZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgbmFtZVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBvc3RBY3Rpb24gPSAobmFtZSwgb3B0aW9ucykgPT5cclxuICAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLlBPU1QsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIG5hbWVcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVQdXRBY3Rpb24gPSAobmFtZSwgb3B0aW9ucykgPT5cclxuICAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBBY3Rpb25PcGVyYXRpb25FbnVtLlBVVCxcclxuICAgICAgbmFtZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgbmFtZVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGV0ZUFjdGlvbiA9IChuYW1lLCBvcHRpb25zKSA9PlxyXG4gIChkYXRhKSA9PiB7XHJcbiAgICByZXR1cm4gYnVpbGRBY3Rpb24oXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIEFjdGlvbk9wZXJhdGlvbkVudW0uREVMRVRFLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBuYW1lXHJcbiAgICApO1xyXG4gIH07Il19