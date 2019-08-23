const createRootRecucer = (reduxworkReducer, combinedReducer) => {
  return (state, action) => {
    if (action.reduxwork && reduxworkReducer[action.type])
      return reduxworkReducer[action.type](state, action);
    else if (combinedReducer)
      return combinedReducer(state, action);
    else
      return state;
  };
};

export default createRootRecucer;