var normalizr = require('normalizr');

var users = new normalizr.schema.Entity('users');

var messages = new normalizr.schema.Entity('messages', {
  author: users
});

module.exports = {
  users,
  messages
};