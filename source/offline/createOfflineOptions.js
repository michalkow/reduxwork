import buildEffect from './buildEffect';
import buildDiscard from './buildDiscard';
import buildDetectNetwork from './buildDetectNetwork';

export default (reduxWorkOptions, transportOptions, offlineOptions) => {
  const effect = buildEffect(reduxWorkOptions, transportOptions);
  const discard = buildDiscard(reduxWorkOptions, transportOptions);
  const detectNetwork = buildDetectNetwork(reduxWorkOptions, transportOptions);
  return {
    ...offlineOptions,
    effect,
    discard,
    detectNetwork
  };
};