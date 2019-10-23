"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = function _default(options) {return function (callback) {var
    socket = options.socket;
    if (socket) {
      socket.on('connect', function () {return (
          callback({ online: true }));});
      socket.on('disconnect', function () {return (
          callback({ online: false }));});
    }
  };};exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9vZmZsaW5lL2J1aWxkRGV0ZWN0TmV0d29yay5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiY2FsbGJhY2siLCJzb2NrZXQiLCJvbiIsIm9ubGluZSJdLCJtYXBwaW5ncyI6Im1IQUFlLGtCQUFBQSxPQUFPLFVBQUksVUFBQUMsUUFBUSxFQUFJO0FBQzVCQyxJQUFBQSxNQUQ0QixHQUNqQkYsT0FEaUIsQ0FDNUJFLE1BRDRCO0FBRXBDLFFBQUlBLE1BQUosRUFBWTtBQUNWQSxNQUFBQSxNQUFNLENBQUNDLEVBQVAsQ0FBVSxTQUFWLEVBQXFCO0FBQ25CRixVQUFBQSxRQUFRLENBQUMsRUFBRUcsTUFBTSxFQUFFLElBQVYsRUFBRCxDQURXLEdBQXJCO0FBRUFGLE1BQUFBLE1BQU0sQ0FBQ0MsRUFBUCxDQUFVLFlBQVYsRUFBd0I7QUFDdEJGLFVBQUFBLFFBQVEsQ0FBQyxFQUFFRyxNQUFNLEVBQUUsS0FBVixFQUFELENBRGMsR0FBeEI7QUFFRDtBQUNGLEdBUnFCLEUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBvcHRpb25zID0+IGNhbGxiYWNrID0+IHtcclxuICBjb25zdCB7IHNvY2tldCB9ID0gb3B0aW9ucztcclxuICBpZiAoc29ja2V0KSB7XHJcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCAoKSA9PlxyXG4gICAgICBjYWxsYmFjayh7IG9ubGluZTogdHJ1ZSB9KSk7XHJcbiAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PlxyXG4gICAgICBjYWxsYmFjayh7IG9ubGluZTogZmFsc2UgfSkpO1xyXG4gIH1cclxufTsiXX0=