var express = require('express');

var routes = function(imageModel) {
	var imageRouter = express.Router();

	imageRouter.route('/')
		.get(function(req, res) {

			imageModel.find(function(err, users) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send images.
					res.json(users);
				}
			});
		})

	imageRouter.route('/:id')
		.get(function(req, res) {

			imageModel.findById(req.params.id, function(err, image) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send image.
					res.contentType = image.contentType;
					res.send(image.data);
				}
			});
		});

	imageRouter.route('/add/:filename')
		.get(function(req, res) {

			// Build path to image.
			var imagePath = __dirname + '/../img/' + req.params.filename;
			console.log(imagePath);

			// Check it exists.
			var fs = require('fs');

			fs.exists(imagePath, function(exists) {
				if(exists) {

					console.log('Loading image.');

					// Create image object.
					var image = new imageModel();

					image.data = fs.readFileSync(imagePath);
					image.contentType = 'image/jpeg';
					image.filename = req.params.filename;
					image.save();

					// Return OK.
					res.status(201).send('Image created.');

				} else {

					// Return error.
					res.status(500).send('Image not found.');
				}
			});
		});


	return imageRouter;
};

module.exports = routes;
