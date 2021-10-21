const { courseRepository, userRepository, courseEnrollmentRepository, lessonRepository, scoreRepository } = require('../repository/repository.index');
const enums = require('../utils/enums/enums');



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
						$set: { 'totalPoints': course.length * enums.points.joinCoursePoint }, 

					}
				}
			});

		}
		let courseEnrollmentResult = await courseEnrollmentRepository.curseEnrollmentBulkOperation(bulkcourseEnrollmentArray);
		let scoreResult = await scoreRepository.scoreBulkOperation(bulkScoreArray);

		return { courseEnrollmentResult,scoreResult };
	} catch (error) {
		throw { success: false, error: any };
	}
};

exports.addComplatedLessonToCourseEnrollmentsData = async () => {
	try {
 
		let courseEnrollment = await courseEnrollmentRepository.getAllcourseEnrollments();
		let bulkcourseEnrollmentArray = [];
		let bulkScoreArray = [];
		for (let i = 0; i < courseEnrollment.length; i++) {

			let random = getRandomInt(20);
			let lessons = await lessonRepository.getRandomLessonsId(random);
			let completedLessons = [];
			let scoreHistoryData = [];
			let totalPoints = 0;

			for (let j = 0; j < lessons.length; j++) {
				totalPoints = totalPoints + enums.points.complatedlessonPoint
				completedLessons.push({ "lessonId": lessons[j]._id.toString() })
				scoreHistoryData.push({
					"point": enums.points.complatedlessonPoint,
					"courseId": courseEnrollment[i].courseId,
					"lessonId": lessons[j]._id.toString(),
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
							"lastCompletedLesson": lessons.slice(-1)[0]._id.toString(),
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
		throw { success: false, error: any };
	}
};


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}




