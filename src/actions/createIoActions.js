import buildAction from '../lib/createAction';
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
      var action = 'FIND';
      return buildAction(options, action, name, data);
    },
    [`sync${name}`](data) {
      var action = 'SYNC';
      return buildAction(options, action, name, data);

    },
    [`create${name}`](data) {
      var action = 'CREATE';
      return buildAction(options, action, name, data);
    },
    [`update${name}`](data) {
      var action = 'UPDATE';
      return buildAction(options, action, name, data);
    },
    [`destroy${name}`](data) {
      var action = 'DESTROY';
      return buildAction(options, action, name, data);
    }
  };
}