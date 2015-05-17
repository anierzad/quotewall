var express = require('express');

var routes = function(quotePartModel) {
	var quotePartRouter = express.Router();

	quotePartRouter.route('/')
		.post(function(req, res) {

			var quotePart = new quotePartModel(req.body);
			quotePart.save();
			
			res.status(201).send(quotePart._id);
		})
		.get(function(req, res) {

			var query = {};

            if(req.query.quoteid)
            {
                query.quote_id = req.query.quoteid;
            }

			quotePartModel.find(query, function(err, quoteParts) {

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

			quotePartModel.findById(req.params.id, function(err, quotePart) {

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
