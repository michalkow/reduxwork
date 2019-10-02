import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';

test('Find messages action test', () => {
  expect(
    findMessages({ id: 2 })
  ).toEqual(
    {
      type: 'RW_FIND_MESSAGES',
      data: { id: 2 },
      meta: {
        name: 'messages',
        operation: 'find',
        localFields: [],
        virtualFields: [],
        offline: {
          effect: {
            transport: 'socket'
          },
          commit: {
            type: 'RW_FIND_MESSAGES_COMPLETED',
            data: { id: 2 }
          },
          rollback: {
            type: 'RW_FIND_MESSAGES_FAILED',
            data: { id: 2 }
          }
        }
      }
    }
  );
});

test('Create messages action test', () => {
  expect(
    createMessages({ body: 'text' })
  ).toEqual(
    {
      type: 'RW_CREATE_MESSAGES',
      data: { 
        body: 'text',
        id: expect.anything(),
        uuid: expect.anything()
      },
      meta: {
        name: 'messages',
        operation: 'create',
        localFields: [],
        virtualFields: [],
        offline: {
          effect: {
            transport: 'socket'
          },
          commit: {
            type: 'RW_CREATE_MESSAGES_COMPLETED',
            data: { 
              body: 'text',
              id: expect.anything(),
              uuid: expect.anything()
            }
          },
          rollback: {
            type: 'RW_CREATE_MESSAGES_FAILED',
            data: { 
              body: 'text',
              id: expect.anything(),
              uuid: expect.anything()
            }
          }
        }
      }
    }
  );
});