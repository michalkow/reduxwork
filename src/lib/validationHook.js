import _ from 'lodash';

export default function validationHookError(config, action, name, data) {
  action = _.camelCase(action);
  name = _.camelCase(name);
  if (config.validation && config.validation.hasValidation && config.validation.invalidate) {
    if (config.validation.hasValidation(action, name)) {
      return config.validation.invalidate(action, name, data);
    } else return null;
  } else return null;
}