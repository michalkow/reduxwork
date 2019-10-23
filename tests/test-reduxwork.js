import Reduxwork from '../source/index';
import io from 'socket.io-client';
import schemas from './test-schemas';

const serverAdress = 'http://127.0.0.1:1234';
const socket = io(serverAdress, {
  transports: ['websocket', 'polling']
});

const reduxwork = new Reduxwork({
  transport: 'socket',
  socket,
  schemas,
  addKeyOnCreate: true
});

export default reduxwork;