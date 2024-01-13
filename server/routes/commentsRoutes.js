const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

router.post('/comments', commentsController.comments)
router.post('/getComments', commentsController.getComments)
router.put('/setApprovedComments', commentsController.setApprovedComments)
router.post('/setRejectedComments', commentsController.setRejectedComments)
router.post('/getRecieversComments', commentsController.getRecieversComments)
router.post('/removeCommentFromMyComments', commentsController.removeCommentFromMyComments)
router.post('/removeCommentFromApprovedComments', commentsController.removeCommentFromApprovedComments)

module.exports = router