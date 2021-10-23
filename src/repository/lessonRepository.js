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
*  @description get limit Lesson
*/
exports.getRandomLessons = (randumNumber) => {
    return new Promise((resolve, reject) => {
        Lesson.aggregate([  {
                $sample: { size: randumNumber }
            }
        ])
            .then(result => {

                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })

}
