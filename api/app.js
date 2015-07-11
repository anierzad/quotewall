var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cors = require('cors');

// Database setup.
var db = mongoose.connect('mongodb://localhost/quotewall');
var user = require('./models/user')
var quote = require('./models/quote');
var quotePart = require('./models/quotePart');
var image = require('./models/image');

// General setup.
var app = express();
var port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes setup.
app.use('/api/users', require('./routes/users')(user));
app.use('/api/quotes', require('./routes/quotes')(quote));
app.use('/api/quoteparts', require('./routes/quoteParts')(quotePart));
app.use('/api/images', require('./routes/images')(image));

// Test route.
app.get('/', function(req, res) {
	res.send('Can I help you?');
});

// Start listening for requests.
app.listen(port, function() {
	console.log('API server listening on port: ' + port + '.');
});
