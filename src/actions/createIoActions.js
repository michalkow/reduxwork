import buildAction from '../lib/createAction';
import { ActionOperationEnum } from '../lib/constants';
import { snakeCase } from 'lodash';

export default function createIoActions(name, options) {
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_' + snakeCase(name).toUpperCase()
      };
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_' + snakeCase(name).toUpperCase()
      };
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_' + snakeCase(name).toUpperCase(),
        data
      };
    },
    [`find${name}`](data) {
      const operation = 'FIND';
      return buildAction(options, operation, name, data);
    },
    [`sync${name}`](data) {
      const operation = 'SYNC';
      return buildAction(options, operation, name, data);

    },
    [`create${name}`](data) {
      const operation = ActionOperationEnum.CREATE;
      return buildAction(options, operation, name, data);
    },
    [`update${name}`](data) {
      const operation = 'UPDATE';
      return buildAction(options, operation, name, data);
    },
    [`destroy${name}`](data) {
      const operation = 'DESTROY';
      return buildAction(options, operation, name, data);
    }
  };
}