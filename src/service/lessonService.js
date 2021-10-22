const { lessonRepository } = require('../repository/repository.index');
const lessons = require('../../assets/jsons/lessons.json');



exports.lessonBulkOperation = async () => {
	try {
		let bulkLessonsArray = [];
		for (let i = 0; i < lessons.length; i++) {
			bulkLessonsArray.push({
				insertOne: {
					document: {
						"isPublished": lessons[i].isPublished,
						"title": lessons[i].title,
						"url": lessons[i].url,
						"body": lessons[i].body
					},
				}
			});

		}
		return await lessonRepository.lessonBulkOperation(bulkLessonsArray);
 
	} catch (error) {
		throw { success: false, error: error };
	}
};
