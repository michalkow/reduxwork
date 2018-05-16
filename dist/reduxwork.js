(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["reduxwork"] = factory(require("lodash"));
	else
		root["reduxwork"] = factory(root["_"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildAction;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _socketDispatcher = __webpack_require__(3);

var _socketDispatcher2 = _interopRequireDefault(_socketDispatcher);

var _fetchDispatcher = __webpack_require__(4);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildAction(config, action, name, data, cb) {
  return function (dispatch) {
    if (config.addKeyOnCreate && action == "CREATE") {
      var keyName = config.keyName || 'id';
      var prefix = config.localPrefix || 'local';
      var prefixedKeyName = prefix + _lodash2.default.upperFirst(keyName);
      if (!data[keyName] && !data[prefixedKeyName]) {
        data._tempId = new Date().getTime();
        data[prefixedKeyName] = data._tempId;
      }
    }
    var formatedName = _lodash2.default.snakeCase(name).toUpperCase();
    var actionData = {
      type: action ? action + '_' + formatedName : formatedName,
      data: data && data._tempId ? _lodash2.default.omit(data, '_tempId') : data
    };
    dispatch(actionData);

    if (config.type == "socket") return (0, _socketDispatcher2.default)(config, action, formatedName, dispatch, data, cb);else if (config.type == "fetch") return (0, _fetchDispatcher2.default)(config, action, formatedName, dispatch, data, cb);
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripFields = stripFields;
exports.parseFields = parseFields;
exports.stripVirtualFields = stripVirtualFields;
exports.stripLocalFields = stripLocalFields;
exports.parseVirtualFields = parseVirtualFields;
exports.parseLocalFields = parseLocalFields;
exports.stripVirtualParseLocalFields = stripVirtualParseLocalFields;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripFields(config, data, prefix) {
  if (!config) config = {};
  var prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual'
  };

  return _lodash2.default.omitBy(data, function (val, key) {
    return _lodash2.default.startsWith(key, prefixes[prefix]);
  });
}

function parseFields(config, data, prefix) {
  if (!config) config = {};
  var prefixes = {
    local: config.localPrefix || 'local',
    virtual: config.virtualPrefix || 'virtual'
  };

  return _lodash2.default.mapKeys(data, function (val, key) {
    return _lodash2.default.startsWith(key, prefixes[prefix]) ? _lodash2.default.lowerFirst(_lodash2.default.replace(key, prefixes[prefix], '')) : key;
  });
}

function stripVirtualFields(config, data) {
  return stripFields(config, data, 'virtual');
}

function stripLocalFields(config, data) {
  return stripFields(config, data, 'local');
}

function parseVirtualFields(config, data) {
  return parseFields(config, data, 'virtual');
}

function parseLocalFields(config, data) {
  return parseFields(config, data, 'local');
}

function stripVirtualParseLocalFields(config, data) {
  return parseFields(config, stripFields(config, data, 'virtual'), 'local');
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socketDispatcher;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _fieldsOperations = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function socketDispatcher(config, action, name, dispatch, data, cb) {
  var payload = data && (data._tempId || data._rewrite) ? _lodash2.default.omit(data, ['_tempId', '_rewrite']) : data;
  payload = (0, _fieldsOperations.stripLocalFields)(config, payload);

  if (action) action = action.toUpperCase();
  if (!config) config = {};
  if (!config.eventName) config.eventName = "redux_action_event";
  if (config.socketIoFunction) {
    var actionData = {
      type: action ? action + '_' + name : name
    };
    if (payload) actionData.data = payload;
    if (config.actionInject) actionData = config.actionInject(actionData);

    return new Promise(function (resolve, reject) {
      config.socketIoFunction(config.eventName, actionData, function (err, res) {
        if (err) {
          var failedAction = {
            type: (action ? action + '_' + name : name) + '_FAILED',
            error: err
          };
          if (data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(err);
        } else {
          var completedAction = {
            type: (action ? action + '_' + name : name) + '_COMPLETED',
            data: res
          };
          if (data && data._tempId) completedAction._tempId = data._tempId;
          if (data && typeof data._rewrite !== "undefined") completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(res);
        }
        if (cb) cb(err, res);
        return { err: err, res: res };
      });
    });
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchDispatcher;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _buildFetchOptions = __webpack_require__(10);

var _buildFetchOptions2 = _interopRequireDefault(_buildFetchOptions);

var _buildURL = __webpack_require__(11);

var _buildURL2 = _interopRequireDefault(_buildURL);

var _getFetchMethod = __webpack_require__(12);

var _getFetchMethod2 = _interopRequireDefault(_getFetchMethod);

var _fieldsOperations = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchDispatcher(config, action, name, dispatch, data, cb) {
  var payload = data && (data._tempId || data._rewrite) ? _lodash2.default.omit(data, ['_tempId', '_rewrite']) : data;
  payload = (0, _fieldsOperations.stripLocalFields)(config, payload);

  action = action.toUpperCase();
  if (!config) config = {};
  if (config.fetchFunction) {
    return new Promise(function (resolve, reject) {
      if (config.actionInject) payload = config.actionInject(payload);
      config.fetchFunction((0, _buildURL2.default)(config, action, name, payload, (0, _getFetchMethod2.default)(config, action)), (0, _buildFetchOptions2.default)(config, payload, (0, _getFetchMethod2.default)(config, action))).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.err) {
          var failedAction = {
            type: (action ? action + '_' + name : name) + '_FAILED',
            error: json.err
          };
          if (data && data._tempId) failedAction._tempId = data._tempId;
          dispatch(failedAction);
          reject(json.err);
        } else {
          var completedAction = {
            type: (action ? action + '_' + name : name) + '_COMPLETED',
            data: json
          };
          if (data && data._tempId) completedAction._tempId = data._tempId;
          if (data && typeof data._rewrite !== "undefined") completedAction._rewrite = data._rewrite;
          dispatch(completedAction);
          resolve(json);
        }
        if (cb) cb(json.err, json);
        return json;
      });
    });
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = selectedUpdate;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectedUpdate(config, state, items) {
	var update = {};
	if (state.selected && state.selected[config.keyName]) update.selected = _lodash2.default.find(items, function (item) {
		return item[config.keyName] == state.selected[config.keyName];
	});
	return update;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createAction = __webpack_require__(8);

var _createAction2 = _interopRequireDefault(_createAction);

var _createSocketAction = __webpack_require__(9);

var _createSocketAction2 = _interopRequireDefault(_createSocketAction);

var _createLocalActions = __webpack_require__(13);

var _createLocalActions2 = _interopRequireDefault(_createLocalActions);

var _createIoActions = __webpack_require__(14);

var _createGetAction = __webpack_require__(15);

var _createPostAction = __webpack_require__(16);

var _createReducer = __webpack_require__(17);

var _createReducer2 = _interopRequireDefault(_createReducer);

var _createIoReducers = __webpack_require__(18);

var _createIoReducers2 = _interopRequireDefault(_createIoReducers);

var _createLocalReducers = __webpack_require__(19);

var _createLocalReducers2 = _interopRequireDefault(_createLocalReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduxwork = {
	createAction: _createAction2.default,
	createSocketAction: _createSocketAction2.default,
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
exports.createSocketAction = _createSocketAction2.default;
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSocketAction;

var _buildAction = __webpack_require__(1);

var _buildAction2 = _interopRequireDefault(_buildAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketAction(config, name) {
  if (!config) config = {};
  config.type = "socket";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, null, name, data, cb);
  };
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

function buildFetchOptions(options, payload, method) {
  var fetchOptions = options.fetchOptions || fetchDefaults;
  fetchOptions.method = method;
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
function buildURL(config, action, name, payload, method) {
  var url = config.baseURL;
  if (config.customUrl) url += config.customUrl;else url += '/' + name.toLowerCase() + '/' + action.toLowerCase();
  if (payload && method == 'GET') {
    var first = true;
    url += '/';
    for (var q in payload) {
      if (first) {
        url += '?' + q + '=' + payload[q];
        first = false;
      } else url += '&' + q + '=' + payload[q];
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
exports.default = getFetchMethod;
function getFetchMethod(config, action) {
  if (config.fetchMethod) return config.fetchMethod;else if (config.fetchOptions && config.fetchOptions.method) return config.fetchOptions.method;else if (action == 'GET' || action == 'FIND' || action == 'SYNC') return 'GET';else if (action == 'POST' || action == 'CREATE') return 'POST';else if (action == 'UPDATE') return 'PUT';else if (action == 'DESTROY') return 'DELETE';else return 'POST';
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLocalActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createLocalActions(config, name) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, 'find' + name, function undefined(data, cb) {
    return {
      type: 'FIND_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, 'sync' + name, function undefined(data, cb) {
    return {
      type: 'SYNC_' + name.toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, 'clear' + name, function undefined() {
    return {
      type: 'CLEAR_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, 'reset' + name, function undefined() {
    return {
      type: 'RESET_' + name.toUpperCase()
    };
  }), _defineProperty(_ref, 'select' + name, function undefined(data) {
    return {
      type: 'SELECT_' + name.toUpperCase(),
      data: data
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketActions = createSocketActions;
exports.createFetchActions = createFetchActions;
exports.createIoActions = createIoActions;

var _buildAction = __webpack_require__(1);

var _buildAction2 = _interopRequireDefault(_buildAction);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createSocketActions(config, name) {
  var _ref;

  if (!config) config = {};
  config.type = "socket";
  return _ref = {}, _defineProperty(_ref, 'clear' + name, function undefined() {
    return {
      type: 'CLEAR_' + _lodash2.default.snakeCase(name).toUpperCase()
    };
  }), _defineProperty(_ref, 'reset' + name, function undefined() {
    return {
      type: 'RESET_' + _lodash2.default.snakeCase(name).toUpperCase()
    };
  }), _defineProperty(_ref, 'select' + name, function undefined(data) {
    return {
      type: 'SELECT_' + _lodash2.default.snakeCase(name).toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref, 'find' + name, function undefined(data, cb) {
    var action = "FIND";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, 'sync' + name, function undefined(data, cb) {
    var action = "SYNC";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, 'create' + name, function undefined(data, cb) {
    var action = "CREATE";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, 'update' + name, function undefined(data, cb, mod) {
    var action = "UPDATE";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref, 'destroy' + name, function undefined(data, cb) {
    var action = "DESTROY";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _ref;
}

function createFetchActions(config, name) {
  var _ref2;

  if (!config) config = {};
  config.type = "fetch";
  return _ref2 = {}, _defineProperty(_ref2, 'clear' + name, function undefined() {
    return {
      type: 'CLEAR_' + _lodash2.default.snakeCase(name).toUpperCase()
    };
  }), _defineProperty(_ref2, 'reset' + name, function undefined() {
    return {
      type: 'RESET_' + _lodash2.default.snakeCase(name).toUpperCase()
    };
  }), _defineProperty(_ref2, 'select' + name, function undefined(data) {
    return {
      type: 'SELECT_' + _lodash2.default.snakeCase(name).toUpperCase(),
      data: data
    };
  }), _defineProperty(_ref2, 'find' + name, function undefined(data, cb) {
    var action = "FIND";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, 'sync' + name, function undefined(data, cb) {
    var action = "SYNC";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, 'create' + name, function undefined(data, cb) {
    var action = "CREATE";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, 'update' + name, function undefined(data, cb, mod) {
    var action = "UPDATE";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _defineProperty(_ref2, 'destroy' + name, function undefined(data, cb) {
    var action = "DESTROY";
    return (0, _buildAction2.default)(config, action, name, data, cb);
  }), _ref2;
}

function createIoActions(config, name) {
  if (config.type == "socket") return createSocketActions(config, name);
  if (config.type == "fetch") return createFetchActions(config, name);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketGetAction = createSocketGetAction;
exports.createFetchGetAction = createFetchGetAction;
exports.createGetAction = createGetAction;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _buildAction = __webpack_require__(1);

var _buildAction2 = _interopRequireDefault(_buildAction);

var _socketDispatcher = __webpack_require__(3);

var _socketDispatcher2 = _interopRequireDefault(_socketDispatcher);

var _fetchDispatcher = __webpack_require__(4);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketGetAction(config, name) {
  var action = "GET";
  if (!config) config = {};
  config.type = "socket";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, action, name, data, cb);
  };
}

function createFetchGetAction(config, name) {
  var action = "GET";
  if (!config) config = {};
  config.type = "fetch";
  return function (parama, query, cb) {
    return (0, _buildAction2.default)(config, action, name, data, cb);
  };
}

function createGetAction(config, name) {
  if (config.type == "socket") return createSocketGetAction(config, name);
  if (config.type == "fetch") return createFetchGetAction(config, name);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketPostAction = createSocketPostAction;
exports.createFetchPostAction = createFetchPostAction;
exports.createPostAction = createPostAction;

var _buildAction = __webpack_require__(1);

var _buildAction2 = _interopRequireDefault(_buildAction);

var _socketDispatcher = __webpack_require__(3);

var _socketDispatcher2 = _interopRequireDefault(_socketDispatcher);

var _fetchDispatcher = __webpack_require__(4);

var _fetchDispatcher2 = _interopRequireDefault(_fetchDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSocketPostAction(config, name) {
  var action = "POST";
  if (!config) config = {};
  config.type = "socket";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, action, name, data, cb);
  };
}

function createFetchPostAction(config, name) {
  var action = "POST";
  if (!config) config = {};
  config.type = "fetch";
  return function (data, cb) {
    return (0, _buildAction2.default)(config, action, name, data, cb);
  };
}

function createPostAction(config, name) {
  if (config.type == "socket") return createSocketPostAction(config, name);
  if (config.type == "fetch") return createFetchPostAction(config, name);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createReducer(name, customState, customActions) {
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIoReducers;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _selectedUpdate = __webpack_require__(5);

var _selectedUpdate2 = _interopRequireDefault(_selectedUpdate);

var _fieldsOperations = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createIoReducers(config, name, customState, customActions) {
  if (!config) config = {};
  if (!config.keyName) config.keyName = 'id';
  if (!customState) customState = {};
  if (!customActions) customActions = {};
  var initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
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
      find.query = action.data && !_lodash2.default.isEmpty(action.data) ? action.data : null;
      if (!_lodash2.default.isEqual(find.query, state.query)) find.items = [];
      return Object.assign({}, state, find);
    }), _defineProperty(_Object$assign, 'FIND_' + name + '_FAILED', function undefined(state, action) {
      return Object.assign({}, state, {
        findError: action.error,
        isFinding: false
      });
    }), _defineProperty(_Object$assign, 'FIND_' + name + '_COMPLETED', function undefined(state, action) {
      var selected = (0, _selectedUpdate2.default)(config, state, action.data);
      return Object.assign({}, state, {
        init: true,
        isFinding: false,
        findError: null,
        items: action.data
      }, selected);
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
      var selected = (0, _selectedUpdate2.default)(config, state, items);
      return Object.assign({}, state, {
        isSyncing: false,
        syncError: null,
        init: true,
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, 'RECEIVE_' + name, function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var update = _lodash2.default.map(data, function (obj) {
        var existing = _lodash2.default.find(state.items, function (item) {
          return item[config.keyName] == obj[config.keyName];
        });
        return existing ? Object.assign({}, existing, obj) : obj;
      });
      var items = _lodash2.default.unionBy(update, [].concat(_toConsumableArray(state.items)), config.keyName);
      var selected = (0, _selectedUpdate2.default)(config, state, items);
      return Object.assign({}, state, {
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, 'REMOVE_' + name, function undefined(state, action) {
      var update = {};
      if (action.data[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
        }), 1);
        update.items = items;
      }
      var selected = update.items ? (0, _selectedUpdate2.default)(config, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, 'CREATE_' + name, function undefined(state, action) {
      var item = Object.assign({}, (0, _fieldsOperations.stripVirtualParseLocalFields)(config, action.data), { _temp: true });
      return Object.assign({}, state, {
        isWritting: true,
        items: [].concat(_toConsumableArray(state.items), [item])
      });
    }), _defineProperty(_Object$assign, 'CREATE_' + name + '_FAILED', function undefined(state, action) {
      var items = [].concat(_toConsumableArray(state.items));
      if (action._tempId) {
        items = _lodash2.default.filter(items, function (item) {
          return item[config.keyName] != action._tempId;
        });
      }
      return Object.assign({}, state, {
        isWritting: false,
        items: items,
        writeError: action.error
      });
    }), _defineProperty(_Object$assign, 'CREATE_' + name + '_COMPLETED', function undefined(state, action) {
      var items = [].concat(_toConsumableArray(state.items));
      if (action._tempId) {
        items = _lodash2.default.filter(items, function (item) {
          return item[config.keyName] != action._tempId;
        });
      }
      return Object.assign({}, state, {
        isWritting: false,
        writeError: null,
        items: [].concat(_toConsumableArray(items), [action.data])
      });
    }), _defineProperty(_Object$assign, 'UPDATE_' + name, function undefined(state, action) {
      var update = {
        isWritting: true
      };
      var data = (0, _fieldsOperations.stripVirtualParseLocalFields)(config, action.data);
      if (_lodash2.default.isObject(data) && data[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        var updatedItem = _lodash2.default.find(items, function (item) {
          return item[config.keyName] == data[config.keyName];
        });
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[config.keyName] == data[config.keyName];
        }), 1, Object.assign({}, updatedItem, data));
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
      if (state.updatedItem && state.updatedItem[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[config.keyName] == state.updatedItem[config.keyName];
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
      if (action._rewrite || config.rewriteOnUpdate && action._rewrite !== false) {
        var items = [].concat(_toConsumableArray(state.items));
        var data = action.data;
        if (!_lodash2.default.isArray(data)) data = [data];
        update.items = _lodash2.default.unionBy(data, items, config.keyName);
      }

      var selected = update.items ? (0, _selectedUpdate2.default)(config, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, 'DESTROY_' + name, function undefined(state, action) {
      var update = {
        isWritting: true
      };
      if (action.data[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        update.destroyedItem = _lodash2.default.find(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
        });
        update.destroyedItemIndex = _lodash2.default.findIndex(items, function (item) {
          return item[config.keyName] == action.data[config.keyName];
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
      var selected = (0, _selectedUpdate2.default)(config, state, state.items);
      return Object.assign({}, state, {
        isWritting: false,
        destroyError: null,
        destroyedItem: null,
        destroyedItemIndex: null
      }, selected);
    }), _defineProperty(_Object$assign, 'CLEAR_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        items: [],
        selected: null
      });
    }), _defineProperty(_Object$assign, 'SELECT_' + name, function undefined(state, action) {
      var selected = null;
      if (_lodash2.default.isString(action.data) || _lodash2.default.isNumber(action.data)) selected = _lodash2.default.find(state.items, function (item) {
        return item[config.keyName] == action.data;
      });else if (_lodash2.default.isObject(action.data) && action.data[config.keyName]) selected = _lodash2.default.find(state.items, function (item) {
        return item[config.keyName] == action.data[config.keyName];
      }) || action.data;else selected = action.data;
      return Object.assign({}, state, {
        selected: selected
      });
    }), _defineProperty(_Object$assign, 'RESET_' + name, function undefined(state, action) {
      return Object.assign({}, initialState);
    }), _Object$assign));
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);else return rState;
  };
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createLocalReducers;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _selectedUpdate = __webpack_require__(5);

var _selectedUpdate2 = _interopRequireDefault(_selectedUpdate);

var _fieldsOperations = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createLocalReducers(config, name, customState, customActions) {
  if (!config) config = {};
  if (!config.keyName) config.keyName = 'id';
  if (!customState) customState = {};
  if (!customActions) customActions = {};
  var initialState = Object.assign({}, {
    init: false,
    selected: null,
    query: null,
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
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var selected = (0, _selectedUpdate2.default)(config, state, data);
      return Object.assign({}, state, {
        init: true,
        items: data
      }, selected);
    }), _defineProperty(_Object$assign, 'SYNC_' + name, function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var items = _lodash2.default.unionBy(data, [].concat(_toConsumableArray(state.items)), config.keyName);
      var selected = (0, _selectedUpdate2.default)(config, state, items);
      return Object.assign({}, state, {
        init: true,
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, 'RECEIVE_' + name, function undefined(state, action) {
      var data = action.data;
      if (!_lodash2.default.isArray(data)) data = [data];
      var items = _lodash2.default.unionBy(data, [].concat(_toConsumableArray(state.items)), config.keyName);
      var selected = (0, _selectedUpdate2.default)(config, state, items);
      return Object.assign({}, state, {
        items: items
      }, selected);
    }), _defineProperty(_Object$assign, 'CREATE_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        items: [].concat(_toConsumableArray(state.items), [(0, _fieldsOperations.stripVirtualParseLocalFields)(action.data)])
      });
    }), _defineProperty(_Object$assign, 'UPDATE_' + name, function undefined(state, action) {
      var update = {};
      var data = (0, _fieldsOperations.stripVirtualParseLocalFields)(action.data);
      if (_lodash2.default.isObject(data) && data[config.keyName]) {
        var items = [].concat(_toConsumableArray(state.items));
        var updatedItem = _lodash2.default.find(items, function (item) {
          return item[config.keyName] == data[config.keyName];
        });
        items.splice(_lodash2.default.findIndex(items, function (item) {
          return item[config.keyName] == data[config.keyName];
        }), 1, Object.assign({}, updatedItem, data));
        update.items = items;
      }
      var selected = update.items ? (0, _selectedUpdate2.default)(config, state, update.items) : {};
      return Object.assign({}, state, update, selected);
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
      var selected = update.items ? (0, _selectedUpdate2.default)(config, state, update.items) : {};
      return Object.assign({}, state, update, selected);
    }), _defineProperty(_Object$assign, 'CLEAR_' + name, function undefined(state, action) {
      return Object.assign({}, state, {
        items: [],
        selected: null
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