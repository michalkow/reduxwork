import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';

test('Find messages action test', () => {
  expect(
    findMessages({ id: 2 })
  ).toEqual(
    {
      type: 'FIND_MESSAGES',
      payload: [{ id: 2 }],
      uuid: expect.anything(),
      meta: {
        name: 'messages',
        operation: 'find',
        localFields: ['_temp', '_rewrite'],
        virtualFields: [],
        offline: {
          effect: {
            transport: 'socket'
          },
          commit: {
            type: 'FIND_MESSAGES_COMPLETED',
            uuid: expect.anything()
          },
          rollback: {
            type: 'FIND_MESSAGES_FAILED',
            uuid: expect.anything()
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
      type: 'CREATE_MESSAGES',
      payload: [ 
        {
          body: 'text',
          id: expect.anything(),
          uuid: expect.anything()
        }
      ],
      uuid: expect.anything(),
      meta: {
        name: 'messages',
        operation: 'create',
        localFields: ['_temp', '_rewrite'],
        virtualFields: [],
        offline: {
          effect: {
            transport: 'socket'
          },
          commit: {
            type: 'CREATE_MESSAGES_COMPLETED',
            uuid: expect.anything()
          },
          rollback: {
            type: 'CREATE_MESSAGES_FAILED',
            uuid: expect.anything()
          }
        }
      }
    }
  );
});