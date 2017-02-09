// server.js
const path = require('path');
const express = require('express');
const app = express();

// Ensure that HTTPS is used in production or redirect to it
var ensureHttpsOrRedirect = function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    let protocol = req.headers['x-forwarded-proto'];
    if (protocol && protocol.toLowerCase() != 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};
app.use(ensureHttpsOrRedirect);

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
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
