/* eslint-disable */

var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var socket_io = require('socket.io');
var dataset = require('./test-data.js');

var io = socket_io();
var app = express();
var server = http.Server(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var serverPort = process.env.PORT || 1234;
/*
// Run server on port
server.listen(serverPort, () => {
  var host = server.address().address;
  var port = server.address().port;
  //console.log('Example app listening at http://%s:%s', host, port);
});
*/
// Actions
var mockDB = {
  create: function(collection, data) {
    //console.log(data);
    if (!data.id) data.id = (_.maxBy(dataset[collection], 'id').id + 1);
    //console.log(data.id);
    dataset[collection].push(data);
    return { error: null, data: data };
  },
  update: function(collection, data) {
    var item = _.find(dataset[collection], { id: data.id });
    item = _.assignIn(item, data);
    dataset[collection].splice(_.findIndex(dataset[collection], { id: data.id }), 1, item);
    return { error: null, data: item };
  },
  destroy: function(collection, data) {
    dataset[collection] = _.reject(dataset[collection], data);
    return { error: null, data: true };
  },
  find: function(collection, data) {
    if (!data) data = {};
    return { error: null, data: _.filter(dataset[collection], data) };
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