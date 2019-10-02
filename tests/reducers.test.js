import testReducers from './test-reducers';
import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';

const initState = {
  messages: {
    init: false,
    selected: null,
    query: null,
    isFinding: false,
    isSyncing: false,
    isWriting: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    validationError: null,
    error: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: []
  },
  users: {
    init: false,
    selected: null,
    query: null,
    isFinding: false,
    isSyncing: false,
    isWriting: false,
    syncError: null,
    findError: null,
    writeError: null,
    updateError: null,
    destroyError: null,
    validationError: null,
    error: null,
    updatedItem: null,
    destroyedItem: null,
    destroyedItemIndex: null,
    items: [
      { id: 1, name: 'Jack' }
    ]
  }
};

test('Create reducer', () => {
  expect(
    testReducers.messages['RW_CREATE_MESSAGES'](
      initState, 
      createMessages({ body: 'text', author: 1 })
    )
  ).toEqual(
    Object.assign({}, initState, {
      messages: Object.assign({},
        initState.messages,
        {
          isWriting: true,
          items: [{ 
            _temp: true,
            body: 'text', 
            author: 1,
            id: expect.anything(),
            uuid: expect.anything()
          }]
        }
      )
    })
  );
});