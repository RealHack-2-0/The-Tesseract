const mongoose = require('mongoose')

/**
 * Data model for User.
 */
const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    createIndex: true,
    required: true,
    auto: true
  },
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  isAdmin: Boolean
})

module.exports = mongoose.model('User', userSchema)
