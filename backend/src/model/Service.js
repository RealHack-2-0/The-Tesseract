const mongoose = require('mongoose')

/**
 * Data model for Service.
 */
const serviceSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    createIndex: true,
    required: true,
    auto: true
  },
  name: String,
  description: String,
  price: Number
})

// ???
module.exports = mongoose.model('Service', serviceSchema)