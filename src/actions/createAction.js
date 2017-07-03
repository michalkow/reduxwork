export function createAction(name, binding) {
  return (data) => {
    var action = {type: name};
    if(binding) action[binding] = data;
    return action;
  }
}