
const course = require('../../assets/jsons/course.json');
const lessons = require('../../assets/jsons/lessons.json');
const users = require('../../assets/jsons/users.json');
const { lessonRepository, courseRepository, userRepository,scoreRepository } = require('../repository/repository.index');

exports.addLessonsAndCourseData = async () => {
    try {



        let lessonsCount = await lessonRepository.getLessonDataCount();
        let coursesCount = await courseRepository.getCourseDataCount();
        let usersCount = await userRepository.getUserDataCount();

        if (lessonsCount == 0) {
            let bulkLessonsArray = [];
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
            let lessonResult = await lessonRepository.lessonBulkOperation(bulkLessonsArray);
            if (lessonResult) {
                console.log(`Added lesson (${lessonResult.insertedCount}) `);
            }
        }

        if (coursesCount == 0) {
            let bulkCourseArray = [];
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
            let courseResult = await courseRepository.courseBulkOperation(bulkCourseArray);
            if (courseResult) {
                console.log(`Added course (${courseResult.insertedCount}) `);
            }
        }
        if (usersCount == 0) {
            let bulkUserArray = [];
            let bulkScoreForUserArray = [];
            for (let i = 0; i < users.length; i++) {

                const ObjectId = require('mongodb').ObjectId;
              


                bulkUserArray.push({
                    insertOne: {
                        document: {
                            "_id":   ObjectId(),
                            "name": users[i].name,
                            "emailAddress": users[i].emailAddress, 
                        },
                    }
                });
               
                
                bulkScoreForUserArray.push({
                    insertOne: {
                        document: {
                            "userId": bulkUserArray[i].insertOne.document._id.toString(),
                            "totalPoints": i, 
                            'history.$.point': i,
                            'history.$.date': Date.now,
                            'history.$.courseId': new ObjectId,
                            'history.$.lessonId': new ObjectId,
                            
                        },
                    }
                });

            }
            let userResult = await userRepository.userBulkOperation(bulkUserArray);
            let scoreResult = await scoreRepository.scoreBulkOperation(bulkScoreForUserArray);
            if (userResult) {
                console.log(`Added course (${userResult.insertedCount}) `);
            }
            if (scoreResult) {
                console.log(`Added course (${scoreResult.insertedCount}) `);
            }
        }


        console.log(`Finish added data `);


    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}
