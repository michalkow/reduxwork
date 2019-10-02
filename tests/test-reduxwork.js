import Reduxwork from '../source/Reduxwork';
import io from 'socket.io-client';
import { schemas } from './test-data';

const serverAdress = 'http://127.0.0.1:1234';
const socket = io(serverAdress);

const reduxwork = new Reduxwork({
  socket,
  schemas,
  addKeyOnCreate: true
});

export default reduxwork;