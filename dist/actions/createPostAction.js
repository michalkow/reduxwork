"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createSocketPostAction = createSocketPostAction;exports.createFetchPostAction = createFetchPostAction;exports.createPostAction = createPostAction;var _buildAction = _interopRequireDefault(require("../lib/buildAction"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2NyZWF0ZVBvc3RBY3Rpb24uanMiXSwibmFtZXMiOlsiY3JlYXRlU29ja2V0UG9zdEFjdGlvbiIsImNvbmZpZyIsIm5hbWUiLCJhY3Rpb24iLCJ0eXBlIiwiZGF0YSIsImNiIiwiY3JlYXRlRmV0Y2hQb3N0QWN0aW9uIiwiY3JlYXRlUG9zdEFjdGlvbiJdLCJtYXBwaW5ncyI6InFPQUFBLHlFOztBQUVPLFNBQVNBLHNCQUFULEdBQW1ELEtBQW5CQyxNQUFtQix1RUFBVixFQUFVLEtBQU5DLElBQU07QUFDeEQsTUFBTUMsTUFBTSxHQUFHLE1BQWY7QUFDQUYsRUFBQUEsTUFBTSxDQUFDRyxJQUFQLEdBQWMsUUFBZDtBQUNBLFNBQU8sVUFBVUMsSUFBVixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDekIsV0FBTywwQkFBWUwsTUFBWixFQUFvQkUsTUFBcEIsRUFBNEJELElBQTVCLEVBQWtDRyxJQUFsQyxFQUF3Q0MsRUFBeEMsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7QUFFTSxTQUFTQyxxQkFBVCxHQUFrRCxLQUFuQk4sTUFBbUIsdUVBQVYsRUFBVSxLQUFOQyxJQUFNO0FBQ3ZELE1BQU1DLE1BQU0sR0FBRyxNQUFmO0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ0csSUFBUCxHQUFjLE9BQWQ7QUFDQSxTQUFPLFVBQVVDLElBQVYsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3pCLFdBQU8sMEJBQVlMLE1BQVosRUFBb0JFLE1BQXBCLEVBQTRCRCxJQUE1QixFQUFrQ0csSUFBbEMsRUFBd0NDLEVBQXhDLENBQVA7QUFDRCxHQUZEO0FBR0Q7O0FBRU0sU0FBU0UsZ0JBQVQsQ0FBMEJQLE1BQTFCLEVBQWtDQyxJQUFsQyxFQUF3QztBQUM3QyxNQUFJRCxNQUFNLENBQUNHLElBQVAsSUFBZSxRQUFuQjtBQUNFLFNBQU9KLHNCQUFzQixDQUFDQyxNQUFELEVBQVNDLElBQVQsQ0FBN0I7QUFDRixNQUFJRCxNQUFNLENBQUNHLElBQVAsSUFBZSxPQUFuQjtBQUNFLFNBQU9HLHFCQUFxQixDQUFDTixNQUFELEVBQVNDLElBQVQsQ0FBNUI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZEFjdGlvbiBmcm9tICcuLi9saWIvYnVpbGRBY3Rpb24nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNvY2tldFBvc3RBY3Rpb24oY29uZmlnID0ge30sIG5hbWUpIHtcclxuICBjb25zdCBhY3Rpb24gPSAnUE9TVCc7XHJcbiAgY29uZmlnLnR5cGUgPSAnc29ja2V0JztcclxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XHJcbiAgICByZXR1cm4gYnVpbGRBY3Rpb24oY29uZmlnLCBhY3Rpb24sIG5hbWUsIGRhdGEsIGNiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmV0Y2hQb3N0QWN0aW9uKGNvbmZpZyA9IHt9LCBuYW1lKSB7XHJcbiAgY29uc3QgYWN0aW9uID0gJ1BPU1QnO1xyXG4gIGNvbmZpZy50eXBlID0gJ2ZldGNoJztcclxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XHJcbiAgICByZXR1cm4gYnVpbGRBY3Rpb24oY29uZmlnLCBhY3Rpb24sIG5hbWUsIGRhdGEsIGNiKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUG9zdEFjdGlvbihjb25maWcsIG5hbWUpIHtcclxuICBpZiAoY29uZmlnLnR5cGUgPT0gJ3NvY2tldCcpXHJcbiAgICByZXR1cm4gY3JlYXRlU29ja2V0UG9zdEFjdGlvbihjb25maWcsIG5hbWUpO1xyXG4gIGlmIChjb25maWcudHlwZSA9PSAnZmV0Y2gnKVxyXG4gICAgcmV0dXJuIGNyZWF0ZUZldGNoUG9zdEFjdGlvbihjb25maWcsIG5hbWUpO1xyXG59Il19