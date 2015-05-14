var express = require('express'),
	connectLivereload = require('connect-livereload');

// General setup.
var app = express();
var port = process.env.PORT || 3500;

// Inject live reload code.
app.use(connectLivereload());

// Setup static.
app.use(express.static('public'));

// Start listening for requests.
app.listen(port, function() {
	console.log('Client server running on port: ' + port + '.');
});