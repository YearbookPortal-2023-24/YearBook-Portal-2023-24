const mongoose = require('mongoose')

const voterSchema = new mongoose.Schema({
  contest_id: String,  // Foreign Key referencing ObjectID of Contest.
  running: Int32,  // 0 for Not Started, 1 for Running and 2 for Ended.

  voters: [
    {
      voter_id: String, // Your ID in the Users Collection.
      voted: String, // The User ID of the person you voted.
    }
  ],
})

module.exports = mongoose.model('contestVoters', voterSchema)