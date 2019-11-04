/* eslint-disable */

var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var socket_io = require('socket.io');
var getPayloadByIds = require('./test-data.js').getPayloadByIds;

var io = socket_io();
var app = express();
var server = http.Server(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var serverPort = process.env.PORT || 1234;

// Run server on port
/*
server.listen(serverPort, () => {
  var host = server.address().address;
  var port = server.address().port;
  //console.log('Example app listening at http://%s:%s', host, port);
});
*/

var database = {
  messages: [],
  users: []
}

// Actions
var mockDB = {
  create: function(collection, data) {
    //console.log('Request', data);
    database[collection] = _.unionBy(database[collection], getPayloadByIds(data), 'id');
    const response = { error: null, data: getPayloadByIds(data) };
    //console.log('Response', response);
    return response;
  },
  update: function(collection, data) {
    //console.log('Request', data);
    database[collection] = _.unionBy(database[collection], getPayloadByIds(data, true), 'id');
    const response = { error: null, data: getPayloadByIds(data, true) };
    //console.log('Response', response);
    return response;
  },
  destroy: function(collection, data) {
    //console.log('Request', data);
    database[collection] = _.reject(database[collection], (item) => _.find(data, { id: item.id }));
    const response = { error: null, data: true };
    //console.log('Response', response);
    return response;
  },
  find: function(collection, data) {
    //console.log('Request', data);
    const response = { error: null, data: database[collection] };
    //console.log('Response', response);
    return response;
  }
};

app.post('/api/:collection/:action', (req, res, next) => {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

app.delete('/api/:collection/:action', (req, res, next) => {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

app.put('/api/:collection/:action', (req, res, next) => {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

app.get('/api/:collection/:action', (req, res, next) => {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

io.attach(server);
io.on('connection', (socket) => {
  //console.log('Socket connected: ' + socket.id);

  socket.on('redux_action_event', (action, callback) => {
    //console.log('Socket action: ' + JSON.stringify(action));
    //console.log('Sending data: ' + JSON.stringify(mockDB[action.data.meta.operation](action.data.meta.name, action.data.payload)));
    var query = mockDB[action.data.meta.operation](action.data.meta.name, action.data.payload);
    callback(query.error, query.data);
  });

  socket.on('disconnect', () => {
    //console.log('Got disconnect!');
  });
});

module.exports = server;