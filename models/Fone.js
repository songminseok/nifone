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
  foneId: { type: Number, default: 0 },
  image: { type: String, default: '' },
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
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: {
    type: Date,
    default: Date.now
  }
})

const Fone = mongoose.model('Fone', FoneSchema)
module.exports = Fone
