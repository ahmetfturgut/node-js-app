const { userRepository, scoreRepository } = require('../repository/repository.index');
const users = require('../../assets/jsons/users.json');

exports.userBulkOperation = async () => {
	try {
		let bulkUserArray = [];
		let bulkScoreForUserArray = [];
		for (let i = 0; i < users.length; i++) {

			const ObjectId = require('mongodb').ObjectId;

			bulkUserArray.push({
				insertOne: {
					document: {
						"_id": ObjectId(),
						"name": users[i].name,
						"emailAddress": users[i].emailAddress,
					},
				}
			});


			bulkScoreForUserArray.push({
				insertOne: {
					document: {
						"userId": bulkUserArray[i].insertOne.document._id.toString(),
						"totalPoints": 0,
					},
				}
			});

		}
		let userResult = await userRepository.userBulkOperation(bulkUserArray);
		let scoreResult = await scoreRepository.scoreBulkOperation(bulkScoreForUserArray);


		return { userResult, scoreResult };
	} catch (error) {
		throw { success: false, error: any };
	}
};
