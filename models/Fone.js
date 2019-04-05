const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Status = Object.freeze({
  PENDING: 'pending',
  INSPECTING: 'inspecting',
  REJECTED: 'rejected',
  ACCEPTED: 'accepted'
})

// Create Schema
const FoneSchema = new Schema({
  name: {
    type: String,
    default: 'nifone'
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.PENDING
  },
  money: {
    deposit: {
      type: Number,
      default: 0
    },
    paid: {
      type: Number,
      default: 0
    }
  },
  userKey: {
    type: String,
    default: 'userKey'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Fone = mongoose.model('fone', FoneSchema)
module.exports = Fone
