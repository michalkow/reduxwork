import { toUpper, snakeCase } from 'lodash';

export default function createReducer(reducerName, customState = {}, customActions = {}) {
  let initialState = Object.assign({}, customState);
  const name = toUpper(snakeCase(reducerName));
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`RESET_${name}`]() {
        return Object.assign({}, initialState);
      }
    });
    if (customActions[rAction.type]) return customActions[rAction.type](rState, rAction);
    else if (defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);
    else return rState;
  };
}