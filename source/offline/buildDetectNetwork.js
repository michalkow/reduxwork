import { TransportMethodEnum } from '../lib/constants';

export default ({ transport }, { socket }) => callback => {
  switch (transport) {
    case TransportMethodEnum.SOCKET:
      socket.on('connect', () =>
        callback({ online: true }));
      socket.on('disconnect', () =>
        callback({ online: false }));
      break;
    case TransportMethodEnum.FETCH:
      break;
  }
};