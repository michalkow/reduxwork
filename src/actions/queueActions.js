export const queueAdd = (action) => ({
  type: 'RW_QUEUE_ADD',
  data: action
});

export const queueRemove = (uuid) => ({
  type: 'RW_QUEUE_REMOVE',
  uuid
});