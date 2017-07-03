import _ from 'lodash';
import buildFetchGetAction from '../lib/buildFetchGetAction';
import buildAction from '../lib/buildAction';
import socketDispatcher from '../lib/socketDispatcher';
import fetchDispatcher from '../lib/fetchDispatcher';

export function createSocketGetAction(config, name, options) {
  var action = "GET";
  if(!options) options = {};
  options.type = "socket";
  return function (data, cb) {
    return buildAction(config, action, name, params, query, cb, options)
  }
}

export function createFetchGetAction(config, name, options) {
  var action = "GET";
  if(!options) options = {};
  options.type = "fetch";
  return function (parama, query, cb) {
    return buildFetchGetAction(config, action, name, params, query, cb, options)
  }
}

export function createGetAction(config, name, options) {
  if(options.type == "socket") 
    return createSocketGetAction(config, name, options);
  if(options.type == "fetch") 
    return createFetchGetAction(config, name, options);
}
