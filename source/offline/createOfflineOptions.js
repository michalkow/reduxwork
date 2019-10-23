import buildEffect from './buildEffect';
import buildDiscard from './buildDiscard';
import buildDetectNetwork from './buildDetectNetwork';

export default (reduxWorkOptions, options) => {
  const effect = buildEffect(reduxWorkOptions);
  const discard = buildDiscard(reduxWorkOptions);
  const detectNetwork = buildDetectNetwork(reduxWorkOptions);
  return {
    ...options,
    effect,
    discard,
    detectNetwork
  };
};