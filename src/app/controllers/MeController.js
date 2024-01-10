const { json } = require('express')
const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class MeController {
    // [GET] /
    mycourses(req, res, next) {
        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([course, deletedCount]) => {
                res.render('courses/mycourses', {
                    course: mutipleMongooseToObject(course),
                    deletedCount,
                })
            })
            .catch(next)

        // Course.countDocumentsDeleted().then((deletedCount) => {
        //     res.render('courses/mycourse', {
        //         deletedCount: deletedCount,
        //     })
        // })
        // Course.find({})
        //     .then((course) => {
        //         res.render('courses/mycourses', {
        //             course: mutipleMongooseToObject(course),
        //         })
        //     })
        //     .catch((error) => next(error))
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('courses/trashCourses', {
                    courses: mutipleMongooseToObject(courses),
                })
            })
            .catch((error) => next(error))
    }
}

module.exports = new MeController()
