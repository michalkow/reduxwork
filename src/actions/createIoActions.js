import buildFetchGetAction from '../lib/buildFetchGetAction';
import buildAction from '../lib/buildAction';

export function createSocketActions(config, name, options) {
  if(!options) options = {};
  options.type = "socket";
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+ name.toUpperCase()
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+ name.toUpperCase()
      }
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_'+ name.toUpperCase(),
        data
      }
    },
    [`find${name}`](data, cb) {
      var action = "FIND";
      return buildAction(config, action, name, data, cb, options)
    },
    [`sync${name}`](data, cb) {
      var action = "SYNC";
      return buildAction(config, action, name, data, cb, options)
      
    },
    [`create${name}`](data, cb) {
      var action = "CREATE";
      return buildAction(config, action, name, data, cb, options)
    },
    [`update${name}`](data, cb, mod) {
      var action = "UPDATE";
      return buildAction(config, action, name, data, cb, options)
    },
    [`destroy${name}`](data, cb) {
      var action = "DESTROY";
      return buildAction(config, action, name, data, cb, options)
    }
  }
}

export function createFetchActions(config, name, options) {
  if(!options) options = {};
  options.type = "fetch";
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+ name.toUpperCase()
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+ name.toUpperCase()
      }
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_'+ name.toUpperCase(),
        data
      }
    },
    [`find${name}`](params, query, cb) {
      var action = "FIND";
      return buildFetchGetAction(config, action, name, params, query, cb, options)
    },
    [`sync${name}`](params, query, cb) {
      var action = "SYNC";
      return buildFetchGetAction(config, action, name, params, query, cb, options)
    },
    [`create${name}`](data, cb) {
      var action = "CREATE";
      return buildAction(config, action, name, data, cb, options)
      
    },
    [`update${name}`](data, cb, mod) {
      var action = "UPDATE";
      return buildAction(config, action, name, data, cb, options)
      
    },
    [`destroy${name}`](data, cb) {
      var action = "DESTROY";
      return buildAction(config, action, name, data, cb, options)
      
    }
  }
}

export function createIoActions(config, name, options) {
  if(options.type == "socket") 
    return createSocketActions(config, name, options);
  if(options.type == "fetch") 
    return createFetchActions(config, name, options);
}
