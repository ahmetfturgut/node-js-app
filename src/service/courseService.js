const { lessonRepository, courseRepository } = require('../repository/repository.index');
const courses = require('../../assets/jsons/course.json');
const {CONSTS} = require('../constants/consts');


const getRandomCourse = async () => {
	const lessonCount = Math.floor(Math.random() * CONSTS.maxLessonCount) + CONSTS.minLessonCount;
     
	let lessons = await lessonRepository.getRandomLessons(lessonCount);
	let lessonContent = [];
	lessons.map(lesson => {
		lessonContent.push({
			"lessonId": lesson._id.toString(),
			"lessonBody": lesson.body
		})
	})

	return lessonContent;

}


exports.courseBulkOperation = async () => {

	try {
		let bulkCourseArray = [];
		for (let i = 0; i < courses.length; i++) {
			const courseContents = await getRandomCourse()

			bulkCourseArray.push({
				insertOne: {
					document: {
						"isPublished": true,
						"title": courses[i].title,
						"url": courses[i].url,
						"body": courses[i].body,
						"content": courseContents
					},
				}
			});

		}
		return await courseRepository.courseBulkOperation(bulkCourseArray);


	} catch (error) {
		throw { success: false, error: error };
	}
};
