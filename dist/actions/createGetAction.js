"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createSocketGetAction = createSocketGetAction;exports.createFetchGetAction = createFetchGetAction;exports.createGetAction = createGetAction;var _buildAction = _interopRequireDefault(require("../lib/buildAction"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2NyZWF0ZUdldEFjdGlvbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTb2NrZXRHZXRBY3Rpb24iLCJjb25maWciLCJuYW1lIiwiYWN0aW9uIiwidHlwZSIsImRhdGEiLCJjYiIsImNyZWF0ZUZldGNoR2V0QWN0aW9uIiwiY3JlYXRlR2V0QWN0aW9uIl0sIm1hcHBpbmdzIjoiK05BQUEseUU7O0FBRU8sU0FBU0EscUJBQVQsR0FBa0QsS0FBbkJDLE1BQW1CLHVFQUFWLEVBQVUsS0FBTkMsSUFBTTtBQUN2RCxNQUFNQyxNQUFNLEdBQUcsS0FBZjtBQUNBRixFQUFBQSxNQUFNLENBQUNHLElBQVAsR0FBYyxRQUFkO0FBQ0EsU0FBTyxVQUFVQyxJQUFWLEVBQWdCQyxFQUFoQixFQUFvQjtBQUN6QixXQUFPLDBCQUFZTCxNQUFaLEVBQW9CRSxNQUFwQixFQUE0QkQsSUFBNUIsRUFBa0NHLElBQWxDLEVBQXdDQyxFQUF4QyxDQUFQO0FBQ0QsR0FGRDtBQUdEOztBQUVNLFNBQVNDLG9CQUFULEdBQWlELEtBQW5CTixNQUFtQix1RUFBVixFQUFVLEtBQU5DLElBQU07QUFDdEQsTUFBTUMsTUFBTSxHQUFHLEtBQWY7QUFDQUYsRUFBQUEsTUFBTSxDQUFDRyxJQUFQLEdBQWMsT0FBZDtBQUNBLFNBQU8sVUFBVUMsSUFBVixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDekIsV0FBTywwQkFBWUwsTUFBWixFQUFvQkUsTUFBcEIsRUFBNEJELElBQTVCLEVBQWtDRyxJQUFsQyxFQUF3Q0MsRUFBeEMsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7QUFFTSxTQUFTRSxlQUFULENBQXlCUCxNQUF6QixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDNUMsTUFBSUQsTUFBTSxDQUFDRyxJQUFQLElBQWUsUUFBbkI7QUFDRSxTQUFPSixxQkFBcUIsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULENBQTVCO0FBQ0YsTUFBSUQsTUFBTSxDQUFDRyxJQUFQLElBQWUsT0FBbkI7QUFDRSxTQUFPRyxvQkFBb0IsQ0FBQ04sTUFBRCxFQUFTQyxJQUFULENBQTNCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRBY3Rpb24gZnJvbSAnLi4vbGliL2J1aWxkQWN0aW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb2NrZXRHZXRBY3Rpb24oY29uZmlnID0ge30sIG5hbWUpIHtcclxuICBjb25zdCBhY3Rpb24gPSAnR0VUJztcclxuICBjb25maWcudHlwZSA9ICdzb2NrZXQnO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoZGF0YSwgY2IpIHtcclxuICAgIHJldHVybiBidWlsZEFjdGlvbihjb25maWcsIGFjdGlvbiwgbmFtZSwgZGF0YSwgY2IpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGZXRjaEdldEFjdGlvbihjb25maWcgPSB7fSwgbmFtZSkge1xyXG4gIGNvbnN0IGFjdGlvbiA9ICdHRVQnO1xyXG4gIGNvbmZpZy50eXBlID0gJ2ZldGNoJztcclxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XHJcbiAgICByZXR1cm4gYnVpbGRBY3Rpb24oY29uZmlnLCBhY3Rpb24sIG5hbWUsIGRhdGEsIGNiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2V0QWN0aW9uKGNvbmZpZywgbmFtZSkge1xyXG4gIGlmIChjb25maWcudHlwZSA9PSAnc29ja2V0JylcclxuICAgIHJldHVybiBjcmVhdGVTb2NrZXRHZXRBY3Rpb24oY29uZmlnLCBuYW1lKTtcclxuICBpZiAoY29uZmlnLnR5cGUgPT0gJ2ZldGNoJylcclxuICAgIHJldHVybiBjcmVhdGVGZXRjaEdldEFjdGlvbihjb25maWcsIG5hbWUpO1xyXG59Il19