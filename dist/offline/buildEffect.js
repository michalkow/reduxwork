"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = require("../lib/constants");
var _dispatchToSocket = _interopRequireDefault(require("../dispatch/dispatchToSocket"));
var _dispatchToFetch = _interopRequireDefault(require("../dispatch/dispatchToFetch"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

function _default(options) {return function (effect, action) {
    switch (effect.transport) {
      case _constants.TransportMethodEnum.SOCKET:
        return (0, _dispatchToSocket.default)(options, action);
      case _constants.TransportMethodEnum.FETCH:
        return (0, _dispatchToFetch.default)(options, action);}

  };};exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9vZmZsaW5lL2J1aWxkRWZmZWN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJlZmZlY3QiLCJhY3Rpb24iLCJ0cmFuc3BvcnQiLCJUcmFuc3BvcnRNZXRob2RFbnVtIiwiU09DS0VUIiwiRkVUQ0giXSwibWFwcGluZ3MiOiJvR0FBQTtBQUNBO0FBQ0Esc0Y7O0FBRWUsa0JBQUNBLE9BQUQsVUFBYSxVQUFDQyxNQUFELEVBQVNDLE1BQVQsRUFBb0I7QUFDOUMsWUFBUUQsTUFBTSxDQUFDRSxTQUFmO0FBQ0UsV0FBS0MsK0JBQW9CQyxNQUF6QjtBQUNFLGVBQU8sK0JBQWlCTCxPQUFqQixFQUEwQkUsTUFBMUIsQ0FBUDtBQUNGLFdBQUtFLCtCQUFvQkUsS0FBekI7QUFDRSxlQUFPLDhCQUFnQk4sT0FBaEIsRUFBeUJFLE1BQXpCLENBQVAsQ0FKSjs7QUFNRCxHQVBjLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc3BvcnRNZXRob2RFbnVtIH0gZnJvbSAnLi4vbGliL2NvbnN0YW50cyc7XHJcbmltcG9ydCBkaXNwYXRjaFRvU29ja2V0IGZyb20gJy4uL2Rpc3BhdGNoL2Rpc3BhdGNoVG9Tb2NrZXQnO1xyXG5pbXBvcnQgZGlzcGF0Y2hUb0ZldGNoIGZyb20gJy4uL2Rpc3BhdGNoL2Rpc3BhdGNoVG9GZXRjaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucykgPT4gKGVmZmVjdCwgYWN0aW9uKSA9PiB7XHJcbiAgc3dpdGNoIChlZmZlY3QudHJhbnNwb3J0KSB7XHJcbiAgICBjYXNlIFRyYW5zcG9ydE1ldGhvZEVudW0uU09DS0VUOlxyXG4gICAgICByZXR1cm4gZGlzcGF0Y2hUb1NvY2tldChvcHRpb25zLCBhY3Rpb24pO1xyXG4gICAgY2FzZSBUcmFuc3BvcnRNZXRob2RFbnVtLkZFVENIOlxyXG4gICAgICByZXR1cm4gZGlzcGF0Y2hUb0ZldGNoKG9wdGlvbnMsIGFjdGlvbik7XHJcbiAgfVxyXG59Il19