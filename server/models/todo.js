'use strict'
const mongoose = require('mongoose')
const dateFormat = require('dateformat');

let Schema = mongoose.Schema;

let todoSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: dateFormat(new Date(), "dddd, mmmm dS, yyyy")
  },
  dueDate: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Todo', todoSchema)
