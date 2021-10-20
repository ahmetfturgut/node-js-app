const Course = require('../model/course').Course;
 
 /** 
 *  @description get all course count  
 */
  exports.getCourseDataCount = () => {
    return new Promise((resolve, reject) => {
        Course.count()
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
 exports.courseBulkOperation = (bulkArray) => {
    return new Promise((resolve, reject) => {
        Course.bulkWrite(bulkArray)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
