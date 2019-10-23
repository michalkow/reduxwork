export default (reducers = []) => {
  const combinedReducers = Object.assign(...reducers);
  const flattenReducers = {};
  for(let key in combinedReducers) {
    Object.assign(flattenReducers, combinedReducers[key]);
  }
  return (state, action) => {
    if (flattenReducers[action.type])
      return flattenReducers[action.type](state, action);
    return state;
  }
}