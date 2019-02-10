"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validationHookError;

function validationHookError(config, action) {
  if (config.validation && config.validation.hasValidation && config.validation.invalidate) {
    if (config.validation.hasValidation(action)) {
      return config.validation.invalidate(action);
    } else return null;
  } else return null;
}