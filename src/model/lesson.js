

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var LessonSchema = new Schema({


    isPublished: {
        type: Boolean,
    },

    title: {
        type: String,
    },

    url: {
        type: String,
    },

    body: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Lesson = mongoose.model('lesson', LessonSchema);

exports.Lesson = Lesson;