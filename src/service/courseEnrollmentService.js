const { courseRepository, userRepository, courseEnrollmentRepository, lessonRepository } = require('../repository/repository.index');



exports.setCurseEnrollmentData = async () => {
	try {


		let users = await userRepository.getAllUsersId();
		let bulkcourseEnrollmentArray = [];
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

		}
		let courseEnrollmentResult = await courseEnrollmentRepository.curseEnrollmentBulkOperation(bulkcourseEnrollmentArray);

		return { courseEnrollmentResult };
	} catch (error) {
		throw { success: false, error: any };
	}
};

exports.addComplatedLessonToCourseEnrollmentsData = async () => {
	try {


		let courseEnrollment = await courseEnrollmentRepository.getAllcourseEnrollmentsId();
		let bulkcourseEnrollmentArray = [];
		for (let i = 0; i < courseEnrollment.length; i++) {

			let random = getRandomInt(20);
			let lessons = await lessonRepository.getRandomLessonsId(random);
			let completedLessons=[];
			for (let j = 0; j < lessons.length; j++) {

				completedLessons.push({"lessonId": lessons[j]._id.toString()})

			}
			bulkcourseEnrollmentArray.push({
				updateMany:
				{
					"filter": { "_id": courseEnrollment[i]._id.toString() },
					"update": {
						$set:
						{
							"completedLessons": completedLessons

						}

					}
				}
			});
			

		}
		let courseEnrollmentResult = await courseEnrollmentRepository.curseEnrollmentBulkOperation(bulkcourseEnrollmentArray);

		return { courseEnrollmentResult };
	} catch (error) {
		throw { success: false, error: any };
	}
};


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}




