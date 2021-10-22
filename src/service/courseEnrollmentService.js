const { courseRepository, userRepository, courseEnrollmentRepository, lessonRepository, scoreRepository } = require('../repository/repository.index');
const {CONSTS} = require('../constants/consts');



exports.setCurseEnrollmentData = async () => {
	try {


		let users = await userRepository.getAllUsersId();
		let bulkcourseEnrollmentArray = [];
		let bulkScoreArray = []; 
		for (let i = 0; i < users.length; i++) {

			let random = getRandomInt(10);
			let course = await courseRepository.getRandomCourseId(random);

			for (let j = 0; j < course.length; j++) {

				bulkcourseEnrollmentArray.push({
					insertOne: {
						document: {
							"userId": users[i]._id,
							"courseId": course[j]._id,
						},
					}
				});
				
			}

			bulkScoreArray.push({
				updateMany:
				{
					"filter": { "userId": users[i]._id },
					"update": {
						$set: { 'totalPoints': course.length * CONSTS.joinCoursePoint }, 

					}
				}
			});

		}
		let courseEnrollmentResult = await courseEnrollmentRepository.curseEnrollmentBulkOperation(bulkcourseEnrollmentArray);
		let scoreResult = await scoreRepository.scoreBulkOperation(bulkScoreArray);

		return { courseEnrollmentResult,scoreResult };
	} catch (error) {
		throw { success: false, error: error };
	}
};

exports.addComplatedLessonToCourseEnrollmentsData = async () => {
	try {
 
		let courseEnrollment = await courseEnrollmentRepository.getAllcourseEnrollments();
		let bulkcourseEnrollmentArray = [];
		let bulkScoreArray = [];

		for (let i = 0; i < courseEnrollment.length; i++) {
			 
			let course = await courseRepository.getCourseById(courseEnrollment[i].courseId);
			let completedLessons = [];
			let scoreHistoryData = [];
			let totalPoints = 0;

			const contentCount = Math.floor(Math.random() * course.content.length) + 1;

			for (let j = 0; j < contentCount; j++) {

				completedLessons.push({
					"lessonId":course.content[j].lessonId, 
				})
				
				totalPoints = totalPoints + CONSTS.complatedlessonPoint;
				 
				scoreHistoryData.push({
					"point": CONSTS.complatedlessonPoint,
					"courseId": course._id.toString(),
					"lessonId": course.content[j].lessonId,
				})

			} 
			
			bulkScoreArray.push({
				updateMany:
				{
					"filter": { "userId": courseEnrollment[i].userId },
					"update": {
						$inc: { 'totalPoints': totalPoints },
						$push:
						{
							"history": scoreHistoryData,

						}

					}
				}
			});


			bulkcourseEnrollmentArray.push({
				updateMany:
				{
					"filter": { "_id": courseEnrollment[i]._id.toString() },
					"update": {
						$set:
						{
						 
							"lastCompletedLesson": completedLessons.slice(-1)[0].lessonId,
							"completedLessons": completedLessons

						}

					}
				}
			});


		}
		let courseEnrollmentResult = await courseEnrollmentRepository.curseEnrollmentBulkOperation(bulkcourseEnrollmentArray);
		let scoreResult = await scoreRepository.scoreBulkOperation(bulkScoreArray);

		return { courseEnrollmentResult, scoreResult };
	} catch (error) {
		throw { success: false, error: error };
	}
};


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}




