let express = require('express');
let bodyParser = require('body-parser');
let handler = require('./request-handler.js');

// Initialize app
let app = express();

// Include body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use index.html in root directory as entry point
app.use(express.static(__dirname + '/../'));

// Routes
app.post('/api/encrypt/:id', handler.encrypt)
app.post('/api/decrypt/:id', handler.decrypt)

// Export express server
module.exports = app;