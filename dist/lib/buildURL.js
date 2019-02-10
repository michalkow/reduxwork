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