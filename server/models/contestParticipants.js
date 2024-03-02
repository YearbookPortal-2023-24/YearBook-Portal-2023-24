const mongoose = require('mongoose')

const participantsSchema = new mongoose.Schema({
  postingDate: Date, // The time at which the contest becomes visible to users for applying.
  startDate: Date, // The time at which the contest begins and Registration ends.
  endDate: Date, // The time at which the contest ends and results are declared.
  removeDate: Date, // The time at which the contest gets removed.

  contestants: [
    {
      participant_id: String, // The User ID of the person participating.
    }
  ]
})

module.exports = mongoose.model('contestParticipants', participantsSchema)