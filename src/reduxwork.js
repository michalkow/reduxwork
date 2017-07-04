import createAction from './actions/createAction';
import createLocalActions from './actions/createLocalActions';
import {createSocketActions, createFetchActions, createIoActions} from './actions/createIoActions';
import {createSocketGetAction, createFetchGetAction, createGetAction} from './actions/createGetAction';
import {createSocketPostAction, createFetchPostAction, createPostAction} from './actions/createPostAction';
import createReducer from './reducers/createReducer';
import createIoReducers from './reducers/createIoReducers';
import createLocalReducers from './reducers/createLocalReducers';

var reduxwork = {
	createAction, 
	createLocalActions, 
	createSocketActions, 
	createFetchActions, 
	createIoActions, 
	createSocketGetAction, 
	createFetchGetAction, 
	createGetAction, 
	createSocketPostAction, 
	createFetchPostAction, 
	createPostAction, 
	createReducer, 
	createIoReducers, 
	createLocalReducers
};

exports.default = reduxwork;

exports.createAction = createAction; 
exports.createLocalActions = createLocalActions; 
exports.createSocketActions = createSocketActions; 
exports.createFetchActions = createFetchActions; 
exports.createIoActions = createIoActions; 
exports.createSocketGetAction = createSocketGetAction; 
exports.createFetchGetAction = createFetchGetAction; 
exports.createGetAction = createGetAction; 
exports.createSocketPostAction = createSocketPostAction; 
exports.createFetchPostAction = createFetchPostAction; 
exports.createPostAction = createPostAction; 
exports.createReducer = createReducer; 
exports.createIoReducers = createIoReducers; 
exports.createLocalReducers = createLocalReducers;