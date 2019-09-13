"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createSocketAction;var _buildAction = _interopRequireDefault(require("../lib/buildAction"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createSocketAction() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var name = arguments.length > 1 ? arguments[1] : undefined;
  config.type = 'socket';
  return function (data, cb) {
    return (0, _buildAction.default)(config, null, name, data, cb);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2NyZWF0ZVNvY2tldEFjdGlvbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTb2NrZXRBY3Rpb24iLCJjb25maWciLCJuYW1lIiwidHlwZSIsImRhdGEiLCJjYiJdLCJtYXBwaW5ncyI6ImdIQUFBLHlFOztBQUVlLFNBQVNBLGtCQUFULEdBQStDLEtBQW5CQyxNQUFtQix1RUFBVixFQUFVLEtBQU5DLElBQU07QUFDNURELEVBQUFBLE1BQU0sQ0FBQ0UsSUFBUCxHQUFjLFFBQWQ7QUFDQSxTQUFPLFVBQVVDLElBQVYsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3pCLFdBQU8sMEJBQVlKLE1BQVosRUFBb0IsSUFBcEIsRUFBMEJDLElBQTFCLEVBQWdDRSxJQUFoQyxFQUFzQ0MsRUFBdEMsQ0FBUDtBQUNELEdBRkQ7QUFHRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZEFjdGlvbiBmcm9tICcuLi9saWIvYnVpbGRBY3Rpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU29ja2V0QWN0aW9uKGNvbmZpZyA9IHt9LCBuYW1lKSB7XHJcbiAgY29uZmlnLnR5cGUgPSAnc29ja2V0JztcclxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGNiKSB7XHJcbiAgICByZXR1cm4gYnVpbGRBY3Rpb24oY29uZmlnLCBudWxsLCBuYW1lLCBkYXRhLCBjYik7XHJcbiAgfTtcclxufSJdfQ==