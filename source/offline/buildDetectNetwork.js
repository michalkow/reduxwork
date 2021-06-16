import { TransportMethodEnum } from '../lib/constants';

const handleCallback = (callback, online) => {
  // NetInfo is not supported in browsers, hence we only pass online status
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => callback({ online }));
  } else {
    setTimeout(() => callback({ online }), 0);
  }
};

export default ({ transport }, { socket }) => callback => {
  switch (transport) {
    case TransportMethodEnum.SOCKET:
      socket.on('connect', () =>
        callback({ online: true }));
      socket.on('disconnect', () =>
        callback({ online: false }));
      break;
    case TransportMethodEnum.FETCH:
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('online', () => handleCallback(callback, true));
        window.addEventListener('offline', () => handleCallback(callback, false));
        handleCallback(callback, window.navigator.onLine);
      }
      break;
  }
};