import { createAction } from '../lib/createAction';
import { ActionOperationEnum, TransportMethodEnum } from '../lib/constants';

export default function createIoActions(name, options) {
  return {
    [`clear${name}`]() {
      return createAction(
        Object.assign({}, options, { transport: TransportMethodEnum.REDUX }),
        ActionOperationEnum.CLEAR,
        name
      );
    },
    [`reset${name}`]() {
      return createAction(
        Object.assign({}, options, { transport: TransportMethodEnum.REDUX }),
        ActionOperationEnum.RESET,
        name
      );
    },
    [`select${name}`](data) {
      return createAction(
        Object.assign({}, options, { transport: TransportMethodEnum.REDUX }),
        ActionOperationEnum.SELECT,
        name,
        data
      );
    },
    [`find${name}`](data) {
      return createAction(
        options,
        ActionOperationEnum.FIND,
        name,
        data
      );
    },
    [`sync${name}`](data) {
      return createAction(
        options,
        ActionOperationEnum.SYNC,
        name,
        data
      );

    },
    [`create${name}`](data) {
      return createAction(
        options,
        ActionOperationEnum.CREATE,
        name,
        data
      );
    },
    [`update${name}`](data) {
      return createAction(
        options,
        ActionOperationEnum.UPDATE,
        name,
        data
      );
    },
    [`destroy${name}`](data) {
      return createAction(
        options,
        ActionOperationEnum.DESTROY,
        name,
        data
      );
    }
  };
}