

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CourseEnrollmentSchema = new Schema({


    userId: {
        type: String,
    },

    courseId: {
        type: String,
    },

    lastVisitedLesson: {
        type: String,
    },

    lastCompletedLesson: {
        type: String,
    },

    completedLessons: [{
        lessonId: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const CourseEnrollment = mongoose.model('courseEnrollment', CourseEnrollmentSchema);

exports.CourseEnrollment = CourseEnrollment;