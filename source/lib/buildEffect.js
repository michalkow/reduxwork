import { TransportMethodEnum } from './constants';
import dispatchToSocket from './dispatchToSocket';
import dispatchToFetch from './dispatchToFetch';

export default (options) => (effect, action) => {
  switch (effect.transport) {
    case TransportMethodEnum.SOCKET:
      return dispatchToSocket(options, action);
    case TransportMethodEnum.FETCH:
      return dispatchToFetch(options, action);
  }
}