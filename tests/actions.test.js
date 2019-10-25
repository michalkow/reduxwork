import { findMessages, createMessages, updateMessages, destroyMessages } from './test-actions';

test('Find messages action creation test', () => {
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

test('Create messages action creation test', () => {
  expect(
    createMessages({ body: 'text' })
  ).toEqual(
    {
      type: 'CREATE_MESSAGES',
      payload: [
        {
          body: 'text',
          id: expect.anything()
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

test('Update messages action creation test', () => {
  expect(
    updateMessages([{ id: '8e8ba283-5d70-44fc-b91c-a8d94c937328', body: 'text2' }, { id: '8e8ba383-5d70-44fc-b91c-a8d94c937328', body: 'text3' }])
  ).toEqual(
    {
      type: 'UPDATE_MESSAGES',
      payload: [
        {
          body: 'text2',
          id: '8e8ba283-5d70-44fc-b91c-a8d94c937328'
        },
        {
          id: '8e8ba383-5d70-44fc-b91c-a8d94c937328',
          body: 'text3'
        }
      ],
      uuid: expect.anything(),
      meta: {
        name: 'messages',
        operation: 'update',
        localFields: ['_temp', '_rewrite'],
        virtualFields: [],
        offline: {
          effect: {
            transport: 'socket'
          },
          commit: {
            type: 'UPDATE_MESSAGES_COMPLETED',
            uuid: expect.anything()
          },
          rollback: {
            type: 'UPDATE_MESSAGES_FAILED',
            uuid: expect.anything()
          }
        }
      }
    }
  );
});

test('Destroy messages action creation test', () => {
  expect(
    destroyMessages([{ id: '8e8ba283-5d70-44fc-b91c-a8d94c937328' }, { id: '8e8ba383-5d70-44fc-b91c-a8d94c937328' }])
  ).toEqual(
    {
      type: 'DESTROY_MESSAGES',
      payload: [
        {
          id: '8e8ba283-5d70-44fc-b91c-a8d94c937328'
        },
        {
          id: '8e8ba383-5d70-44fc-b91c-a8d94c937328'
        }
      ],
      uuid: expect.anything(),
      meta: {
        name: 'messages',
        operation: 'destroy',
        localFields: ['_temp', '_rewrite'],
        virtualFields: [],
        offline: {
          effect: {
            transport: 'socket'
          },
          commit: {
            type: 'DESTROY_MESSAGES_COMPLETED',
            uuid: expect.anything()
          },
          rollback: {
            type: 'DESTROY_MESSAGES_FAILED',
            uuid: expect.anything()
          }
        }
      }
    }
  );
});