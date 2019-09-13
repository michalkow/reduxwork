"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var createRootRecucer = function createRootRecucer(reduxworkReducer, combinedReducer) {
  return function (state, action) {
    if (action.reduxwork && reduxworkReducer[action.type])
    return reduxworkReducer[action.type](state, action);else
    if (combinedReducer)
    return combinedReducer(state, action);else

    return state;
  };
};var _default =

createRootRecucer;exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9jcmVhdGVSb290UmVkdWNlci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVSb290UmVjdWNlciIsInJlZHV4d29ya1JlZHVjZXIiLCJjb21iaW5lZFJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInJlZHV4d29yayIsInR5cGUiXSwibWFwcGluZ3MiOiJvR0FBQSxJQUFNQSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLGdCQUFELEVBQW1CQyxlQUFuQixFQUF1QztBQUMvRCxTQUFPLFVBQUNDLEtBQUQsRUFBUUMsTUFBUixFQUFtQjtBQUN4QixRQUFJQSxNQUFNLENBQUNDLFNBQVAsSUFBb0JKLGdCQUFnQixDQUFDRyxNQUFNLENBQUNFLElBQVIsQ0FBeEM7QUFDRSxXQUFPTCxnQkFBZ0IsQ0FBQ0csTUFBTSxDQUFDRSxJQUFSLENBQWhCLENBQThCSCxLQUE5QixFQUFxQ0MsTUFBckMsQ0FBUCxDQURGO0FBRUssUUFBSUYsZUFBSjtBQUNILFdBQU9BLGVBQWUsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLENBQXRCLENBREc7O0FBR0gsV0FBT0QsS0FBUDtBQUNILEdBUEQ7QUFRRCxDQVRELEM7O0FBV2VILGlCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlUm9vdFJlY3VjZXIgPSAocmVkdXh3b3JrUmVkdWNlciwgY29tYmluZWRSZWR1Y2VyKSA9PiB7XHJcbiAgcmV0dXJuIChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICBpZiAoYWN0aW9uLnJlZHV4d29yayAmJiByZWR1eHdvcmtSZWR1Y2VyW2FjdGlvbi50eXBlXSlcclxuICAgICAgcmV0dXJuIHJlZHV4d29ya1JlZHVjZXJbYWN0aW9uLnR5cGVdKHN0YXRlLCBhY3Rpb24pO1xyXG4gICAgZWxzZSBpZiAoY29tYmluZWRSZWR1Y2VyKVxyXG4gICAgICByZXR1cm4gY29tYmluZWRSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvb3RSZWN1Y2VyOyJdfQ==