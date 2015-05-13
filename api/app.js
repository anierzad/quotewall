var express = require('express'),
	mongoose = require('mongoose');

// Database setup.
var db = mongoose.connect('mongodb://localhost/quotewall');
var quote = require('./models/quote');

// General setup.
var app = express();
var port = process.env.PORT || 3000;

// Routes setup.
quoteRouter = require('./routes/quoteRoutes')(quote);
app.use('/api/quotes', quoteRouter);

// Test route.
app.get('/', function(req, res) {
	res.send('Can I help you?');
});

// Start listening for requests.
app.listen(port, function() {
	console.log('API server listening on port: ' + port + '.');
});
