 'use strict'

 const mongoose = require('mongoose')

 let Schema = mongoose.Schema;

 let userSchema = new Schema ({
   idFb: {
     type: String
   },
   email: {
     type: String
   },
   name: {
     type: String
   },
   gender: {
     type: String
   },
   age: {
     type: Number
   },
   picture: {
     type: String
   },
   role: {
     type: String
   }
 })

module.exports = mongoose.model('User', userSchema)
