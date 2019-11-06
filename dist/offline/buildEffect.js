"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = require("../lib/constants");
var _dispatchToSocket = _interopRequireDefault(require("../dispatch/dispatchToSocket"));
var _dispatchToFetch = _interopRequireDefault(require("../dispatch/dispatchToFetch"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

function _default(options, _ref) {var socket = _ref.socket,fetch = _ref.fetch;return function (effect, action) {
    switch (effect.transport) {
      case _constants.TransportMethodEnum.SOCKET:
        return (0, _dispatchToSocket.default)(options, socket, action);
      case _constants.TransportMethodEnum.FETCH:
        return (0, _dispatchToFetch.default)(options, fetch, action);}

  };};exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9vZmZsaW5lL2J1aWxkRWZmZWN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJzb2NrZXQiLCJmZXRjaCIsImVmZmVjdCIsImFjdGlvbiIsInRyYW5zcG9ydCIsIlRyYW5zcG9ydE1ldGhvZEVudW0iLCJTT0NLRVQiLCJGRVRDSCJdLCJtYXBwaW5ncyI6Im9HQUFBO0FBQ0E7QUFDQSxzRjs7QUFFZSxrQkFBQ0EsT0FBRCxhQUFZQyxNQUFaLFFBQVlBLE1BQVosQ0FBb0JDLEtBQXBCLFFBQW9CQSxLQUFwQixRQUFnQyxVQUFDQyxNQUFELEVBQVNDLE1BQVQsRUFBb0I7QUFDakUsWUFBUUQsTUFBTSxDQUFDRSxTQUFmO0FBQ0UsV0FBS0MsK0JBQW9CQyxNQUF6QjtBQUNFLGVBQU8sK0JBQWlCUCxPQUFqQixFQUEwQkMsTUFBMUIsRUFBa0NHLE1BQWxDLENBQVA7QUFDRixXQUFLRSwrQkFBb0JFLEtBQXpCO0FBQ0UsZUFBTyw4QkFBZ0JSLE9BQWhCLEVBQXlCRSxLQUF6QixFQUFnQ0UsTUFBaEMsQ0FBUCxDQUpKOztBQU1ELEdBUGMsRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zcG9ydE1ldGhvZEVudW0gfSBmcm9tICcuLi9saWIvY29uc3RhbnRzJztcclxuaW1wb3J0IGRpc3BhdGNoVG9Tb2NrZXQgZnJvbSAnLi4vZGlzcGF0Y2gvZGlzcGF0Y2hUb1NvY2tldCc7XHJcbmltcG9ydCBkaXNwYXRjaFRvRmV0Y2ggZnJvbSAnLi4vZGlzcGF0Y2gvZGlzcGF0Y2hUb0ZldGNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zLCB7IHNvY2tldCwgZmV0Y2ggfSkgPT4gKGVmZmVjdCwgYWN0aW9uKSA9PiB7XHJcbiAgc3dpdGNoIChlZmZlY3QudHJhbnNwb3J0KSB7XHJcbiAgICBjYXNlIFRyYW5zcG9ydE1ldGhvZEVudW0uU09DS0VUOlxyXG4gICAgICByZXR1cm4gZGlzcGF0Y2hUb1NvY2tldChvcHRpb25zLCBzb2NrZXQsIGFjdGlvbik7XHJcbiAgICBjYXNlIFRyYW5zcG9ydE1ldGhvZEVudW0uRkVUQ0g6XHJcbiAgICAgIHJldHVybiBkaXNwYXRjaFRvRmV0Y2gob3B0aW9ucywgZmV0Y2gsIGFjdGlvbik7XHJcbiAgfVxyXG59Il19