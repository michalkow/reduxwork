import buildEffect from './buildEffect';
import buildDiscard from './buildDiscard';

export default (reduxWorkOptions, options) => {
  const effect = buildEffect(reduxWorkOptions);
  const discard = buildDiscard(reduxWorkOptions);
  return {
    ...options,
    effect,
    discard
  };
};