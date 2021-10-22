
const { userRepository, courseEnrollmentRepository, courseRepository, scoreRepository, lessonRepository } = require('../repository/repository.index');
const { courseEnrollmentService, lessonService, userService, scoreService, courseService } = require('../service/service.index');

exports.initializeData = async () => {
    await removeData();
    await addLessonsAndCourseData();
    await addUsersAndScoreData();
    await addCourseEnrollmentData();
    await addComplatedLessonToCourseEnrollmentsData();
    await calculateTotalPoints();
    console.log("Finish Data Set")
}


/**
*  @description Clear Database 
*/
const removeData = async () => {
    try {

        await userRepository.removeAllUser();
        await courseEnrollmentRepository.removeAllCourseEnrollment();
        await courseRepository.removeAllCourse();
        await scoreRepository.removeAllScore()
        await lessonRepository.removeAllLesson();

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}



/**
*  @description TASK 1
*  Start a local db and create and insert mock data for 30 courses with 20 unique lessons.
*/
const addLessonsAndCourseData = async () => {
    try {
        
        let resultLessons = await lessonService.lessonBulkOperation();
        let resultCourse = await courseService.courseBulkOperation();
        if (resultLessons) {
            console.log(`Added lesson (${resultLessons.insertedCount}) `);
        }
        if (resultCourse) {
            console.log(`Added course (${resultCourse.insertedCount}) `);
        }

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}



/**
*  @description TASK 2
*  Create 1000 mock users with unique emails and add a score object for each user.
*/
const addUsersAndScoreData = async () => {
    try {
        let resultUsers = await userService.userAndScoreBulkOperation();
        if (resultUsers.userResult) {
            console.log(`Added user (${resultUsers.userResult.insertedCount}) `);
        }
        if (resultUsers.scoreResult) {
            console.log(`Added score (${resultUsers.scoreResult.insertedCount}) `);
        }

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}



/**
*  @description TASK 3
*  Add course enrollments to each user by the count of a random number between 1 to 10. 
*/

const addCourseEnrollmentData = async () => {
    try {

        let resultscourseEnrollment = await courseEnrollmentService.setCurseEnrollmentData();
        if (resultscourseEnrollment.courseEnrollmentResult) {
            console.log(`Added courseEnrollment (${resultscourseEnrollment.courseEnrollmentResult.insertedCount}) `);
        }
    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}





/**
*  @description TASK 4
*  Add completed lessons to course enrollments by the count of a random number between 1 to 20 
*/

const addComplatedLessonToCourseEnrollmentsData = async () => {
    try {

        let result = await courseEnrollmentService.addComplatedLessonToCourseEnrollmentsData();
        if (result.courseEnrollmentResult) {
            console.log(`Updated courseEnrollment (${result.courseEnrollmentResult.nModified}) `);
        }
    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}



/**
*  @description TASK 4
*  Calculate the total points of each user. 
*/
const calculateTotalPoints = async () => {
    try {

        let result = await scoreService.calculateTotalPoints();
       
    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}





