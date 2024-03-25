const express = require('express')
const router = express.Router()
const yearbookDataController = require('../controllers/yearbookDataController')

router.get('/getYearbookData', yearbookDataController.getYearbookData)

module.exports = router