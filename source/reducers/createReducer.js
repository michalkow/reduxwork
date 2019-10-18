import { toUpper, snakeCase, mapValues } from 'lodash';

export default function createReducer(name, initialState = {}, reducers = {}) {
  const reducerName = toUpper(snakeCase(name));
  return Object.assign(
    {
      [`RESET_${reducerName}`](state) {
        return Object.assign({}, state, { [name]: initialState });
      }
    },
    mapValues(reducers, reducer => (state, action) => {
      const instanceState = Object.assign({}, state[name]);
      return Object.assign({}, state, { [name]: reducer(instanceState, action) });
    })
  );
}