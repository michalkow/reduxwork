import { TransportMethodEnum } from '../lib/constants';
import dispatchToSocket from '../dispatch/dispatchToSocket';
import dispatchToFetch from '../dispatch/dispatchToFetch';

export default (options, { socket, fetch }) => (effect, action) => {
  switch (effect.transport) {
    case TransportMethodEnum.SOCKET:
      return dispatchToSocket(options, socket, action);
    case TransportMethodEnum.FETCH:
      return dispatchToFetch(options, fetch, action);
  }
}