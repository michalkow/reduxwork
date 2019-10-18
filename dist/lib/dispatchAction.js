"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _bluebird = _interopRequireDefault(require("bluebird"));var _fieldsOperations = require("./fieldsOperations");
var _constants = require("./constants");
var _createAction = require("./createAction");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var dispatchAction = function dispatchAction(options, action, dispatchMethod) {var
  validation = options.validation,actionInject = options.actionInject;

  return function (dispatch) {
    // Dispatch Local Action
    if (!action.reduxwork.queued && action.reduxwork.transport != _constants.TransportMethodEnum.REDUX)
    dispatch((0, _createAction.extendActionRedux)(action));

    return new _bluebird.default(function (resolve, reject) {
      var serverAction = (0, _fieldsOperations.omitLocalFields)(actionInject(action), options);

      if (validation && action.validationScheme) {
        var validationError = validation(serverAction.data, action.validationScheme);
        if (validationError) {
          dispatch((0, _createAction.extendActionFailedValidation)(action, validationError));
          return reject(validationError);
        }
      }

      return dispatchMethod(serverAction, dispatch, resolve, reject);
    });
  };
};var _default =

dispatchAction;exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGlzcGF0Y2hBY3Rpb24uanMiXSwibmFtZXMiOlsiZGlzcGF0Y2hBY3Rpb24iLCJvcHRpb25zIiwiYWN0aW9uIiwiZGlzcGF0Y2hNZXRob2QiLCJ2YWxpZGF0aW9uIiwiYWN0aW9uSW5qZWN0IiwiZGlzcGF0Y2giLCJyZWR1eHdvcmsiLCJxdWV1ZWQiLCJ0cmFuc3BvcnQiLCJUcmFuc3BvcnRNZXRob2RFbnVtIiwiUkVEVVgiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VydmVyQWN0aW9uIiwidmFsaWRhdGlvblNjaGVtZSIsInZhbGlkYXRpb25FcnJvciIsImRhdGEiXSwibWFwcGluZ3MiOiJnS0FBQTtBQUNBO0FBQ0EsOEM7O0FBRUEsSUFBTUEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBa0JDLGNBQWxCLEVBQXFDO0FBQ2xEQyxFQUFBQSxVQURrRCxHQUNyQkgsT0FEcUIsQ0FDbERHLFVBRGtELENBQ3RDQyxZQURzQyxHQUNyQkosT0FEcUIsQ0FDdENJLFlBRHNDOztBQUcxRCxTQUFPLFVBQUNDLFFBQUQsRUFBYztBQUNuQjtBQUNBLFFBQUksQ0FBQ0osTUFBTSxDQUFDSyxTQUFQLENBQWlCQyxNQUFsQixJQUE0Qk4sTUFBTSxDQUFDSyxTQUFQLENBQWlCRSxTQUFqQixJQUE4QkMsK0JBQW9CQyxLQUFsRjtBQUNFTCxJQUFBQSxRQUFRLENBQUMscUNBQWtCSixNQUFsQixDQUFELENBQVI7O0FBRUYsV0FBTyxzQkFBWSxVQUFDVSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsVUFBTUMsWUFBWSxHQUFHLHVDQUFnQlQsWUFBWSxDQUFDSCxNQUFELENBQTVCLEVBQXNDRCxPQUF0QyxDQUFyQjs7QUFFQSxVQUFJRyxVQUFVLElBQUlGLE1BQU0sQ0FBQ2EsZ0JBQXpCLEVBQTJDO0FBQ3pDLFlBQUlDLGVBQWUsR0FBR1osVUFBVSxDQUFDVSxZQUFZLENBQUNHLElBQWQsRUFBb0JmLE1BQU0sQ0FBQ2EsZ0JBQTNCLENBQWhDO0FBQ0EsWUFBSUMsZUFBSixFQUFxQjtBQUNuQlYsVUFBQUEsUUFBUSxDQUFDLGdEQUE2QkosTUFBN0IsRUFBcUNjLGVBQXJDLENBQUQsQ0FBUjtBQUNBLGlCQUFPSCxNQUFNLENBQUNHLGVBQUQsQ0FBYjtBQUNEO0FBQ0Y7O0FBRUQsYUFBT2IsY0FBYyxDQUFDVyxZQUFELEVBQWVSLFFBQWYsRUFBeUJNLE9BQXpCLEVBQWtDQyxNQUFsQyxDQUFyQjtBQUNELEtBWk0sQ0FBUDtBQWFELEdBbEJEO0FBbUJELENBdEJELEM7O0FBd0JlYixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb21pdFZpcnR1YWxGaWVsZHMsIG9taXRMb2NhbEZpZWxkcyB9IGZyb20gJy4vZmllbGRzT3BlcmF0aW9ucyc7XHJcbmltcG9ydCB7IFRyYW5zcG9ydE1ldGhvZEVudW0gfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGV4dGVuZEFjdGlvblJlZHV4LCBleHRlbmRBY3Rpb25GYWlsZWRWYWxpZGF0aW9uIH0gZnJvbSAnLi9jcmVhdGVBY3Rpb24nO1xyXG5cclxuY29uc3QgZGlzcGF0Y2hBY3Rpb24gPSAob3B0aW9ucywgYWN0aW9uLCBkaXNwYXRjaE1ldGhvZCkgPT4ge1xyXG4gIGNvbnN0IHsgdmFsaWRhdGlvbiwgYWN0aW9uSW5qZWN0IH0gPSBvcHRpb25zO1xyXG5cclxuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAvLyBEaXNwYXRjaCBMb2NhbCBBY3Rpb25cclxuICAgIGlmICghYWN0aW9uLnJlZHV4d29yay5xdWV1ZWQgJiYgYWN0aW9uLnJlZHV4d29yay50cmFuc3BvcnQgIT0gVHJhbnNwb3J0TWV0aG9kRW51bS5SRURVWClcclxuICAgICAgZGlzcGF0Y2goZXh0ZW5kQWN0aW9uUmVkdXgoYWN0aW9uKSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3Qgc2VydmVyQWN0aW9uID0gb21pdExvY2FsRmllbGRzKGFjdGlvbkluamVjdChhY3Rpb24pLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIGlmICh2YWxpZGF0aW9uICYmIGFjdGlvbi52YWxpZGF0aW9uU2NoZW1lKSB7XHJcbiAgICAgICAgbGV0IHZhbGlkYXRpb25FcnJvciA9IHZhbGlkYXRpb24oc2VydmVyQWN0aW9uLmRhdGEsIGFjdGlvbi52YWxpZGF0aW9uU2NoZW1lKTtcclxuICAgICAgICBpZiAodmFsaWRhdGlvbkVycm9yKSB7XHJcbiAgICAgICAgICBkaXNwYXRjaChleHRlbmRBY3Rpb25GYWlsZWRWYWxpZGF0aW9uKGFjdGlvbiwgdmFsaWRhdGlvbkVycm9yKSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KHZhbGlkYXRpb25FcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZGlzcGF0Y2hNZXRob2Qoc2VydmVyQWN0aW9uLCBkaXNwYXRjaCwgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaEFjdGlvbjsiXX0=