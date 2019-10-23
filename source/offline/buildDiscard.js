import { TransportMethodEnum } from '../lib/constants';

export default (options) => ({ transport, error, response }, action, retries) => {
  switch (transport) {
    case TransportMethodEnum.SOCKET:
      return !!error;
    case TransportMethodEnum.FETCH:
      return response && 400 <= response.status && response.status < 500;
  }
};