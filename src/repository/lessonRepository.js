var Lesson = require('../model/lesson').Lesson;



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

/** 
*  @description remove all document  
*/
exports.removeAllLesson = () => {
    return new Promise((resolve, reject) => {
        Lesson.remove()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}


/** 
*  @description get random Lesson
*/
exports.getRandomLessonsId = (random) => {
    return new Promise((resolve, reject) => {
        Lesson.find({}, {
            "_id": 1
        })
            .limit(random)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
