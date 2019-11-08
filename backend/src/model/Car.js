const mongoose = require('mongoose')

/**
 * Data model for Car.
 */
const carSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    createIndex: true,
    required: true,
    auto: true
  },
  model: String,
  vendor: String,
  number: String,
  milage: Number,
  ownerId: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Car', carSchema)
