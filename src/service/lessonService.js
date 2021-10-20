const { lessonRepository ,courseRepository} = require('../repository/repository.index');
const lessons = require('../../assets/jsons/lessons.json');

/**
 * @description Gets the all users
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: [*]}>}
 * {success: false, error: any} or {success: true, data: [users]}
 */
exports.lessonBulkOperation = async () => {
	try {
		let bulkLessonsArray = [];
		let bulkCourseArray = [];
		for (let i = 0; i < lessons.length; i++) {

			let ObjectId = require('mongodb').ObjectId;

			bulkLessonsArray.push({
				insertOne: {
					document: {
						"_id": new ObjectId(),
						"isPublished": lessons[i].isPublished,
						"title": lessons[i].title,
						"url": lessons[i].url,
						"body": lessons[i].body
					},
				}
			});

			bulkCourseArray.push({
				insertOne: {
					document: {
						"isPublished": bulkLessonsArray[i].insertOne.document.isPublished,
						"title": bulkLessonsArray[i].insertOne.document.title,
						"url": bulkLessonsArray[i].insertOne.document.url,
						"content": {
							"lessonId": bulkLessonsArray[i].insertOne.document._id.toString(),
							"lessonBody": bulkLessonsArray[i].insertOne.document.body
						},
					},
				}
			});
			if (i > 9) {
				bulkCourseArray.push({
					insertOne: {
						document: {
							"isPublished": bulkLessonsArray[i].insertOne.document.isPublished,
							"title": bulkLessonsArray[i].insertOne.document.title,
							"url": bulkLessonsArray[i].insertOne.document.url,
							"content": {
								"lessonId": bulkLessonsArray[i].insertOne.document._id.toString(),
								"lessonBody": bulkLessonsArray[i].insertOne.document.body
							},
						},
					}
				});
			}


		}
		let lessonResult = await lessonRepository.lessonBulkOperation(bulkLessonsArray);
		let courseResult = await courseRepository.courseBulkOperation(bulkCourseArray);
	

		return { lessonResult,courseResult };
	} catch (error) {
		throw { success: false, error: any };
	}
};
 