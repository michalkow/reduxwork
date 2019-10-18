var normalizr = require('normalizr');

var users = new normalizr.schema.Entity('users', {}, { idAttribute: 'uuid' });

var messages = new normalizr.schema.Entity('messages', {
  author: users
}, { idAttribute: 'uuid' });

module.exports = {
  users,
  messages
};