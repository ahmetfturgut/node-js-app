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
*  @description get random  Course
*/
exports.getCourserRandomData = (random) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .limit(random)
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


 /** 
 *  @description remove all document  
 */
  exports.removeAllCourse = () => {
    return new Promise((resolve, reject) => {
        Course.remove( )
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}