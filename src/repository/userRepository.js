const User = require('../model/user').User;

 
 /** 
 *  @description get all user count  
 */
  exports.getUserDataCount = () => {
    return new Promise((resolve, reject) => {
        User.count()
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
 exports.userBulkOperation = (bulkArray) => {
    return new Promise((resolve, reject) => {
        User.bulkWrite(bulkArray)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
