import buildFetchGetAction from '../lib/buildFetchGetAction';
import buildAction from '../lib/buildAction';
import socketDispatcher from '../lib/socketDispatcher';
import fetchDispatcher from '../lib/fetchDispatcher';

export function createSocketPostAction(config, name, options) {
  var action = "POST";
  if(!options) options = {};
  options.type = "socket";
  return function (data, cb) {
    return buildAction(config, action, name, data, cb, options)
  }
}

export function createFetchPostAction(config, name, options) {
  var action = "POST";
  if(!options) options = {};
  options.type = "fetch";
  return function (data, cb) {
    return buildAction(config, action, name, data, cb, options)
  }
}

export function createPostAction(config, name, options) {
  if(options.type == "socket") 
    return createSocketPostAction(config, name, options);
  if(options.type == "fetch") 
    return createFetchPostAction(config, name, options);
}