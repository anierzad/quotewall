var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('quotePart', new Schema({
	quote_id: {
		type: String
	},
	author_id: {
		type: String
	},
	order: {
		type: Number
	},
	content: {
		type: String
	}
}));
