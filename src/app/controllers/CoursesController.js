const { json } = require('express')
const Course = require('../models/Course')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongooes')

class CoursesController {
    // [GET] /
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                })
            })

            .catch(next)
    }

    showAll(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('home', {
                    course: mutipleMongooseToObject(course),
                })
            })
            .catch((error) => next(error))
    }

    create(req, res, next) {
        res.render('courses/create')
    }

    edit(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/update', {
                    course: mongooseToObject(course),
                })
            })

            .catch(next)
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.body._id }, req.body)
            .then(() => {
                res.redirect('/me/mycourses')
            })
            .catch(next)
    }

    delete(req, res, next) {
        Course.delete({ _id: req.body.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    destroy(req, res, next) {
        Course.deleteOne({ _id: req.body.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    restore(req, res, next) {
        Course.restore({ _id: req.body.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    store(req, res, next) {
        const course = new Course({
            name: req.body.name,
            desc: req.body.desc,
            thumbnail: res.locals._upload.urlthumbnail,
        })
        course
            .save()
            .then(() => {
                res.render('courses/addSuccess')
                res.redirect('/')
            })
            .catch((err) => {})
    }

    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIDs } })
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                break
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIDs } })
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                break
            default:
                res.json({ status: 'Action not allowed' })
        }
    }
}

module.exports = new CoursesController()
