"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = fetchDispatcher;var _bluebird = _interopRequireDefault(require("bluebird"));var _lodash = require("lodash");
var _buildFetchOptions = _interopRequireDefault(require("./buildFetchOptions"));
var _buildURL = _interopRequireDefault(require("./buildURL"));
var _getFetchMethod = _interopRequireDefault(require("./getFetchMethod"));
var _fieldsOperations = require("./fieldsOperations");
var _validationHook = _interopRequireDefault(require("./validationHook"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function fetchDispatcher() {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var actionName = arguments.length > 1 ? arguments[1] : undefined;var name = arguments.length > 2 ? arguments[2] : undefined;var dispatch = arguments.length > 3 ? arguments[3] : undefined;var data = arguments.length > 4 ? arguments[4] : undefined;var cb = arguments.length > 5 ? arguments[5] : undefined;
  var payload = data && (data._tempId || data._rewrite) ? (0, _lodash.omit)(data, ['_tempId', '_rewrite']) : data;
  var action = actionName ? actionName.toUpperCase() : null;
  if (config.fetchFunction) {
    return new _bluebird.default(function (resolve, reject) {
      if (config.actionInject) payload = config.actionInject(payload);
      //TODO: Make logic more similar to socket dispatcher
      var validationError = (0, _validationHook.default)(config, { type: action + '_' + name, data: payload });
      if (validationError) {
        var failedValidationAction = {
          type: (action ? action + '_' + name : name) + '_FAILED',
          validationError: validationError };

        if (data && data._tempId) failedValidationAction._tempId = data._tempId;
        dispatch(failedValidationAction);
        reject(validationError);
        return { err: validationError, res: null };
      }
      payload = (0, _fieldsOperations.stripLocalFields)(config, payload);
      config.fetchFunction(
      (0, _buildURL.default)(config, action, name, payload, (0, _getFetchMethod.default)(config, action)),
      (0, _buildFetchOptions.default)(config, payload, (0, _getFetchMethod.default)(config, action))).

      then(function (response) {
        if (response.ok)
        return response.json();else
        {
          var error = response.json();
          var failedAction = {
            type: (action ? action + '_' + name : name) + '_FAILED',
            error: error };

          if (data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(error);
          if (cb) cb(error, null);
          return error;
        }
      }).
      then(function (json) {
        var completedAction = {
          type: (action ? action + '_' + name : name) + '_COMPLETED',
          data: json };

        if (data && data._tempId) completedAction._tempId = data._tempId;
        if (data && typeof data._rewrite !== 'undefined') completedAction._rewrite = data._rewrite;
        dispatch(completedAction);
        resolve(json);
        if (cb) cb(null, json);
        return json;
      });
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZmV0Y2hEaXNwYXRjaGVyLmpzIl0sIm5hbWVzIjpbImZldGNoRGlzcGF0Y2hlciIsImNvbmZpZyIsImFjdGlvbk5hbWUiLCJuYW1lIiwiZGlzcGF0Y2giLCJkYXRhIiwiY2IiLCJwYXlsb2FkIiwiX3RlbXBJZCIsIl9yZXdyaXRlIiwiYWN0aW9uIiwidG9VcHBlckNhc2UiLCJmZXRjaEZ1bmN0aW9uIiwicmVzb2x2ZSIsInJlamVjdCIsImFjdGlvbkluamVjdCIsInZhbGlkYXRpb25FcnJvciIsInR5cGUiLCJmYWlsZWRWYWxpZGF0aW9uQWN0aW9uIiwiZXJyIiwicmVzIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJqc29uIiwiZXJyb3IiLCJmYWlsZWRBY3Rpb24iLCJjb21wbGV0ZWRBY3Rpb24iXSwibWFwcGluZ3MiOiJ5S0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEU7O0FBRWUsU0FBU0EsZUFBVCxHQUE0RSxLQUFuREMsTUFBbUQsdUVBQTFDLEVBQTBDLEtBQXRDQyxVQUFzQyx1REFBMUJDLElBQTBCLHVEQUFwQkMsUUFBb0IsdURBQVZDLElBQVUsdURBQUpDLEVBQUk7QUFDekYsTUFBSUMsT0FBTyxHQUFLRixJQUFJLEtBQUtBLElBQUksQ0FBQ0csT0FBTCxJQUFnQkgsSUFBSSxDQUFDSSxRQUExQixDQUFMLEdBQTRDLGtCQUFLSixJQUFMLEVBQVcsQ0FBQyxTQUFELEVBQVksVUFBWixDQUFYLENBQTVDLEdBQWtGQSxJQUFqRztBQUNBLE1BQU1LLE1BQU0sR0FBR1IsVUFBVSxHQUFHQSxVQUFVLENBQUNTLFdBQVgsRUFBSCxHQUE4QixJQUF2RDtBQUNBLE1BQUlWLE1BQU0sQ0FBQ1csYUFBWCxFQUEwQjtBQUN4QixXQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxVQUFJYixNQUFNLENBQUNjLFlBQVgsRUFBeUJSLE9BQU8sR0FBR04sTUFBTSxDQUFDYyxZQUFQLENBQW9CUixPQUFw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QUFKLEVBQVFBLEVBQUUsQ0FBQyxJQUFELEVBQU9rQixJQUFQLENBQUY7QUFDUixlQUFPQSxJQUFQO0FBQ0QsT0EvQkg7QUFnQ0QsS0EvQ00sQ0FBUDtBQWdERDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb21pdCB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBidWlsZEZldGNoT3B0aW9ucyBmcm9tICcuL2J1aWxkRmV0Y2hPcHRpb25zJztcclxuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4vYnVpbGRVUkwnO1xyXG5pbXBvcnQgZ2V0RmV0Y2hNZXRob2QgZnJvbSAnLi9nZXRGZXRjaE1ldGhvZCc7XHJcbmltcG9ydCB7IHN0cmlwTG9jYWxGaWVsZHMgfSBmcm9tICcuL2ZpZWxkc09wZXJhdGlvbnMnO1xyXG5pbXBvcnQgdmFsaWRhdGlvbkhvb2tFcnJvciBmcm9tICcuL3ZhbGlkYXRpb25Ib29rJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZldGNoRGlzcGF0Y2hlcihjb25maWcgPSB7fSwgYWN0aW9uTmFtZSwgbmFtZSwgZGlzcGF0Y2gsIGRhdGEsIGNiKSB7XHJcbiAgdmFyIHBheWxvYWQgPSAoKGRhdGEgJiYgKGRhdGEuX3RlbXBJZCB8fCBkYXRhLl9yZXdyaXRlKSkgPyBvbWl0KGRhdGEsIFsnX3RlbXBJZCcsICdfcmV3cml0ZSddKSA6IGRhdGEpO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGFjdGlvbk5hbWUgPyBhY3Rpb25OYW1lLnRvVXBwZXJDYXNlKCkgOiBudWxsO1xyXG4gIGlmIChjb25maWcuZmV0Y2hGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKGNvbmZpZy5hY3Rpb25JbmplY3QpIHBheWxvYWQgPSBjb25maWcuYWN0aW9uSW5qZWN0KHBheWxvYWQpO1xyXG4gICAgICAvL1RPRE86IE1ha2UgbG9naWMgbW9yZSBzaW1pbGFyIHRvIHNvY2tldCBkaXNwYXRjaGVyXHJcbiAgICAgIGxldCB2YWxpZGF0aW9uRXJyb3IgPSB2YWxpZGF0aW9uSG9va0Vycm9yKGNvbmZpZywgeyB0eXBlOiBhY3Rpb24gKyAnXycgKyBuYW1lLCBkYXRhOiBwYXlsb2FkIH0pO1xyXG4gICAgICBpZiAodmFsaWRhdGlvbkVycm9yKSB7XHJcbiAgICAgICAgbGV0IGZhaWxlZFZhbGlkYXRpb25BY3Rpb24gPSB7XHJcbiAgICAgICAgICB0eXBlOiAoYWN0aW9uID8gYWN0aW9uICsgJ18nICsgbmFtZSA6IG5hbWUpICsgJ19GQUlMRUQnLFxyXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yOiB2YWxpZGF0aW9uRXJyb3JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuX3RlbXBJZCkgZmFpbGVkVmFsaWRhdGlvbkFjdGlvbi5fdGVtcElkID0gZGF0YS5fdGVtcElkO1xyXG4gICAgICAgIGRpc3BhdGNoKGZhaWxlZFZhbGlkYXRpb25BY3Rpb24pO1xyXG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7IGVycjogdmFsaWRhdGlvbkVycm9yLCByZXM6IG51bGwgfTtcclxuICAgICAgfVxyXG4gICAgICBwYXlsb2FkID0gc3RyaXBMb2NhbEZpZWxkcyhjb25maWcsIHBheWxvYWQpO1xyXG4gICAgICBjb25maWcuZmV0Y2hGdW5jdGlvbihcclxuICAgICAgICBidWlsZFVSTChjb25maWcsIGFjdGlvbiwgbmFtZSwgcGF5bG9hZCwgZ2V0RmV0Y2hNZXRob2QoY29uZmlnLCBhY3Rpb24pKSxcclxuICAgICAgICBidWlsZEZldGNoT3B0aW9ucyhjb25maWcsIHBheWxvYWQsIGdldEZldGNoTWV0aG9kKGNvbmZpZywgYWN0aW9uKSlcclxuICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIGlmIChyZXNwb25zZS5vaylcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZXJyb3IgPSByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGxldCBmYWlsZWRBY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgdHlwZTogKGFjdGlvbiA/IGFjdGlvbiArICdfJyArIG5hbWUgOiBuYW1lKSArICdfRkFJTEVEJyxcclxuICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5fdGVtcElkKSBmYWlsZWRBY3Rpb24uX3RlbXBJZCA9IGRhdGEuX3RlbXBJZDtcclxuICAgICAgICAgICAgZGlzcGF0Y2goZmFpbGVkQWN0aW9uKTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgaWYgKGNiKSBjYihlcnJvciwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgbGV0IGNvbXBsZXRlZEFjdGlvbiA9IHtcclxuICAgICAgICAgICAgdHlwZTogKGFjdGlvbiA/IGFjdGlvbiArICdfJyArIG5hbWUgOiBuYW1lKSArICdfQ09NUExFVEVEJyxcclxuICAgICAgICAgICAgZGF0YToganNvblxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuX3RlbXBJZCkgY29tcGxldGVkQWN0aW9uLl90ZW1wSWQgPSBkYXRhLl90ZW1wSWQ7XHJcbiAgICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS5fcmV3cml0ZSAhPT0gJ3VuZGVmaW5lZCcpIGNvbXBsZXRlZEFjdGlvbi5fcmV3cml0ZSA9IGRhdGEuX3Jld3JpdGU7XHJcbiAgICAgICAgICBkaXNwYXRjaChjb21wbGV0ZWRBY3Rpb24pO1xyXG4gICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuICAgICAgICAgIGlmIChjYikgY2IobnVsbCwganNvbik7XHJcbiAgICAgICAgICByZXR1cm4ganNvbjtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==