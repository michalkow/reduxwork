import _ from 'lodash';
import buildAction from '../lib/buildAction';
import socketDispatcher from '../lib/socketDispatcher';
import fetchDispatcher from '../lib/fetchDispatcher';

export function createSocketGetAction(config, name) {
  var action = "GET";
  if(!config) config = {};
  config.type = "socket";
  return function (data, cb) {
    return buildAction(config, action, name, params, query, cb)
  }
}

export function createFetchGetAction(config, name) {
  var action = "GET";
  if(!config) config = {};
  config.type = "fetch";
  return function (parama, query, cb) {
    return buildAction(config, action, name, params, query, cb)
  }
}

export function createGetAction(config, name) {
  if(config.type == "socket") 
    return createSocketGetAction(config, name);
  if(config.type == "fetch") 
    return createFetchGetAction(config, name);
}
