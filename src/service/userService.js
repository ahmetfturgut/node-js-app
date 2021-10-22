const { userRepository, scoreRepository } = require('../repository/repository.index');
const users = require('../../assets/jsons/users.json');

exports.userAndScoreBulkOperation = async () => {
	try {
		let bulkUserArray = [];
		let bulkScoreForUserArray = [];


		/**
		 * @description
		 1) https://www.mockaroo.com/ Sitesinden oluşturulan sahte kullanıcıları(1000)
		       Database e yazmak için 1000 post yerine Maliyeti ve Performansı azaltmak için "Bulk Operation" ile tek sefer de tüm kayıt işlemini yapıldı.
		 2) User datalarını hazrılamak için kurduğum döngüde aynı zamanda Score datasını da hazırladım ve 1000 Score datasını da "Bulk Operation" tek seferde yapıldı.
		 3) User ile Scor taplosunu ilişkilendirmek için Mongonun default oluşturacağı ObjectId'yi burda oluşturdum 
		 ---const ObjectId = require('mongodb').ObjectId;---
		*/

		for (let i = 0; i < users.length; i++) {

			bulkUserArray.push(setUserData(users[i]));
			bulkScoreForUserArray.push(setScoreData(bulkUserArray[i].insertOne.document._id));

		}
		let userResult = await userRepository.userBulkOperation(bulkUserArray);
		let scoreResult = await scoreRepository.scoreBulkOperation(bulkScoreForUserArray);


		return { userResult, scoreResult };
	} catch (error) {
		throw { success: false, error: error };
	}
};

/**
*  @description   Kullanıcın bilgileri Bulk Operation için hazırlanıyor  
*  @param user
*/
const setUserData = (user) => {
	/**
	*  @description   mongonun default oluşturacağı ObjectId yi burda oluşturduk User a ait Scor Kayıdını Db ye gitmeden iliştiklendirdik    
	*/
	const ObjectId = require('mongodb').ObjectId;
	return ({
		insertOne: {
			document: {
				"_id": ObjectId(),
				"name": user.name,
				"emailAddress": user.emailAddress,
			},
		}
	})

}

/**
*  @description   Kullanıcının Score bilgileri Bulk Operation için hazırlanıyor  
*  @param userId
*/
const setScoreData = (userId) => {
	
	return ({
		insertOne: {
			document: {
				"userId": userId.toString(),
				"totalPoints": 0,
			},
		}
	})
}
