var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('quote', new Schema({
	created: {
		type: Date,
		default: Date.now
	}
}));
