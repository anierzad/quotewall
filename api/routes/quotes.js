var express = require('express');

var routes = function(quoteModel) {
	var quoteRouter = express.Router();

	quoteRouter.route('/')
		.all(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "X-Requested-With");
  			next();
		})
		.get(function(req, res) {

			quoteModel.find(function(err, quotes) {

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

	quoteRouter.route('/:id')
		.all(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "X-Requested-With");
  			next();
		})
		.get(function(req, res) {

			quoteModel.findById(req.params.id, function(err, quote) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send quote.
					res.json(quote);
				}
			});
		});

	return quoteRouter;
};

module.exports = routes;
