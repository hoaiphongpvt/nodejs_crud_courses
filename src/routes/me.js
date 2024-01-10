const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.get('/mycourses', meController.mycourses)
router.get('/trash', meController.trashCourses)

module.exports = router
