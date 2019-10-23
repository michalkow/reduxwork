"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createReducer;var _lodash = require("lodash");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function createReducer(name) {var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var reducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var reducerName = (0, _lodash.toUpper)((0, _lodash.snakeCase)(name));
  return Object.assign(_defineProperty({}, "RESET_".concat(

  reducerName), function RESET_(state) {
    return Object.assign({}, state, _defineProperty({}, name, initialState));
  }),

  (0, _lodash.mapValues)(reducers, function (reducer) {return function (state, action) {
      var instanceState = Object.assign({}, state[name]);
      return Object.assign({}, state, _defineProperty({}, name, reducer(instanceState, action)));
    };}));

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9yZWR1Y2Vycy9jcmVhdGVSZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZVJlZHVjZXIiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmVkdWNlcnMiLCJyZWR1Y2VyTmFtZSIsIk9iamVjdCIsImFzc2lnbiIsInN0YXRlIiwicmVkdWNlciIsImFjdGlvbiIsImluc3RhbmNlU3RhdGUiXSwibWFwcGluZ3MiOiIyR0FBQSxnQzs7QUFFZSxTQUFTQSxhQUFULENBQXVCQyxJQUF2QixFQUErRCxLQUFsQ0MsWUFBa0MsdUVBQW5CLEVBQW1CLEtBQWZDLFFBQWUsdUVBQUosRUFBSTtBQUM1RSxNQUFNQyxXQUFXLEdBQUcscUJBQVEsdUJBQVVILElBQVYsQ0FBUixDQUFwQjtBQUNBLFNBQU9JLE1BQU0sQ0FBQ0MsTUFBUDs7QUFFT0YsRUFBQUEsV0FGUCxtQkFFc0JHLEtBRnRCLEVBRTZCO0FBQzlCLFdBQU9GLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JDLEtBQWxCLHNCQUE0Qk4sSUFBNUIsRUFBbUNDLFlBQW5DLEVBQVA7QUFDRCxHQUpFOztBQU1MLHlCQUFVQyxRQUFWLEVBQW9CLFVBQUFLLE9BQU8sVUFBSSxVQUFDRCxLQUFELEVBQVFFLE1BQVIsRUFBbUI7QUFDaEQsVUFBTUMsYUFBYSxHQUFHTCxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCQyxLQUFLLENBQUNOLElBQUQsQ0FBdkIsQ0FBdEI7QUFDQSxhQUFPSSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCQyxLQUFsQixzQkFBNEJOLElBQTVCLEVBQW1DTyxPQUFPLENBQUNFLGFBQUQsRUFBZ0JELE1BQWhCLENBQTFDLEVBQVA7QUFDRCxLQUgwQixFQUEzQixDQU5LLENBQVA7O0FBV0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b1VwcGVyLCBzbmFrZUNhc2UsIG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyKG5hbWUsIGluaXRpYWxTdGF0ZSA9IHt9LCByZWR1Y2VycyA9IHt9KSB7XHJcbiAgY29uc3QgcmVkdWNlck5hbWUgPSB0b1VwcGVyKHNuYWtlQ2FzZShuYW1lKSk7XHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICB7XHJcbiAgICAgIFtgUkVTRVRfJHtyZWR1Y2VyTmFtZX1gXShzdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBbbmFtZV06IGluaXRpYWxTdGF0ZSB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1hcFZhbHVlcyhyZWR1Y2VycywgcmVkdWNlciA9PiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZVN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGVbbmFtZV0pO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgW25hbWVdOiByZWR1Y2VyKGluc3RhbmNlU3RhdGUsIGFjdGlvbikgfSk7XHJcbiAgICB9KVxyXG4gICk7XHJcbn0iXX0=