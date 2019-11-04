var _ = require('lodash');

var data = {
  messages: [
    { id: '129ec4ac-3e81-4651-908d-0a91554fe39f', body: 'first', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    { id: '1b47512f-cad7-4a19-b771-b1b3795680a8', body: 'secound', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' },
    { id: '5c9d5f8e-513a-4f94-b9e2-e9f466e04030', body: 'third', author: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f' },
    { id: '68f55461-838f-4eba-8ceb-f14e81ce2d93', body: 'fourth', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    { id: '08dd2309-ad02-4c34-b019-4fd0e4bc17f9', body: 'fifth', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' }
  ],
  updatedMessages: [
    { id: '129ec4ac-3e81-4651-908d-0a91554fe39f', body: 'updated first', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    { id: '1b47512f-cad7-4a19-b771-b1b3795680a8', body: 'updated secound', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' },
    { id: '5c9d5f8e-513a-4f94-b9e2-e9f466e04030', body: 'updated third', author: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f' },
    { id: '68f55461-838f-4eba-8ceb-f14e81ce2d93', body: 'updated fourth', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    { id: '08dd2309-ad02-4c34-b019-4fd0e4bc17f9', body: 'updated fifth', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' }
  ],
  users: [
    { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' },
    { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' },
    { id: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f', name: 'Marcy' }
  ]
};

var payload = {
  messages: [
    { id: '129ec4ac-3e81-4651-908d-0a91554fe39f', body: 'first', author: { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' }},
    { id: '1b47512f-cad7-4a19-b771-b1b3795680a8', body: 'secound', author: { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' }},
    { id: '5c9d5f8e-513a-4f94-b9e2-e9f466e04030', body: 'third', author: { id: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f', name: 'Marcy' }},
    { id: '68f55461-838f-4eba-8ceb-f14e81ce2d93', body: 'fourth', author: { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' }},
    { id: '08dd2309-ad02-4c34-b019-4fd0e4bc17f9', body: 'fifth', author: { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' }}
  ],
  updatedMessages: [
    { id: '129ec4ac-3e81-4651-908d-0a91554fe39f', body: 'updated first', author: { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' }},
    { id: '1b47512f-cad7-4a19-b771-b1b3795680a8', body: 'updated secound', author: { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' }},
    { id: '5c9d5f8e-513a-4f94-b9e2-e9f466e04030', body: 'updated third', author: { id: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f', name: 'Marcy' }},
    { id: '68f55461-838f-4eba-8ceb-f14e81ce2d93', body: 'updated fourth', author: { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' }},
    { id: '08dd2309-ad02-4c34-b019-4fd0e4bc17f9', body: 'updated fifth', author: { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' }}
  ],
  users: [
    { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' },
    { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' },
    { id: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f', name: 'Marcy' }
  ]
};

var entities = {
  messages: {
    '129ec4ac-3e81-4651-908d-0a91554fe39f': { id: '129ec4ac-3e81-4651-908d-0a91554fe39f', body: 'first', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    '1b47512f-cad7-4a19-b771-b1b3795680a8': { id: '1b47512f-cad7-4a19-b771-b1b3795680a8', body: 'secound', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' },
    '5c9d5f8e-513a-4f94-b9e2-e9f466e04030': { id: '5c9d5f8e-513a-4f94-b9e2-e9f466e04030', body: 'third', author: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f' },
    '68f55461-838f-4eba-8ceb-f14e81ce2d93': { id: '68f55461-838f-4eba-8ceb-f14e81ce2d93', body: 'fourth', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    '08dd2309-ad02-4c34-b019-4fd0e4bc17f9': { id: '08dd2309-ad02-4c34-b019-4fd0e4bc17f9', body: 'fifth', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' }
  },
  updatedMessages: {
    '129ec4ac-3e81-4651-908d-0a91554fe39f': { id: '129ec4ac-3e81-4651-908d-0a91554fe39f', body: 'updated first', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    '1b47512f-cad7-4a19-b771-b1b3795680a8': { id: '1b47512f-cad7-4a19-b771-b1b3795680a8', body: 'updated secound', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' },
    '5c9d5f8e-513a-4f94-b9e2-e9f466e04030': { id: '5c9d5f8e-513a-4f94-b9e2-e9f466e04030', body: 'updated third', author: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f' },
    '68f55461-838f-4eba-8ceb-f14e81ce2d93': { id: '68f55461-838f-4eba-8ceb-f14e81ce2d93', body: 'updated fourth', author: '578e93e5-1808-4dc9-88bb-89c64b4e87ed' },
    '08dd2309-ad02-4c34-b019-4fd0e4bc17f9': { id: '08dd2309-ad02-4c34-b019-4fd0e4bc17f9', body: 'updated fifth', author: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638' }
  },
  users: {
    '578e93e5-1808-4dc9-88bb-89c64b4e87ed': { id: '578e93e5-1808-4dc9-88bb-89c64b4e87ed', name: 'Jack' },
    '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638': { id: '7c2051d9-4ceb-4103-a4ff-76a1cb9e2638', name: 'Mark' },
    '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f': { id: '5c8b41d1-89f4-4074-8f9b-76c5e7cac92f', name: 'Marcy' }
  }
};

function filterCollerction(collection, indexes) {
  return _.filter(collection, (item, index) => {
    return indexes.indexOf(index) >= 0;
  });
}

function getPayloadByIds(data = [], updated = false) {
  const indexes = _.map(data, item =>
    _.findIndex(payload.messages, { id: item.id })
  );
  const collection = updated ? 'updatedMessages' : 'messages';
  return filterCollerction(payload[collection], indexes);
}

function getMessegesByIndexes(type, indexes = [], temps = [], updated = []) {
  var messages = filterCollerction(data.messages, indexes);
  var tempMessages = filterCollerction(data.messages, temps);
  var updatedMessages = filterCollerction(data.updatedMessages, updated);
  switch (type) {
    case 'data':
      return updated.length ?
        updatedMessages :
        messages;
    case 'payload':
      return updated.length ?
        filterCollerction(payload.updatedMessages, updated) :
        filterCollerction(payload.messages, indexes);
    case 'entities':
      return _.mapValues(_.pick(entities.messages, _.map(messages, 'id')), (item) => {
        let message = _.find(updatedMessages, { id: item.id }) || item;
        return _.find(tempMessages, { id: message.id }) ? _.assign({}, message, { _temp: true }) : message;
      });
  }
}

function getUsersByMessegeIndexes(type, indexes = []) {
  var messages = filterCollerction(data.messages, indexes);
  var users = _.filter(data.users, (user) => {
    return _.find(messages, { author: user.id });
  });
  switch (type) {
    case 'data':
      return users;
    case 'payload':
      return users;
    case 'entities':
      return _.pick(entities.users, _.map(users, 'id'));
  }
}

module.exports = {
  data: data,
  payload: payload,
  entities: entities,
  getMessegesByIndexes: getMessegesByIndexes,
  getUsersByMessegeIndexes: getUsersByMessegeIndexes,
  getPayloadByIds: getPayloadByIds
};