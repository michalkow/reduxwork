import { parseVirtualData } from './fieldsOperations';

const dispatchAction = (options, action, dispatchMethod) => {
  const { validationHook, actionInject } = options;
  return new Promise((resolve, reject) => {
    if (validationHook) {
      let validationAction = actionInject({
        type: action.type,
        data: parseVirtualData(action, options)
      });
      let validationError = validationHook(validationAction);
      if (validationError)
        return reject(validationError);
    }

    return dispatchMethod(resolve, reject);
  });
};

export default dispatchAction;