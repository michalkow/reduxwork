export const ActionOperationEnum = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  FIND: 'find',
  SYNC: 'sync',
  CREATE: 'create',
  UPDATE: 'update',
  DESTROY: 'destroy',
  CLEAR: 'clear',
  RESET: 'reset',
  SELECT: 'select'
};

export const FetchMethodEnum = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const TransportMethodEnum = {
  LOCAL: 'local',
  REDUX: 'redux',
  SOCKET: 'socket',
  FETCH: 'fetch'
};

export const ActionStageEnum = {
  REDUX: 'REDUX',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  FAILED_VALIDATION: 'FAILED_VALIDATION'
};