"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = require("../lib/constants");var _default =

function _default(_ref, _ref2) {var transport = _ref.transport;var socket = _ref2.socket;return function (callback) {
    switch (transport) {
      case _constants.TransportMethodEnum.SOCKET:
        socket.on('connect', function () {return (
            callback({ online: true }));});
        socket.on('disconnect', function () {return (
            callback({ online: false }));});
        break;
      case _constants.TransportMethodEnum.FETCH:
        break;}

  };};exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9vZmZsaW5lL2J1aWxkRGV0ZWN0TmV0d29yay5qcyJdLCJuYW1lcyI6WyJ0cmFuc3BvcnQiLCJzb2NrZXQiLCJjYWxsYmFjayIsIlRyYW5zcG9ydE1ldGhvZEVudW0iLCJTT0NLRVQiLCJvbiIsIm9ubGluZSIsIkZFVENIIl0sIm1hcHBpbmdzIjoib0dBQUEsNkM7O0FBRWUsb0NBQUdBLFNBQUgsUUFBR0EsU0FBSCxLQUFrQkMsTUFBbEIsU0FBa0JBLE1BQWxCLFFBQStCLFVBQUFDLFFBQVEsRUFBSTtBQUN4RCxZQUFRRixTQUFSO0FBQ0UsV0FBS0csK0JBQW9CQyxNQUF6QjtBQUNFSCxRQUFBQSxNQUFNLENBQUNJLEVBQVAsQ0FBVSxTQUFWLEVBQXFCO0FBQ25CSCxZQUFBQSxRQUFRLENBQUMsRUFBRUksTUFBTSxFQUFFLElBQVYsRUFBRCxDQURXLEdBQXJCO0FBRUFMLFFBQUFBLE1BQU0sQ0FBQ0ksRUFBUCxDQUFVLFlBQVYsRUFBd0I7QUFDdEJILFlBQUFBLFFBQVEsQ0FBQyxFQUFFSSxNQUFNLEVBQUUsS0FBVixFQUFELENBRGMsR0FBeEI7QUFFQTtBQUNGLFdBQUtILCtCQUFvQkksS0FBekI7QUFDRSxjQVJKOztBQVVELEdBWGMsRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zcG9ydE1ldGhvZEVudW0gfSBmcm9tICcuLi9saWIvY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IHRyYW5zcG9ydCB9LCB7IHNvY2tldCB9KSA9PiBjYWxsYmFjayA9PiB7XHJcbiAgc3dpdGNoICh0cmFuc3BvcnQpIHtcclxuICAgIGNhc2UgVHJhbnNwb3J0TWV0aG9kRW51bS5TT0NLRVQ6XHJcbiAgICAgIHNvY2tldC5vbignY29ubmVjdCcsICgpID0+XHJcbiAgICAgICAgY2FsbGJhY2soeyBvbmxpbmU6IHRydWUgfSkpO1xyXG4gICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PlxyXG4gICAgICAgIGNhbGxiYWNrKHsgb25saW5lOiBmYWxzZSB9KSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBUcmFuc3BvcnRNZXRob2RFbnVtLkZFVENIOlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn07Il19