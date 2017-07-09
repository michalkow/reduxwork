import _ from 'lodash';

export default function createReducer(config, name, customState, customActions) {
  if(!customState) customState = {};
  if(!customActions) customActions = {};
  let initialState = Object.assign({}, customState);
  name = _.toUpper(_.snakeCase(name));
  return function(rState = initialState, rAction) {
    var defaultActions = Object.assign({
      [`RESET_${name}`](state, action) {
        return Object.assign({}, initialState);
      }
    });
    if(customActions[rAction.type]) return customActions[rAction.type](rState, rAction);
    else if(defaultActions[rAction.type]) return defaultActions[rAction.type](rState, rAction);
    else return rState;
  }
}