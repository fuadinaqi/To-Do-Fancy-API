'use strict'

const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let todoSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)
