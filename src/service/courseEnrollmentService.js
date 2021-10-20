const { courseRepository, userRepository, courseEnrollmentRepository } = require('../repository/repository.index');



exports.setCurseEnrollmentData = async () => {
	try {


		let users = await userRepository.getAllUsersId();
		let bulkcourseEnrollmentArray = [];
		for (let i = 0; i < users.length; i++) {

			let random = getRandomInt(10);
			let course = await courseRepository.getCourserRandomData(random);

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

		}
		let courseEnrollmentResult = await courseEnrollmentRepository.curseEnrollmentBulkOperation(bulkcourseEnrollmentArray);

		return { courseEnrollmentResult};
	} catch (error) {
		throw { success: false, error: any };
	}
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}




