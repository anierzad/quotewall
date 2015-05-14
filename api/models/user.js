var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('user', new Schema({
	firstName: {
		type: String
	},
	surname: {
		type: String
	}
}));
