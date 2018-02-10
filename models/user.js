 'use strict'

 const mongoose = require('mongoose')

 let Schema = mongoose.Schema;

 let userSchema = new Schema ({
   username: {
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
   fullName: {
     type: String,
     required: true
   },
   interest: {
     type: String
   },
   phone: {
     type: String
   }
 })

module.exports = mongoose.model('User', userSchema)
