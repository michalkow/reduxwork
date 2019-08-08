import reduxwork from './test-reduxwork';

require('es6-promise').polyfill();
require('isomorphic-fetch');

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
} = reduxwork.createIoActions('Messages');