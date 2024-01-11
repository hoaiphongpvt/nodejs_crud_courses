const express = require('express')
const router = express.Router()

const coursesController = require('../app/controllers/CoursesController')

router.get('/create', coursesController.create)
router.get('/edit/:slug', coursesController.edit)
router.put('/update/:slug', coursesController.update)
router.post('/handle-form-actions', coursesController.handleFormAction)
router.delete('/delete', coursesController.delete)
router.delete('/destroy', coursesController.destroy)
router.patch('/restore', coursesController.restore)
router.post('/store', coursesController.store)
router.get('/:slug', coursesController.show)
router.get('/', coursesController.showAll)

module.exports = router
