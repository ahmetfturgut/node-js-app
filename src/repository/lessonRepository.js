var Lesson = require('../model/lesson').Lesson;

 /** 
 *  @description get all lesson  
 */
exports.getLessonDataCount = () => {
    return new Promise((resolve, reject) => {
        Lesson.count()
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
exports.lessonBulkOperation = (bulkArray) => {
    return new Promise((resolve, reject) => {
        Lesson.bulkWrite(bulkArray)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
