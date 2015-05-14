var express = require('express'),
	mongoose = require('mongoose');

// Database setup.
var db = mongoose.connect('mongodb://localhost/quotewall');
var user = require('./models/user')
var quote = require('./models/quote');
var quotePart = require('./models/quotePart');

// General setup.
var app = express();
var port = process.env.PORT || 3000;

// Routes setup.
app.use('/api/users', require('./routes/users')(user));
app.use('/api/quotes', require('./routes/quotes')(quote));
app.use('/api/quoteparts', require('./routes/quoteParts')(quotePart));

// Test route.
app.get('/', function(req, res) {
	res.send('Can I help you?');
});

// Start listening for requests.
app.listen(port, function() {
	console.log('API server listening on port: ' + port + '.');
});
