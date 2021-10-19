
const course = require('../../assets/jsons/course.json');
const lessons = require('../../assets/jsons/lessons.json');
const { lessonRepository, courseRepository } = require('../repository/repository.index');

exports.addLessonsAndCourseData = async () => {
    try {

        let bulkLessonsArray = [];
        let bulkCourseArray = [];
        let lessonsCount = await lessonRepository.getLessonDataCount();
        let coursesCount = await courseRepository.getCourseDataCount();

        if (lessonsCount == 0) {
            for (let i = 0; i < lessons.length; i++) {

                bulkLessonsArray.push({
                    insertOne: {
                        document: {
                            "isPublished": lessons[i].isPublished,
                            "title": lessons[i].title,
                            "url": lessons[i].url,
                            "createdAt": lessons[i].createdAt,
                            "updatedAt": lessons[i].updatedAt,
                            "body": lessons[i].body
                        },
                    }
                });

            }
            var lessonResult = await lessonRepository.lessonBulkOperation(bulkLessonsArray);
        }

        if (coursesCount == 0) {
            for (let i = 0; i < course.length; i++) {

                bulkCourseArray.push({
                    insertOne: {
                        document: {
                            "isPublished": course[i].isPublished,
                            "title": course[i].title,
                            "url": course[i].url,
                            "createdAt": course[i].createdAt,
                            "updatedAt": course[i].updatedAt,
                            "content": course[i].content,
                        },
                    }
                });

            }
            var courseResult = await courseRepository.courseBulkOperation(bulkCourseArray);
        } 

        if (lessonResult) {
            console.log(`Added lesson (${lessonResult.insertedCount}) `);
        }
        if (courseResult) {
            console.log(`Added course (${courseResult.insertedCount}) `);
        }

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}
