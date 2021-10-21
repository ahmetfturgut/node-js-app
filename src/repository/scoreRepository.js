const Score = require('../model/score').Score;
 /** 
 *  @description get all score count  
 */
  exports.getScoreDataCount = () => {
    return new Promise((resolve, reject) => {
        Score.count()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}

/** 
 *  @description Bulk Operation: Write bulkArray in DB 
 * @param bulkArray {array} 
 */
 exports.scoreBulkOperation = (bulkArray) => {
    return new Promise((resolve, reject) => {
        Score.bulkWrite(bulkArray)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}

/** 
 *  @description Bulk Operation: Write bulkArray in DB 
 * @param bulkArray {array} 
 */
 exports.updatee = (bulkArray) => {
    return new Promise((resolve, reject) => {
        Score.updateMany(bulkArray)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}

 /** 
 *  @description remove all document  
 */
  exports.removeAllScore = () => {
    return new Promise((resolve, reject) => {
        Score.remove( )
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
/** 
 * @description getUserScoreByUserId 
 * @param userId 
 */
 exports.getUserScoreByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        Score.findOne({"userId": userId},{
            "totalPoints":1
        })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
