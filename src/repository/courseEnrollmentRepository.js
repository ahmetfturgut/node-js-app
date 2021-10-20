const CourseEnrollment = require('../model/courseEnrollment').CourseEnrollment;
 

/** 
 *  @description Bulk Operation: Write bulkArray in DB 
 * @param bulkArray {array} 
 */
 exports.curseEnrollmentBulkOperation = (bulkArray) => {
    return new Promise((resolve, reject) => {
        CourseEnrollment.bulkWrite(bulkArray)
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
  exports.removeAllCourseEnrollment = () => {
    return new Promise((resolve, reject) => {
        CourseEnrollment.remove( )
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}


