'use strict'
const User = require('../models/user');

module.exports = class ControllerUser {
  constructor() {

  }

  static getData(req, res) {
    User.find()
    .then(rowUser => {
      res.status(200).send({
        msg     : 'Got all Users data',
        rowUser
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        msg : 'Cannot Get all Users data',
        err
      })
    })
  }

  static getDataId(req, res) {
    User.findOne({ 'id' : req.params.id })
    .then(user => {
      res.status(200).send({
        msg   : 'Got your data',
        user
      })
    })
    .catch(err => {
      console.log(err)
      res.status(200).send({
        msg : 'Cannot get your data',
        err
      })
    })
  }

  static createUser(req, res) {
    User.create({
      username  : req.body.username,
      email     : req.body.email,
      password  : req.body.password,
      fullName  : req.body.fullName,
      interest  : req.body.interest,
      phone     : req.body.phone
    })
    .then(userCreate => {
      res.status(200).send({
        msg         : 'Register is Success! Enjoy',
        userCreate
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}
