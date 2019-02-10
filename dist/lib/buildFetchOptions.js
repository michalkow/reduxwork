"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFetchOptions;
var fetchDefaults = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

function buildFetchOptions(options, payload, method) {
  var fetchOptions = options.fetchOptions || fetchDefaults;
  fetchOptions.method = method;
  if (fetchOptions.method != 'GET') fetchOptions.body = JSON.stringify(payload);
  return fetchOptions;
}