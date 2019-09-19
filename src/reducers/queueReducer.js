import {
  concat,
  slice,
  findIndex
} from 'lodash';

export default {
  RW_QUEUE_ADD(state, action) {
    const { reduxworkQueue } = state;
    const queue = concat(reduxworkQueue, action.data);
    return Object.assign({}, state, { reduxworkQueue: queue });
  },
  RW_QUEUE_REMOVE(state, action) {
    const { reduxworkQueue } = state;
    const index = findIndex(reduxworkQueue, { uuid: action.uuid });
    const queue = (index > -1) ?
      slice(reduxworkQueue, index, 1)
      :
      reduxworkQueue;
    return Object.assign({}, state, { reduxworkQueue: queue });
  }
};