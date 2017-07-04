export default function createLocalActions(config, name, options) {
  return {
    [`find${name}`](data, cb) {
      return {
        type: 'FIND_'+name.toUpperCase(),
        data
      }
    },
    [`sync${name}`](data, cb) {
      return {
        type: 'SYNC_'+name.toUpperCase(),
        data
      }
    },
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+name.toUpperCase()
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+name.toUpperCase()
      }
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_'+name.toUpperCase(),
        data
      }
    },
    [`create${name}`](data) {
      return {
        type: 'CREATE_'+name.toUpperCase(),
        data
      }
    },
    [`update${name}`](data) {
      return {
        type: 'UPDATE_'+name.toUpperCase(),
        data
      }
    },    
    [`destroy${name}`](data) {
      return {
        type: 'DESTROY_'+name.toUpperCase(),
        data
      }
    }
  }
}