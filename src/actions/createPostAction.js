import buildAction from '../lib/buildAction';
import socketDispatcher from '../lib/socketDispatcher';
import fetchDispatcher from '../lib/fetchDispatcher';

export function createSocketPostAction(config, name) {
  var action = "POST";
  if(!config) config = {};
  config.type = "socket";
  return function (data, cb) {
    return buildAction(config, action, name, data, cb)
  }
}

export function createFetchPostAction(config, name) {
  var action = "POST";
  if(!config) config = {};
  config.type = "fetch";
  return function (data, cb) {
    return buildAction(config, action, name, data, cb)
  }
}

export function createPostAction(config, name) {
  if(config.type == "socket") 
    return createSocketPostAction(config, name);
  if(config.type == "fetch") 
    return createFetchPostAction(config, name);
}