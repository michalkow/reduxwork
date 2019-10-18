import { TransportMethodEnum } from '../lib/constants';
import dispatchToSocket from '../dispatch/dispatchToSocket';
import dispatchToFetch from '../dispatch/dispatchToFetch';

export default (options) => (effect, action) => {
  switch (effect.transport) {
    case TransportMethodEnum.SOCKET:
      return dispatchToSocket(options, action);
    case TransportMethodEnum.FETCH:
      return dispatchToFetch(options, action);
  }
}