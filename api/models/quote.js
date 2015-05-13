var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var quoteModel = new schema({
	author: {
		type: String
	},
	content: {
		type: String
	}
});

module.exports = mongoose.model('quote', quoteModel);