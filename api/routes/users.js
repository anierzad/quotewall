var express = require('express');

var routes = function(userModel) {
	var userRouter = express.Router();

	userRouter.route('/')
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
		});

	userRouter.route('/:id')
		.get(function(req, res) {

			var criteria = {
				_id: req.params.id
			}

			userModel.find(criteria, function(err, user) {

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

	return userRouter;
};

module.exports = routes;
