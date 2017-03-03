// server.js
const path = require('path');
const compression = require('compression');
const express = require('express');
const app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// Use Gzip compression
app.use(compression());

// Start the app by listening on the default
// Heroku port
var port = process.env.PORT || 8080;
console.log('Listening on port:', port);
app.listen(port);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
