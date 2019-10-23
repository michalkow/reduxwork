"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createSocketPostAction = createSocketPostAction;exports.createFetchPostAction = createFetchPostAction;exports.createPostAction = createPostAction;var _buildAction = _interopRequireDefault(require("./buildAction"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createSocketPostAction() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'POST';
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createFetchPostAction() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var name = arguments.length > 1 ? arguments[1] : undefined;
  var action = 'POST';
  config.type = 'fetch';
  return function (data, cb) {
    return (0, _buildAction.default)(config, action, name, data, cb);
  };
}

function createPostAction(config, name) {
  if (config.type == 'socket')
  return createSocketPostAction(config, name);
  if (config.type == 'fetch')
  return createFetchPostAction(config, name);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hY3Rpb25zL2NyZWF0ZVBvc3RBY3Rpb24uanMiXSwibmFtZXMiOlsiY3JlYXRlU29ja2V0UG9zdEFjdGlvbiIsImNvbmZpZyIsIm5hbWUiLCJhY3Rpb24iLCJ0eXBlIiwiZGF0YSIsImNiIiwiY3JlYXRlRmV0Y2hQb3N0QWN0aW9uIiwiY3JlYXRlUG9zdEFjdGlvbiJdLCJtYXBwaW5ncyI6InFPQUFBLG9FOztBQUVPLFNBQVNBLHNCQUFULEdBQW1ELEtBQW5CQyxNQUFtQix1RUFBVixFQUFVLEtBQU5DLElBQU07QUFDeEQsTUFBTUMsTUFBTSxHQUFHLE1BQWY7QUFDQUYsRUFBQUEsTUFBTSxDQUFDRyxJQUFQLEdBQWMsUUFBZDtBQUNBLFNBQU8sVUFBVUMsSUFBVixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDekIsV0FBTywwQkFBWUwsTUFBWixFQUFvQkUsTUFBcEIsRUFBNEJELElBQTVCLEVBQWtDRyxJQUFsQyxFQUF3Q0MsRUFBeEMsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7QUFFTSxTQUFTQyxxQkFBVCxHQUFrRCxLQUFuQk4sTUFBbUIsdUVBQVYsRUFBVSxLQUFOQyxJQUFNO0FBQ3ZELE1BQU1DLE1BQU0sR0FBRyxNQUFmO0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ0csSUFBUCxHQUFjLE9BQWQ7QUFDQSxTQUFPLFVBQVVDLElBQVYsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3pCLFdBQU8sMEJBQVlMLE1BQVosRUFBb0JFLE1BQXBCLEVBQTRCRCxJQUE1QixFQUFrQ0csSUFBbEMsRUFBd0NDLEVBQXhDLENBQVA7QUFDRCxHQUZEO0FBR0Q7O0FBRU0sU0FBU0UsZ0JBQVQsQ0FBMEJQLE1BQTFCLEVBQWtDQyxJQUFsQyxFQUF3QztBQUM3QyxNQUFJRCxNQUFNLENBQUNHLElBQVAsSUFBZSxRQUFuQjtBQUNFLFNBQU9KLHNCQUFzQixDQUFDQyxNQUFELEVBQVNDLElBQVQsQ0FBN0I7QUFDRixNQUFJRCxNQUFNLENBQUNHLElBQVAsSUFBZSxPQUFuQjtBQUNFLFNBQU9HLHFCQUFxQixDQUFDTixNQUFELEVBQVNDLElBQVQsQ0FBNUI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZEFjdGlvbiBmcm9tICcuL2J1aWxkQWN0aW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb2NrZXRQb3N0QWN0aW9uKGNvbmZpZyA9IHt9LCBuYW1lKSB7XHJcbiAgY29uc3QgYWN0aW9uID0gJ1BPU1QnO1xyXG4gIGNvbmZpZy50eXBlID0gJ3NvY2tldCc7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKGNvbmZpZywgYWN0aW9uLCBuYW1lLCBkYXRhLCBjYik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZldGNoUG9zdEFjdGlvbihjb25maWcgPSB7fSwgbmFtZSkge1xyXG4gIGNvbnN0IGFjdGlvbiA9ICdQT1NUJztcclxuICBjb25maWcudHlwZSA9ICdmZXRjaCc7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKGNvbmZpZywgYWN0aW9uLCBuYW1lLCBkYXRhLCBjYik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBvc3RBY3Rpb24oY29uZmlnLCBuYW1lKSB7XHJcbiAgaWYgKGNvbmZpZy50eXBlID09ICdzb2NrZXQnKVxyXG4gICAgcmV0dXJuIGNyZWF0ZVNvY2tldFBvc3RBY3Rpb24oY29uZmlnLCBuYW1lKTtcclxuICBpZiAoY29uZmlnLnR5cGUgPT0gJ2ZldGNoJylcclxuICAgIHJldHVybiBjcmVhdGVGZXRjaFBvc3RBY3Rpb24oY29uZmlnLCBuYW1lKTtcclxufSJdfQ==