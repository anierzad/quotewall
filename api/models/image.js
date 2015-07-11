var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('image', new Schema({
	data: {
		type: Buffer
	},
	contentType: {
		type: String
	},
	filename: {
		type: String
	}
}));
