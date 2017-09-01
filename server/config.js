var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./request-handler.js');

// Initialize app
var app = express();

// Include body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use index.html in root directory as entry point
app.use(express.static(__dirname + '/../'));

// Routes
// TODO
// app.get('route', handler.)
// app.post

// Export express server
module.exports = app;