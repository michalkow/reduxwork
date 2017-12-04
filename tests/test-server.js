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

var port = process.env.PORT || 1234;

// Run server on port
server.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// Actions
var mockDB = {
  create: function(collection, data) {
    console.log(data);
    if(!data.id) data.id = (_.maxBy(dataset[collection], 'id').id + 1);
    console.log(data.id)
    dataset[collection].push(data);
    return data;
  },
  update: function(collection, data) {
    var item = _.find(dataset[collection], {id: data.id});
    item = _.assignIn(item, data);
    dataset[collection].splice(_.findIndex(dataset[collection], {id: data.id}), 1, item);
    return item;
  },
  destroy: function(collection, data) {
    dataset[collection] = _.reject(dataset[collection], data);
    return true;
  },
  find: function(collection, data) {
    if(!data) data = {};
    return _.filter(dataset[collection], data);
  },
}

app.post('/api/:collection/:action', function(req, res, next) {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

app.delete('/api/:collection/:action', function(req, res, next) {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

app.put('/api/:collection/:action', function(req, res, next) {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

app.get('/api/:collection/:action', function(req, res, next) {
  res.json(mockDB[req.params.action](req.params.collection, req.body));
});

io.attach(server);
io.on('connection', function(socket){
  console.log("Socket connected: " + socket.id);

  socket.on('redux_action_event', (action, callback) => {
    console.log("Socket action: " + action);
    var actionType = action.type.toLowerCase();
    var actionType = actionType.split('_');
    callback(null, mockDB[actionType[0]](actionType[1], action.data));
  });

  socket.on('disconnect', function() {
    console.log('Got disconnect!');
  });
});

module.exports = app;