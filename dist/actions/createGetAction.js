"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createSocketGetAction = createSocketGetAction;exports.createFetchGetAction = createFetchGetAction;exports.createGetAction = createGetAction;var _buildAction = _interopRequireDefault(require("./buildAction"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createSocketGetAction() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'GET';
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createFetchGetAction() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'GET';
  config.type = 'fetch';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createGetAction(config, name) {
  if (config.type == 'socket')
  return createSocketGetAction(config, name);
  if (config.type == 'fetch')
  return createFetchGetAction(config, name);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hY3Rpb25zL2NyZWF0ZUdldEFjdGlvbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTb2NrZXRHZXRBY3Rpb24iLCJjb25maWciLCJuYW1lIiwiYWN0aW9uIiwidHlwZSIsImRhdGEiLCJjYiIsImNyZWF0ZUZldGNoR2V0QWN0aW9uIiwiY3JlYXRlR2V0QWN0aW9uIl0sIm1hcHBpbmdzIjoiK05BQUEsb0U7O0FBRU8sU0FBU0EscUJBQVQsR0FBa0QsS0FBbkJDLE1BQW1CLHVFQUFWLEVBQVUsS0FBTkMsSUFBTTtBQUN2RCxNQUFNQyxNQUFNLEdBQUcsS0FBZjtBQUNBRixFQUFBQSxNQUFNLENBQUNHLElBQVAsR0FBYyxRQUFkO0FBQ0EsU0FBTyxVQUFVQyxJQUFWLEVBQWdCQyxFQUFoQixFQUFvQjtBQUN6QixXQUFPLDBCQUFZTCxNQUFaLEVBQW9CRSxNQUFwQixFQUE0QkQsSUFBNUIsRUFBa0NHLElBQWxDLEVBQXdDQyxFQUF4QyxDQUFQO0FBQ0QsR0FGRDtBQUdEOztBQUVNLFNBQVNDLG9CQUFULEdBQWlELEtBQW5CTixNQUFtQix1RUFBVixFQUFVLEtBQU5DLElBQU07QUFDdEQsTUFBTUMsTUFBTSxHQUFHLEtBQWY7QUFDQUYsRUFBQUEsTUFBTSxDQUFDRyxJQUFQLEdBQWMsT0FBZDtBQUNBLFNBQU8sVUFBVUMsSUFBVixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDekIsV0FBTywwQkFBWUwsTUFBWixFQUFvQkUsTUFBcEIsRUFBNEJELElBQTVCLEVBQWtDRyxJQUFsQyxFQUF3Q0MsRUFBeEMsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7QUFFTSxTQUFTRSxlQUFULENBQXlCUCxNQUF6QixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDNUMsTUFBSUQsTUFBTSxDQUFDRyxJQUFQLElBQWUsUUFBbkI7QUFDRSxTQUFPSixxQkFBcUIsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULENBQTVCO0FBQ0YsTUFBSUQsTUFBTSxDQUFDRyxJQUFQLElBQWUsT0FBbkI7QUFDRSxTQUFPRyxvQkFBb0IsQ0FBQ04sTUFBRCxFQUFTQyxJQUFULENBQTNCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRBY3Rpb24gZnJvbSAnLi9idWlsZEFjdGlvbic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU29ja2V0R2V0QWN0aW9uKGNvbmZpZyA9IHt9LCBuYW1lKSB7XHJcbiAgY29uc3QgYWN0aW9uID0gJ0dFVCc7XHJcbiAgY29uZmlnLnR5cGUgPSAnc29ja2V0JztcclxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XHJcbiAgICByZXR1cm4gYnVpbGRBY3Rpb24oY29uZmlnLCBhY3Rpb24sIG5hbWUsIGRhdGEsIGNiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmV0Y2hHZXRBY3Rpb24oY29uZmlnID0ge30sIG5hbWUpIHtcclxuICBjb25zdCBhY3Rpb24gPSAnR0VUJztcclxuICBjb25maWcudHlwZSA9ICdmZXRjaCc7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKGNvbmZpZywgYWN0aW9uLCBuYW1lLCBkYXRhLCBjYik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdldEFjdGlvbihjb25maWcsIG5hbWUpIHtcclxuICBpZiAoY29uZmlnLnR5cGUgPT0gJ3NvY2tldCcpXHJcbiAgICByZXR1cm4gY3JlYXRlU29ja2V0R2V0QWN0aW9uKGNvbmZpZywgbmFtZSk7XHJcbiAgaWYgKGNvbmZpZy50eXBlID09ICdmZXRjaCcpXHJcbiAgICByZXR1cm4gY3JlYXRlRmV0Y2hHZXRBY3Rpb24oY29uZmlnLCBuYW1lKTtcclxufSJdfQ==