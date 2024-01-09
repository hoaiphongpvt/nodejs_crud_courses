const { json } = require('express')
const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class MeController {
    // [GET] /
    mycourses(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('courses/mycourses', {
                    course: mutipleMongooseToObject(course),
                })
            })
            .catch((error) => next(error))
    }
}

module.exports = new MeController()
