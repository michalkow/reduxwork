"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectedUpdate;

var _lodash = require("lodash");

function selectedUpdate(config, state, items) {
  var update = {};
  if (state.selected && state.selected[config.keyName]) update.selected = (0, _lodash.find)(items, function (item) {
    return item[config.keyName] == state.selected[config.keyName];
  }) || {};
  return update;
}