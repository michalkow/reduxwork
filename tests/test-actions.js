import { createIoActions } from '../dist/reduxwork.js'
import io from 'socket.io-client';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var serverAdress = 'http://127.0.0.1:1234'
const socket = io(serverAdress);

const config = {
  baseURL: serverAdress+"/api",
  type: 'fetch',
  socketIoFunction: function(action, data, cb) { socket.emit(action, data, cb) },
  fetchFunction: fetch
}

export var {
  findMessages,
  createMessages,
  updateMessages,
  destroyMessages,
  clearMessages,
  selectMessages,
  syncMessages,
  receiveMessages,
  removeMessages,
  resetMessages
} = createIoActions(config, 'Messages');

