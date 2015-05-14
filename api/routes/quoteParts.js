var express = require('express');

var routes = function(quotePartModel) {
	var quotePartRouter = express.Router();

	quotePartRouter.route('/')
		.get(function(req, res) {
			console.log(quotePartModel.collection);
			quotePartModel.find(function(err, quoteParts) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send quoteParts.
					res.json(quoteParts);
				}
			});
		});

	quotePartRouter.route('/:id')
		.get(function(req, res) {

			var criteria = {
				_id: req.params.id
			}

			quotePartModel.find(criteria, function(err, quotePart) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send quotePart.
					res.json(quotePart);
				}
			});
		});

	return quotePartRouter;
};

module.exports = routes;
