const createReduxworkRecucer = (reducers) => {
  const actions = {};
  reducers.forEach(reducer =>
    reducer.forEach((action, name) =>
      actions[name] = action
    )
  );
  return actions;
};

export default createReduxworkRecucer;