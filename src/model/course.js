const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
	name: {
		type: String,
	},

	isPublished: {
		type: Boolean,
	},

	title: {
		type: String,
	},

	url: {
		type: String,
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	updatedAt: {
		type: Date,
		default: Date.now
	},
	content: [{
		lessonId: {
			type: String,
		},
		lessonBody: {
			type: String,
		},
	}]

});

const Course = mongoose.model('course', CourseSchema);

exports.Course = Course;
