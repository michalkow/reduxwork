"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createSocketAction;var _buildAction = _interopRequireDefault(require("./buildAction"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createSocketAction() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var name = arguments.length > 1 ? arguments[1] : undefined;
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, null, name, data, cb);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hY3Rpb25zL2NyZWF0ZVNvY2tldEFjdGlvbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTb2NrZXRBY3Rpb24iLCJjb25maWciLCJuYW1lIiwidHlwZSIsImRhdGEiLCJjYiJdLCJtYXBwaW5ncyI6ImdIQUFBLG9FOztBQUVlLFNBQVNBLGtCQUFULEdBQStDLEtBQW5CQyxNQUFtQix1RUFBVixFQUFVLEtBQU5DLElBQU07QUFDNURELEVBQUFBLE1BQU0sQ0FBQ0UsSUFBUCxHQUFjLFFBQWQ7QUFDQSxTQUFPLFVBQVVDLElBQVYsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3pCLFdBQU8sMEJBQVlKLE1BQVosRUFBb0IsSUFBcEIsRUFBMEJDLElBQTFCLEVBQWdDRSxJQUFoQyxFQUFzQ0MsRUFBdEMsQ0FBUDtBQUNELEdBRkQ7QUFHRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZEFjdGlvbiBmcm9tICcuL2J1aWxkQWN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNvY2tldEFjdGlvbihjb25maWcgPSB7fSwgbmFtZSkge1xyXG4gIGNvbmZpZy50eXBlID0gJ3NvY2tldCc7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBjYikge1xyXG4gICAgcmV0dXJuIGJ1aWxkQWN0aW9uKGNvbmZpZywgbnVsbCwgbmFtZSwgZGF0YSwgY2IpO1xyXG4gIH07XHJcbn0iXX0=