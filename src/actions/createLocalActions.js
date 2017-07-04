export default function createLocalActions(config, name, options) {
  return {
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
    [`select${name}`](selected) {
      return {
        type: 'SELECT_'+name.toUpperCase(),
        selected
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