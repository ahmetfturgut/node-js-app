
const { userRepository, courseEnrollmentRepository, courseRepository, scoreRepository, lessonRepository } = require('../repository/repository.index');
const { courseEnrollmentService, lessonService, userService, scoreService } = require('../service/service.index');

exports.initializeData = async () => {
    await removeData();
    await addLessonsAndCourseData();
    await addUsersAndScoreData();
    await addCourseEnrollmentData();
    await addComplatedLessonToCourseEnrollmentsData();
    await calculateTotalPoints();
    console.log("Finish Data Set")
}


const addLessonsAndCourseData = async () => {
    try {
        let resultLessons = await lessonService.lessonBulkOperation();
        if (resultLessons.courseResult) {
            console.log(`Added course (${resultLessons.courseResult.insertedCount}) `);
        }
        if (resultLessons.lessonResult) {
            console.log(`Added lesson (${resultLessons.lessonResult.insertedCount}) `);
        }

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}

const addUsersAndScoreData = async () => {
    try {
        let resultUsers = await userService.userBulkOperation();
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

const calculateTotalPoints = async () => {
    try {

        let result = await scoreService.calculateTotalPoints();
        console.log("Point of data whose score was validated=" + result.checkedDataCount + "\nError Data Count=" + result.errorDataCount)
    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}


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



