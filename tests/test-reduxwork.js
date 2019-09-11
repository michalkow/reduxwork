import Reduxwork from '../src/Reduxwork';
import io from 'socket.io-client';
import { schemas } from './test-data';

const serverAdress = 'http://127.0.0.1:1234';
const socket = io(serverAdress);

const options = {
  socket,
  schemas
};

const reduxwork = new Reduxwork(options);

export default reduxwork;