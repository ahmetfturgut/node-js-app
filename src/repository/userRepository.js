const User = require('../model/user').User;

 
 

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

 
 /** 
 *  @description get all userId  
 */
  exports.getAllUsersId = () => {
    return new Promise((resolve, reject) => {
        User.find({},{
            "_id":1
        })
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
  exports.removeAllUser = () => {
    return new Promise((resolve, reject) => {
        User.remove()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}


