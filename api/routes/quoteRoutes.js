var express = require('express');

var routes = function(quote) {
	var quoteRouter = express.Router();

	quoteRouter.route('/')
		.get(function(req, res) {

			quote.find(function(err, quotes) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send quotes.
					res.json(quotes);
				}
			});
		});
	return quoteRouter;
};

module.exports = routes;