import reduxwork from './test-reduxwork';

export default {
  messages: reduxwork.createIoReducers('messages')
};