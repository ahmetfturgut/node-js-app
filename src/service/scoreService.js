const { courseRepository, lessonRepository, courseEnrollmentRepository, scoreRepository, userRepository } = require('../repository/repository.index');
const enums = require('../utils/enums/enums');


/**
 * @description Calculate the Total Points
 *  
 */
exports.calculateTotalPoints = async () => {
	try {
		let checkedDataCount = 0;
		let errorDataCount = 0;  
		let users = await userRepository.getAllUsersId();
		for (let i = 0; i < users.length; i++) {
			let userId = users[i]._id.toString()
			let courseEnrollments = await courseEnrollmentRepository.getCourseEnrollmentsByUserId(userId);
			let totalComplatedLesson = 0;
			for (let i = 0; i < courseEnrollments.length; i++) {
				totalComplatedLesson = totalComplatedLesson + courseEnrollments[i].completedLessons.length

			}
			let userTotalPoint = (courseEnrollments.length * enums.points.joinCoursePoint) + (totalComplatedLesson * enums.points.complatedlessonPoint);
			let userScore = await scoreRepository.getUserScoreByUserId(userId);
			if (userTotalPoint == userScore.totalPoints) {
				checkedDataCount = checkedDataCount + 1;
			} else {
				errorDataCount = errorDataCount + 1;
			}

		}


		return { checkedDataCount, errorDataCount };
	} catch (error) {
		throw { success: false, error: any };
	}
};