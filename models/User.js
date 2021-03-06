const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userKey: {
    type: String,
    default: 'userKey'
  },
  role: {
    type: String,
    default: 'user' // user, admin
  },
  wallet: {
    type: String,
    default: 'address'
  },
  nifones: [{ type: Schema.Types.ObjectId, ref: 'Fone' }],
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User
