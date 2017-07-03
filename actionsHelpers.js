
  var ifetch = require("isomorphic-fetch");
  var BASE_URL = '';

export function buildFindUrl(customUrl, name, params, query) {
  var id = null;
  var url = BASE_URL;
  if(params && params.id) id = params.id;
  if(customUrl) {
    url+= customUrl;
    for (var k in params) {
      url = url.replace('%'+k, params[k]);
    }
    if (query) {
      let first = true;
      url += '/';
      for (var q in query) {
        if(first) {
          url+= '?'+q+'='+query[q];
          first = false;
        } else url+= '&'+q+'='+query[q];
      }          
    }        
  } else {
    url+= id ? ('/api/'+name.toLowerCase()+'/list/'+id) : ('/api/'+name.toLowerCase()+'/list');
    if (query) {
      let first = true;
      url += '/';
      for (var q in query) {
        if(first) {
          url+= '?'+q+'='+query[q];
          first = false;
        } else url+= '&'+q+'='+query[q];
      }          
    }  
  }
  return url;
}

export function createAction(name, binding) {
  return (data) => {
    var action = {type: name};
    if(binding) action[binding] = data;
    return action;
  }
}

export function createFetchActions(name, url) {
  var action = name.toUpperCase();
  if(!url) url = {};
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+action
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+action
      }
    },
    [`select${name}`](selected) {
      return {
        type: 'SELECT_'+action,
        selected
      }
    },
    [`find${name}`](params, query, cb) {
      if(params && typeof params !== 'object') params = {id: params};
      if (typeof query === "function") {
        cb = query;
        query = null;
      }
      var findUrl = buildFindUrl(url.find, name, params, query);
      return function (dispatch) {
        let findAction = {type: 'FIND_'+action };
        if(query) findAction.query = query;
        if(params) findAction.params = params;
        dispatch(findAction)
        return ifetch(findUrl, {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            return response.json()
          })
          .then(json => {
            if(json.err) dispatch({
              type: 'FIND_'+action+'_FAILED',
              error: json.err
            });
            else dispatch({
              type: 'FIND_'+action+'_COMPLETED',
              receivedAt: Date.now(),
              data: json
            });
            if(cb) cb(json.err, json);
            return;
          })
          .catch((error) => {
            if(cb) cb(error, null);
          });
      }
    },
    [`sync${name}`](params, query, cb) {
      if(params && typeof params !== 'object') params = {id: params};
      if (typeof query === "function") {
        cb = query;
        query = null;
      }
      var findUrl = buildFindUrl(url.find, name, params, query);
      return function (dispatch) {
        let findAction = {type: 'SYNC_'+action };
        if(query) findAction.query = query;
        if(params) findAction.params = params;
        dispatch(findAction)
        return ifetch(findUrl, {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            return response.json()
          })
          .then(json => {
            if(json.err) dispatch({
              type: 'SYNC_'+action+'_FAILED',
              error: json.err
            });
            else dispatch({
              type: 'SYNC_'+action+'_COMPLETED',
              receivedAt: Date.now(),
              data: json
            });
            if(cb) cb(json.err, json);
            return;
          })
          .catch((error) => {
            if(cb) cb(error, null);
          });
      }
    },
    [`create${name}`](data, cb) {
      return function (dispatch) {
        var tempId = (new Date().getTime()*-1);
        dispatch({
          type: 'CREATE_'+action,
          tempId,
          data
        })
        return ifetch(BASE_URL+(url.create||'/api/'+name.toLowerCase()+'/create'), {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(Object.assign(data, {cuid: cuid}))
          })
          .then(response => {
            return response.json()
          })
          .then(json => {
            if(json.err) dispatch({
              type: 'CREATE_'+action+'_FAILED',
              error: json.err,
              tempId
            });
            else dispatch({
              type: 'CREATE_'+action+'_COMPLETED',
              receivedAt: Date.now(),
              data: json,
              tempId
            });
            if(cb) cb(json.err, json);
            return;
          })
      }
    },
    [`update${name}`](data, cb, options) {
      return function (dispatch) {
        if(!options) options = {rewrite: true};
        dispatch({
          type: 'UPDATE_'+action,
          data
        })
        return ifetch(BASE_URL+(url.update||'/api/'+name.toLowerCase()+'/update'), {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(Object.assign(data, {cuid: cuid}))
          })
          .then(response => {
            return response.json()
          })
          .then(json => {
            if(json.err) dispatch({
              type: 'UPDATE_'+action+'_FAILED',
              error: json.err
            });
            else dispatch({
              type: 'UPDATE_'+action+'_COMPLETED',
              rewrite: options.rewrite,
              receivedAt: Date.now(),
              data: json
            });
            if(cb) cb(json.err, json);
            return;
          })
      }
    },
    [`destroy${name}`](data, cb) {
      return function (dispatch) {
        dispatch({
          type: 'DESTROY_'+action,
          data
        })
        return ifetch(BASE_URL+(url.destroy||'/api/'+name.toLowerCase()+'/destroy'), {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(Object.assign(data, {cuid: cuid}))
          })
          .then(response => {
            return response.json()
          })
          .then(json => {
            if(json.err) dispatch({
              type: 'DESTROY_'+action+'_FAILED',
              error: json.err
            });
            else dispatch({
              type: 'DESTROY_'+action+'_COMPLETED',
              receivedAt: Date.now(),
              data: json
            });
            if(cb) cb(json.err, json);
            return;
          })
      }
    }
  }
}

export function createLocalActions(name, url) {
  var action = name.toUpperCase();
  if(!url) url = {};
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+action
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+action
      }
    },
    [`select${name}`](selected) {
      return {
        type: 'SELECT_'+action,
        selected
      }
    },
    [`find${name}`](data) {
      return {
        type: 'FIND_'+action,
        data
      }
    },
    [`sync${name}`](data) {
      return {
        type: 'SYNC_'+action,
        data
      }
    },
    [`create${name}`](data) {
      return {
        type: 'CREATE_'+action,
        data
      }
    },
    [`update${name}`](data) {
      return {
        type: 'UPDATE_'+action,
        data
      }
    },    
    [`destroy${name}`](data) {
      return {
        type: 'DESTROY_'+action,
        data
      }
    }
  }
}

export  function createFetchGetAction(name, url) {
  return function (params, query, cb) {
    if(params && typeof params !== 'object') params = {id: params};
    if (typeof query === "function") {
      cb = query;
      query = null;
    }
    var getUrl = buildFindUrl(url, name, params, query);
    return function (dispatch) {
      let getAction = {type: 'GET_'+name.toUpperCase()};
      if(query) getAction.query = query;
      if(params) getAction.params = params;
      dispatch(getAction)
      return fetch(getUrl, {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'get'
        })
        .then(response => {
          return response.json()
        })
        .then(json => {
          if(json.err) dispatch({
            type: 'GET_'+name.toUpperCase()+'_FAILED',
            error: json.err
          });
          else dispatch({
            type: 'GET_'+name.toUpperCase()+'_COMPLETED',
            receivedAt: Date.now(),
            data: json
          });
          if(cb) cb(json.err, json);
          return;
        })
    }
  }
}

export  function createFetchPostAction(name, url) {
  return function (data, cb) {
    return function (dispatch) {
      dispatch({
        type: name.toUpperCase(),
        data
      })
      console.log('createFetchPostAction', url);
      return fetch(BASE_URL+url, {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify(Object.assign(data, {cuid: cuid}))
        })
        .then(response => {
          return response.json()
        })
        .then(json => {
          if(json.err) dispatch({
            type: name.toUpperCase()+'_FAILED',
            error: json.err
          });
          else dispatch({
            type: name.toUpperCase()+'_COMPLETED',
            receivedAt: Date.now(),
            data: json
          });
          if(cb) cb(json.err, json);
          return;
        })
    }
  }
}

export function createSocketActions(name) {
  var action = name.toUpperCase();
  return {
    [`clear${name}`]() {
      return {
        type: 'CLEAR_'+action
      }
    },
    [`reset${name}`]() {
      return {
        type: 'RESET_'+action
      }
    },
    [`select${name}`](data) {
      return {
        type: 'SELECT_'+action,
        data
      }
    },
    [`sync${name}`](params, query, cb) {
      if(params && typeof params !== 'object') params = {id: params};
      if (typeof query === "function") {
        cb = query;
        query = null;
      }
      return function (dispatch) {
        let syncAction = {type: 'SYNC_'+action };
        if(query) syncAction.query = query;
        if(params) syncAction.params = params;
        dispatch(syncAction)
        return socket.emit('redux_action_event', syncAction, (err, res) => {
          if(err) dispatch({
            type: 'SYNC_'+action+'_FAILED',
            error: err,
          });
          else dispatch({
            type: 'SYNC_'+action+'_COMPLETED',
            receivedAt: Date.now(),
            data: res,
          });
          if(cb) cb(err, res);
          return;
        });
      }
    },
    [`receive${name}`](data) {
      return {
        type: 'RECEIVE_'+action,
        data
      }
    },
    [`create${name}`](data, cb) {
      return function (dispatch) {
        var tempId = (new Date().getTime()*-1);
        console.log(tempId);
        dispatch({
          type: 'CREATE_'+action,
          tempId,
          data
        })
        return socket.emit('redux_action_event', {type: 'CREATE_'+action, data}, (err, res) => {
          if(err) dispatch({
            type: 'CREATE_'+action+'_FAILED',
            error: err,
            tempId
          });
          else dispatch({
            type: 'CREATE_'+action+'_COMPLETED',
            receivedAt: Date.now(),
            data: res,
            tempId
          });
          if(cb) cb(err, res);
          return;
        });
      }
    },
    [`find${name}`](params, query, cb) {
      if(params && typeof params !== 'object') params = {id: params};
      if (typeof query === "function") {
        cb = query;
        query = null;
      }
      return function (dispatch) {
        let findAction = {type: 'FIND_'+action };
        if(query) findAction.query = query;
        if(params) findAction.params = params;
        dispatch(findAction)
        return socket.emit('redux_action_event', findAction, (err, res) => {
          if(err) dispatch({
            type: 'FIND_'+action+'_FAILED',
            error: err,
          });
          else dispatch({
            type: 'FIND_'+action+'_COMPLETED',
            receivedAt: Date.now(),
            data: res,
          });
          if(cb) cb(err, res);
          return;
        });
      }
    },
    [`update${name}`](data, cb, options) {
      if(!options) options = {rewrite: true};
      return function (dispatch) {
        if(!options) options = {rewrite: true};
        dispatch({
          type: 'UPDATE_'+action,
          data
        })
        return socket.emit('redux_action_event', {type: 'UPDATE_'+action, data}, (err, res) => {
          if(err) dispatch({
            type: 'UPDATE_'+action+'_FAILED',
            error: err,
          });
          else dispatch({
            type: 'UPDATE_'+action+'_COMPLETED',
            rewrite: options.rewrite,
            receivedAt: Date.now(),
            data: res
          });
          if(cb) cb(err, res);
          return;
        })
      }
    },
    [`destroy${name}`](data, cb) {
      return function (dispatch) {
        dispatch({
          type: 'DESTROY_'+action,
          data
        })
        return socket.emit('redux_action_event', {type: 'DESTROY_'+action, data}, (err, res) => {
          if(err) dispatch({
            type: 'DESTROY_'+action+'_FAILED',
            error: err,
          });
          else dispatch({
            type: 'DESTROY_'+action+'_COMPLETED',
            receivedAt: Date.now(),
            data: res,
          });
          if(cb) cb(err, res);
          return;
        });
      }
    }
  }
}

export function createSocketAction(name) {
  var action = name.toUpperCase();
  return function (data, cb) {
    return function (dispatch) {
      dispatch({
        type: action,
        data
      });
      return socket.emit('redux_action_event', {type: action, data}, (err, res) => {
        if(err) dispatch({
          type: action+'_FAILED',
          error: err,
        });
        else dispatch({
          type: action+'_COMPLETED',
          receivedAt: Date.now(),
          data: res,
        });
        if(cb) cb(err, res);
        return;
      });
    }
  }
}