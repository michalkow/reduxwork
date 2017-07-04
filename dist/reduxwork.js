(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["reduxwork"] = factory(require("lodash"));
	else
		root["reduxwork"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchDispatcher;

var _buildFetchOptions = __webpack_require__(10);

var _buildFetchOptions2 = _interopRequireDefault(_buildFetchOptions);

var _buildURL = __webpack_require__(11);

var _buildURL2 = _interopRequireDefault(_buildURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchDispatcher(config, action, name, dispatch, payload, cb, options) {
  action = action.toUpperCase();
  if (!config) config = {};
  if (config.fetchFunction) {
    return new Promise(function (resolve, reject) {
      config.fetchFunction((0, _buildURL2.default)(config, action, name, payload), (0, _buildFetchOptions2.default)(config, action, payload)).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.err) {
          dispatch({
            type: action + '_' + name.toUpperCase() + '_FAILED',
            error: json.err
          });
          reject(json.err);
        } else {
          dispatch({
            type: action + '_' + name.toUpperCase() + '_COMPLETED',
            data: json
          });
          resolve(json);
        }
        if (cb) cb(json.err, json);
        return cb;
      });
    });
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = buildFetchGetAction;

var _fetchDispatcher = __webpack_require__(0);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildFetchGetAction(config, action, name, params, query, cb, options) {
  if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
    var id = params;
    params = {};
    params[config.idName] = id;
  }
  if (typeof query === "function") {
    cb = query;
    query = null;
  }
  return function (dispatch) {
    var actionData = { type: action + '_' + name.toUpperCase() };
    if (query) actionData.query = query;
    if (params) actionData.params = params;
    dispatch(actionData);
    return (0, _fetchDispatcher2.default)(config, action, name.toUpperCase(), dispatch, { params: params, query: query }, cb, options);
  };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildAction;

var _socketDispatcher = __webpack_require__(4);

var _socketDispatcher2 = _interopRequireDefault(_socketDispatcher);

var _fetchDispatcher = __webpack_require__(0);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildAction(config, action, name, data, cb, options) {
  return function (dispatch) {
    var actionData = {
      type: action + '_' + name.toUpperCase(),
      data: data
    };
    dispatch(actionData);

    if (options.type == "socket") return (0, _socketDispatcher2.default)(config, action, name.toUpperCase(), dispatch, data, cb, options);else if (options.type == "fetch") return (0, _fetchDispatcher2.default)(config, action, name.toUpperCase(), dispatch, data, cb, options);
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socketDispatcher;
function socketDispatcher(config, action, name, dispatch, payload, cb, options) {
  action = action.toUpperCase();
  if (!config) config = {};
  if (!config.eventName) config.eventName = "redux_action_event";
  if (config.socketIoFunction) {
    var actionData = {
      type: action + '_' + name
    };
    if (payload) actionData.data = payload;

    return new Promise(function (resolve, reject) {
      config.socketIoFunction(config.eventName, actionData, function (err, res) {
        if (err) {
          dispatch({
            type: action + '_' + name + '_FAILED',
            error: err
          });
          reject(err);
        } else {
          dispatch({
            type: action + '_' + name + '_COMPLETED',
            data: res
          });
          resolve(res);
        }
        if (cb) cb(err, res);
        return cb;
      });
    });
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createAction = __webpack_require__(7);

var _createAction2 = _interopRequireDefault(_createAction);

var _createLocalActions = __webpack_require__(8);

var _createLocalActions2 = _interopRequireDefault(_createLocalActions);

var _createIoActions = __webpack_require__(9);

var _createGetAction = __webpack_require__(12);

var _createPostAction = __webpack_require__(13);

var _createReducer = __webpack_require__(14);

var _createReducer2 = _interopRequireDefault(_createReducer);

var _createIoReducers = __webpack_require__(15);

var _createIoReducers2 = _interopRequireDefault(_createIoReducers);

var _createLocalReducers = __webpack_require__(16);

var _createLocalReducers2 = _interopRequireDefault(_createLocalReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduxwork = {
	createAction: _createAction2.default,
	createLocalActions: _createLocalActions2.default,
	createSocketActions: _createIoActions.createSocketActions,
	createFetchActions: _createIoActions.createFetchActions,
	createIoActions: _createIoActions.createIoActions,
	createSocketGetAction: _createGetAction.createSocketGetAction,
	createFetchGetAction: _createGetAction.createFetchGetAction,
	createGetAction: _createGetAction.createGetAction,
	createSocketPostAction: _createPostAction.createSocketPostAction,
	createFetchPostAction: _createPostAction.createFetchPostAction,
	createPostAction: _createPostAction.createPostAction,
	createReducer: _createReducer2.default,
	createIoReducers: _createIoReducers2.default,
	createLocalReducers: _createLocalReducers2.default
};

exports.default = reduxwork;

exports.createAction = _createAction2.default;
exports.createLocalActions = _createLocalActions2.default;
exports.createSocketActions = _createIoActions.createSocketActions;
exports.createFetchActions = _createIoActions.createFetchActions;
exports.createIoActions = _createIoActions.createIoActions;
exports.createSocketGetAction = _createGetAction.createSocketGetAction;
exports.createFetchGetAction = _createGetAction.createFetchGetAction;
exports.createGetAction = _createGetAction.createGetAction;
exports.createSocketPostAction = _createPostAction.createSocketPostAction;
exports.createFetchPostAction = _createPostAction.createFetchPostAction;
exports.createPostAction = _createPostAction.createPostAction;
exports.createReducer = _createReducer2.default;
exports.createIoReducers = _createIoReducers2.default;
exports.createLocalReducers = _createLocalReducers2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAction;
function createAction(name, binding) {
  return function (data) {
    var action = { type: name };
    if (binding) action[binding] = data;
    return action;
  };
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLocalActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createLocalActions(config, name, options) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, 'clear' + name, function undefined() {
    return {
      type: 'CLEAR_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, 'reset' + name, function undefined() {
    return {
      type: 'RESET_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, 'select' + name, function undefined(selected) {
    return {
      type: 'SELECT_' + name.toUpperCase(),
      selected: selected
    };
  }), _defineProperty(_ref, 'create' + name, function undefined(data) {
    return {
      type: 'CREATE_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, 'update' + name, function undefined(data) {
    return {
      type: 'UPDATE_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, 'destroy' + name, function undefined(data) {
    return {
      type: 'DESTROY_' + name.toUpperCase(),
      data: data
    };
  }), _ref;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketActions = createSocketActions;
exports.createFetchActions = createFetchActions;
exports.createIoActions = createIoActions;

var _buildFetchGetAction = __webpack_require__(2);

var _buildFetchGetAction2 = _interopRequireDefault(_buildFetchGetAction);

var _buildAction = __webpack_require__(3);

var _buildAction2 = _interopRequireDefault(_buildAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSocketActions(config, name, options) {
  var _ref;

  if (!options) options = {};
  options.type = "socket";
  return _ref = {}, _defineProperty(_ref, 'clear' + name, function undefined() {
    return {
      type: 'CLEAR_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, 'reset' + name, function undefined() {
    return {
      type: 'RESET_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, 'select' + name, function undefined(selected) {
    return {
      type: 'SELECT_' + name.toUpperCase(),
      selected: selected
    };
  }), _defineProperty(_ref, 'find' + name, function undefined(data, cb) {
    var action = "FIND";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _defineProperty(_ref, 'sync' + name, function undefined(data, cb) {
    var action = "SYNC";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _defineProperty(_ref, 'create' + name, function undefined(data, cb) {
    var action = "CREATE";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _defineProperty(_ref, 'update' + name, function undefined(data, cb, mod) {
    var action = "UPDATE";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _defineProperty(_ref, 'destroy' + name, function undefined(data, cb) {
    var action = "DESTROY";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _ref;
}

function createFetchActions(config, name, options) {
  var _ref2;

  if (!options) options = {};
  options.type = "fetch";
  return _ref2 = {}, _defineProperty(_ref2, 'clear' + name, function undefined() {
    return {
      type: 'CLEAR_' + name.toUpperCase()
    };
  }), _defineProperty(_ref2, 'reset' + name, function undefined() {
    return {
      type: 'RESET_' + name.toUpperCase()
    };
  }), _defineProperty(_ref2, 'select' + name, function undefined(selected) {
    return {
      type: 'SELECT_' + name.toUpperCase(),
      selected: selected
    };
  }), _defineProperty(_ref2, 'find' + name, function undefined(params, query, cb) {
    var action = "FIND";
    return (0, _buildFetchGetAction2.default)(config, action, name, params, query, cb, options);
  }), _defineProperty(_ref2, 'sync' + name, function undefined(params, query, cb) {
    var action = "SYNC";
    return (0, _buildFetchGetAction2.default)(config, action, name, params, query, cb, options);
  }), _defineProperty(_ref2, 'create' + name, function undefined(data, cb) {
    var action = "CREATE";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _defineProperty(_ref2, 'update' + name, function undefined(data, cb, mod) {
    var action = "UPDATE";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _defineProperty(_ref2, 'destroy' + name, function undefined(data, cb) {
    var action = "DESTROY";
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  }), _ref2;
}

function createIoActions(config, name, options) {
  if (options.type == "socket") return createSocketActions(config, name, options);
  if (options.type == "fetch") return createFetchActions(config, name, options);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFetchOptions;
var fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

function buildFetchOptions(options, action, payload) {
  var fetchOptions = options.fetchOptions || fetchDefaults;
  if (action == 'GET' || action == 'FIND' || action == 'SYNC') fetchOptions.method = 'GET';else if (action == 'POST' || action == 'CREATE') fetchOptions.method = 'POST';else if (action == 'UPDATE') fetchOptions.method = 'PUT';else if (action == 'DESTROY') fetchOptions.method = 'DELETE';else fetchOptions.method = 'POST';
  if (fetchOptions.method != 'GET') fetchOptions.body = JSON.stringify(payload);
  return fetchOptions;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
function buildURL(config, action, name, payload) {
  var id = null;
  var url = config.baseURL;
  if (payload.params && payload.params[config.idName]) id = payload.params[config.idName];
  if (config.customUrl) {
    url += config.customUrl;
    for (var k in payload.params) {
      url = url.replace('%' + k, payload.params[k]);
    }
    if (payload.query) {
      var first = true;
      url += '/';
      for (var q in payload.query) {
        if (first) {
          url += '?' + q + '=' + payload.query[q];
          first = false;
        } else url += '&' + q + '=' + payload.query[q];
      }
    }
  } else {
    url += id ? '/' + name.toLowerCase() + '/' + action.toLowerCase() + '/' + id : '/' + name.toLowerCase() + '/' + action.toLowerCase();
    if (payload.query) {
      var _first = true;
      url += '/';
      for (var q in payload.query) {
        if (_first) {
          url += '?' + q + '=' + payload.query[q];
          _first = false;
        } else url += '&' + q + '=' + payload.query[q];
      }
    }
  }
  return url;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketGetAction = createSocketGetAction;
exports.createFetchGetAction = createFetchGetAction;
exports.createGetAction = createGetAction;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _buildFetchGetAction = __webpack_require__(2);

var _buildFetchGetAction2 = _interopRequireDefault(_buildFetchGetAction);

var _buildAction = __webpack_require__(3);

var _buildAction2 = _interopRequireDefault(_buildAction);

var _socketDispatcher = __webpack_require__(4);

var _socketDispatcher2 = _interopRequireDefault(_socketDispatcher);

var _fetchDispatcher = __webpack_require__(0);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketGetAction(config, name, options) {
  var action = "GET";
  if (!options) options = {};
  options.type = "socket";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, action, name, params, query, cb, options);
  };
}

function createFetchGetAction(config, name, options) {
  var action = "GET";
  if (!options) options = {};
  options.type = "fetch";
  return function (parama, query, cb) {
    return (0, _buildFetchGetAction2.default)(config, action, name, params, query, cb, options);
  };
}

function createGetAction(config, name, options) {
  if (options.type == "socket") return createSocketGetAction(config, name, options);
  if (options.type == "fetch") return createFetchGetAction(config, name, options);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketPostAction = createSocketPostAction;
exports.createFetchPostAction = createFetchPostAction;
exports.createPostAction = createPostAction;

var _buildFetchGetAction = __webpack_require__(2);

var _buildFetchGetAction2 = _interopRequireDefault(_buildFetchGetAction);

var _buildAction = __webpack_require__(3);

var _buildAction2 = _interopRequireDefault(_buildAction);

var _socketDispatcher = __webpack_require__(4);

var _socketDispatcher2 = _interopRequireDefault(_socketDispatcher);

var _fetchDispatcher = __webpack_require__(0);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketPostAction(config, name, options) {
  var action = "POST";
  if (!options) options = {};
  options.type = "socket";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  };
}

function createFetchPostAction(config, name, options) {
  var action = "POST";
  if (!options) options = {};
  options.type = "fetch";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, action, name, data, cb, options);
  };
}

function createPostAction(config, name, options) {
  if (options.type == "socket") return createSocketPostAction(config, name, options);
  if (options.type == "fetch") return createFetchPostAction(config, name, options);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createReducer(config, name, customState, customActions, options) {
  if (!customState) customState = {};
  if (!customActions) customActions = {};
  var initialState = Object.assign({}, customState);
  name = _lodash2.default.toUpper(_lodash2.default.snakeCase(name));
  return function () {
    var rState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var rAction = arguments[1];

    var defaultActions = Object.assign(_defineProperty({}, 'RESET_' + name, function undefined(state, action) {
      return Object.assign({}, initialState);
    }));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIoReducers;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createIoReducers(config, name, customState, customActions, options) {
  options = Object.assign({ keyName: "id" }, options);
  if (!customState) customState = {};
  if (!customActions) customActions = {};
  var initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    params: null,
    isFinding: false,
    isSyncing: false,
    isWritting: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    error: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: []
  }, customState);
  name = _lodash2.default.toUpper(_lodash2.default.snakeCase(name));

  return function () {
    var _Object$assign;

    var rState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var rAction = arguments[1];

    var defaultActions = Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, 'FIND_' + name, function undefined(state, action) {
      var find = {
        isFinding: true,
        findError: null
      };
      find.query = action.query || null;
      find.params = action.params || null;
      if (!_lodash2.default.isEqual(find.query, state.query) || !_lodash2.default.isEqual(find.params, state.params)) find.items = [];
      return Object.assign({}, state, find);
    }), _defineProperty(_Object$assign, 'FIND_' + name + '_FAILED', function undefined(state, action) {
      return Object.assign({}, state, {
        findError: action.error,
        isFinding: false
      });
    }), _defineProperty(_Object$assign, 'FIND_' + name + '_COMPLETED', function undefined(state, action) {
      return Object.assign({}, state, {
        init: true,
        isFinding: false,
        findError: null,
        items: action.data
      });
    }), _defineProperty(_Object$assign, 'SYNC_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        isSyncing: true,
        syncError: null
      });
    }), _defineProperty(_Object$assign, 'SYNC_' + name + '_FAILED', function undefined(state, action) {
      return Object.assign({}, state, {
        syncError: action.error,
        isSyncing: false
      });
    }), _defineProperty(_Object$assign, 'SYNC_' + name + '_COMPLETED', function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var items = _lodash2.default.unionBy(data, [].concat(_toConsumableArray(state.items)), options.keyName);
      return Object.assign({}, state, {
        isSyncing: false,
        syncError: null,
        init: true,
        items: items
      });
    }), _defineProperty(_Object$assign, 'RECEIVE_' + name, function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var items = _lodash2.default.unionBy(data, [].concat(_toConsumableArray(state.items)), options.keyName);
      return Object.assign({}, state, {
        items: items
      });
    }), _defineProperty(_Object$assign, 'CREATE_' + name, function undefined(state, action) {
      var item = Object.assign({}, action.data, { _temp: true });

      return Object.assign({}, state, {
        isWritting: true,
        items: [].concat(_toConsumableArray(state.items), [item])
      });
    }), _defineProperty(_Object$assign, 'CREATE_' + name + '_FAILED', function undefined(state, action) {
      var items = state.items.filter(function (obj) {
        return obj[options.keyName] !== action.tempId;
      });
      return Object.assign({}, state, {
        isWritting: false,
        items: items,
        writeError: action.error
      });
    }), _defineProperty(_Object$assign, 'CREATE_' + name + '_COMPLETED', function undefined(state, action) {
      var items = state.items.filter(function (obj) {
        return obj[options.keyName] !== action.tempId;
      });
      return Object.assign({}, state, {
        isWritting: false,
        writeError: null,
        items: [].concat(_toConsumableArray(items), [action.data])
      });
    }), _defineProperty(_Object$assign, 'UPDATE_' + name, function undefined(state, action) {
      var update = {
        isWritting: true
      };
      if (_lodash2.default.isObject(action.data) && action.data[options.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        var updatedItem = _lodash2.default.find(items, function (item) {
          return item[options.keyName] == action.data[options.keyName];
        });
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[options.keyName] == action.data[options.keyName];
        }), 1, Object.assign({}, updatedItem, action.data));
        update.updatedItem = updatedItem;
        update.items = items;
      }
      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'UPDATE_' + name + '_FAILED', function undefined(state, action) {
      var update = {
        isWritting: false,
        updateError: action.error,
        updatedItem: null
      };
      if (state.updatedItem && state.updatedItem[options.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[options.keyName] == state.updatedItem[options.keyName];
        }), 1, state.updatedItem);
        update.items = items;
      }
      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'UPDATE_' + name + '_COMPLETED', function undefined(state, action) {
      var update = {
        isWritting: false,
        updateError: null,
        updatedItem: null
      };
      if (action.rewrite || options.rewriteOnUpdate) {
        var items = [].concat(_toConsumableArray(state.items));
        var data = action.data;
        if (!_lodash2.default.isArray(data)) data = [data];
        update.items = _lodash2.default.unionBy(data, items, options.keyName);
      }

      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'DESTROY_' + name, function undefined(state, action) {
      var update = {
        isWritting: true
      };
      if (action.data[options.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        update.destroyedItem = _lodash2.default.find(items, function (item) {
          return item[options.keyName] == action.data[options.keyName];
        });
        update.destroyedItemIndex = _lodash2.default.findIndex(items, function (item) {
          return item[options.keyName] == action.data[options.keyName];
        });
        items.splice(update.destroyedItemIndex, 1);
        update.items = items;
      }
      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'DESTROY_' + name + '_FAILED', function undefined(state, action) {
      var update = {
        isWritting: false,
        destroyError: action.error,
        destroyedItem: null,
        destroyedItemIndex: null
      };
      if (state.destroyedItem && state.destroyedItemIndex != null) {
        var items = [].concat(_toConsumableArray(state.items));
        items.splice(state.destroyedItemIndex, 0, state.destroyedItem);
        update.items = items;
      }
      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'DESTROY_' + name + '_COMPLETED', function undefined(state, action) {
      return Object.assign({}, state, {
        isWritting: false,
        destroyError: null,
        destroyedItem: null,
        destroyedItemIndex: null
      });
    }), _defineProperty(_Object$assign, 'CLEAR_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        items: []
      });
    }), _defineProperty(_Object$assign, 'SELECT_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        selected: action.data
      });
    }), _defineProperty(_Object$assign, 'RESET_' + name, function undefined(state, action) {
      return Object.assign({}, initialState);
    }), _Object$assign));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLocalReducers;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createLocalReducers(config, name, customState, customActions, options) {
  options = Object.assign({ keyName: "id" }, options);
  if (!customState) customState = {};
  if (!customActions) customActions = {};
  var initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
    params: null,
    isFinding: false,
    isSyncing: false,
    isWritting: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    error: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: []
  }, customState);
  name = _lodash2.default.toUpper(_lodash2.default.snakeCase(name));

  return function () {
    var _Object$assign;

    var rState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var rAction = arguments[1];

    var defaultActions = Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, 'FIND_' + name, function undefined(state, action) {
      var find = {
        isFinding: true,
        findError: null
      };
      find.query = action.query || null;
      find.params = action.params || null;
      if (!_lodash2.default.isEqual(find.query, state.query) || !_lodash2.default.isEqual(find.params, state.params)) find.items = [];
      return Object.assign({}, state, find);
    }), _defineProperty(_Object$assign, 'FIND_' + name + '_FAILED', function undefined(state, action) {
      return Object.assign({}, state, {
        findError: action.error,
        isFinding: false
      });
    }), _defineProperty(_Object$assign, 'FIND_' + name + '_COMPLETED', function undefined(state, action) {
      return Object.assign({}, state, {
        init: true,
        isFinding: false,
        findError: null,
        items: action.data
      });
    }), _defineProperty(_Object$assign, 'SYNC_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        isSyncing: true,
        syncError: null
      });
    }), _defineProperty(_Object$assign, 'SYNC_' + name + '_FAILED', function undefined(state, action) {
      return Object.assign({}, state, {
        syncError: action.error,
        isSyncing: false
      });
    }), _defineProperty(_Object$assign, 'SYNC_' + name + '_COMPLETED', function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var items = _lodash2.default.unionBy(data, [].concat(_toConsumableArray(state.items)), config.keyName);
      return Object.assign({}, state, {
        isSyncing: false,
        syncError: null,
        init: true,
        items: items
      });
    }), _defineProperty(_Object$assign, 'RECEIVE_' + name, function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var items = _lodash2.default.unionBy(data, [].concat(_toConsumableArray(state.items)), config.keyName);
      return Object.assign({}, state, {
        items: items
      });
    }), _defineProperty(_Object$assign, 'CREATE_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        items: [].concat(_toConsumableArray(state.items), [action.data])
      });
    }), _defineProperty(_Object$assign, 'UPDATE_' + name, function undefined(state, action) {
      var update = {};
      if (_lodash2.default.isObject(action.data) && action.data[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        var updatedItem = _lodash2.default.find(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
        });
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
        }), 1, Object.assign({}, updatedItem, action.data));
        update.items = items;
      }
      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'DESTROY_' + name, function undefined(state, action) {
      var update = {};
      if (action.data[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        var destroyedItem = _lodash2.default.find(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
        });
        items.splice(destroyedItemIndex, 1);
        update.items = items;
      }
      return Object.assign({}, state, update);
    }), _defineProperty(_Object$assign, 'CLEAR_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        items: []
      });
    }), _defineProperty(_Object$assign, 'SELECT_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        selected: action.data
      });
    }), _defineProperty(_Object$assign, 'RESET_' + name, function undefined(state, action) {
      return Object.assign({}, initialState);
    }), _Object$assign));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}

/***/ })
/******/ ]);
});