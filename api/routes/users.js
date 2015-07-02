var express = require('express');

var routes = function(userModel) {
	var userRouter = express.Router();

	userRouter.route('/')
		.post(function(req, res) {

			var message;
			var status;

			// Check first name.
			if(!req.body.firstName) {
				message = 'First name is required.';
				status = 400;
			}

			// Check surname.
			if(!status && !req.body.surname) {
				message = 'Surname is required.';
				status = 400;
			}

			// Check e-mail.
			if(!status && !req.body.email) {
				message = 'E-mail is required.';
				status = 400;
			}

			// No errors, create new user.
			if(!status) {
				var user = new userModel(req.body);
				user.save();

				message = user._id;
				status = 201;
			}
			
			res.status(status).send(message);
		})
		.get(function(req, res) {

			userModel.find(function(err, users) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send users.
					res.json(users);
				}
			});
		})
		.put(function(req, res) {

			userModel.findById(req.body._id, function(err, user) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, update user.
					user.firstName = req.body.firstName;
					user.surname = req.body.surname;
					user.email = req.body.email;
					user.save();

					// Return user.
					res.json(user);
				}});
		});

	userRouter.route('/:id')
		.get(function(req, res) {

			userModel.findById(req.params.id, function(err, user) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// No, send user.
					res.json(user);
				}
			});
		});

	userRouter.route('/image/:id/:filename')
		.get(function(req, res) {

			userModel.findById(req.params.id, function(err, user) {

				// Error?
				if(err) {

					// Yes, send error status with message.
					res.status(500).send(err);
				} else {

					// Build path to image.
					var imagePath = __dirname + '/../img/' + req.params.filename;
					console.log(imagePath);

					// Check it exists.
					var fs = require('fs');

					fs.exists(imagePath, function(exists) {
						if(exists) {

							console.log('Loading image.');

							// Add to user and save.
							user.image.data = fs.readFileSync(imagePath);
							user.image.contentType = 'image/jpeg';
							user.save();

							console.log('Saving user.');

							// Return OK.
							res.status(200).send('User updated with image.');

						} else {

							// Return error.
							res.status(500).send('Image not found.');
						}
					});
				}
			});
		});


	return userRouter;
};

module.exports = routes;
