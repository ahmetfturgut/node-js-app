const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
	},

	emailAddress: {
		type: String,
		unique: true,
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

});

const User = mongoose.model('user', UserSchema);

exports.User = User;
