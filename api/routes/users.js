var express = require('express');

var routes = function(userModel) {
	var userRouter = express.Router();

	userRouter.route('/')
		.all(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "X-Requested-With");
  			next();
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
		});

	userRouter.route('/:id')
		.all(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "X-Requested-With");
  			next();
		})
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

	return userRouter;
};

module.exports = routes;
