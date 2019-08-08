import { Reduxwork } from '../dist/Reduxwork';
import io from 'socket.io-client';

const serverAdress = 'http://127.0.0.1:1234';
const socket = io(serverAdress);

const options = {
  socket
};

const reduxwork = new Reduxwork(options);

export default reduxwork;