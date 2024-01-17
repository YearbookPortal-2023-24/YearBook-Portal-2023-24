const mongoose = require('mongoose')

const rejectedCommentsSchema = new mongoose.Schema({
  id: String,
  name: String,
  roll_no: Number,
  email_id: String,
  academic_program: String,
  comment: String,
  status: String,
})

module.exports = mongoose.model('rejectedcomments', rejectedCommentsSchema)