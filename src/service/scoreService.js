const { courseEnrollmentRepository, scoreRepository, userRepository, courseRepository } = require('../repository/repository.index');
const { CONSTS } = require('../constants/consts');


/**
 * @description Calculate the Total Points
 *  
 */
exports.calculateTotalPoints = async () => {
	try {
		let users = await userRepository.getAllUsersId();
		let bulkScoreArray = [];
		for (let i = 0; i < users.length; i++) {
			let userId = users[i]._id.toString();
			let userTotalPoint = 0;
			let courseEnrollments = await courseEnrollmentRepository.getCourseEnrollmentsByUserId(userId);


			let totalComplatedLesson = 0;



			for (let i = 0; i < courseEnrollments.length; i++) {
				let course = await courseRepository.getCourseById(courseEnrollments[i].courseId);

				//tamamlanan kurs
				userTotalPoint = userTotalPoint + courseEnrollments.filter(p => p.completedLessons.length == course.content.length).length * CONSTS.complatedCoursePoint
				totalComplatedLesson = totalComplatedLesson + courseEnrollments[i].completedLessons.length

			}

			userTotalPoint = userTotalPoint + (courseEnrollments.length * CONSTS.joinCoursePoint) + (totalComplatedLesson * CONSTS.complatedlessonPoint);


			bulkScoreArray.push({
				updateMany:
				{
					"filter": { "userId": users[i]._id.toString() },
					"update": {

						$set:
						{
							"totalPoints": userTotalPoint,

						}

					}
				}
			})
 
		
		}
		return await scoreRepository.scoreBulkOperation(bulkScoreArray);


	} catch (error) {
		throw { success: false, error: error };
	}
};