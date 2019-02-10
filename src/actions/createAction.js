export default function createAction(name, binding) {
  return (data) => {
    let action = { type: name };
    if (binding) action[binding] = data;
    return action;
  };
}