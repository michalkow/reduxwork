import buildAction from '../lib/buildAction';
import _ from 'lodash';

export function createSocketActions(config, name) {
  if(!config) config = {};
  config.type = "socket";
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+ _.snakeCase(name).toUpperCase()
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+ _.snakeCase(name).toUpperCase()
      }
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_'+ _.snakeCase(name).toUpperCase(),
        data
      }
    },
    [`find${name}`](data, cb) {
      var action = "FIND";
      return buildAction(config, action, name, data, cb)
    },
    [`sync${name}`](data, cb) {
      var action = "SYNC";
      return buildAction(config, action, name, data, cb)
      
    },
    [`create${name}`](data, cb) {
      var action = "CREATE";
      return buildAction(config, action, name, data, cb)
    },
    [`update${name}`](data, cb, mod) {
      var action = "UPDATE";
      return buildAction(config, action, name, data, cb)
    },
    [`destroy${name}`](data, cb) {
      var action = "DESTROY";
      return buildAction(config, action, name, data, cb)
    }
  }
}

export function createFetchActions(config, name) {
  if(!config) config = {};
  config.type = "fetch";
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+ _.snakeCase(name).toUpperCase()
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+ _.snakeCase(name).toUpperCase()
      }
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_'+ _.snakeCase(name).toUpperCase(),
        data
      }
    },
    [`find${name}`](data, cb) {
      var action = "FIND";
      return buildAction(config, action, name, data, cb)
    },
    [`sync${name}`](data, cb) {
      var action = "SYNC";
      return buildAction(config, action, name, data, cb)
      
    },
    [`create${name}`](data, cb) {
      var action = "CREATE";
      return buildAction(config, action, name, data, cb)
    },
    [`update${name}`](data, cb, mod) {
      var action = "UPDATE";
      return buildAction(config, action, name, data, cb)
    },
    [`destroy${name}`](data, cb) {
      var action = "DESTROY";
      return buildAction(config, action, name, data, cb)
    }
  }
}

export function createIoActions(config, name) {
  if(config.type == "socket") 
    return createSocketActions(config, name);
  if(config.type == "fetch") 
    return createFetchActions(config, name);
}
