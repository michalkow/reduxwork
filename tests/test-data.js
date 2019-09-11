var normalizr = require('normalizr');

var users = new normalizr.schema.Entity('users');

var messages = new normalizr.schema.Entity('messages', {
  author: users
});

var schemas = {
  users,
  messages
};

var data = {
  messages: [
    { id: 1, body: 'first', author: 1 },
    { id: 2, body: 'secound', author: 1 },
    { id: 3, body: 'third', author: 1 },
    { id: 4, body: 'fourth', author: 1 },
    { id: 5, body: 'fifth', author: 1 }
  ],
  users: [
    { id: 1, name: 'Jack' }
  ]
};

module.exports = {
  schemas,
  data
}