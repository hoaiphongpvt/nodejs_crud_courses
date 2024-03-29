const { json } = require('express')
const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('home', {
                    course: mutipleMongooseToObject(course),
                })
            })
            .catch((error) => next(error))
    }

    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()
