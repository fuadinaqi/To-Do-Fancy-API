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
    User.findOne({ 'email' : req.body.email })
    .then(user => {
      res.status(200).send({
        msg   : 'Got the data',
        user
      })
    })
    .catch(err => {
      console.log(err)
      res.status(200).send({
        msg : 'Cannot get the data',
        err
      })
    })
  }

  static login(req, res) {
    User.findOne({ 'email' : req.body.email })
    .then(result => {
      if (!result) {
        User.create({
          email     : req.body.email,
          name      : req.body.name,
          gender    : req.body.gender,
          age       : req.body.age,
          picture   : req.body.picture,
          role      : 'user'
        })
        .then(userCreate => {
          res.status(200).send({
            msg         : 'Login is success',
            userCreate
          })
        })
        .catch(err => {
          res.status(500).send({
            msg   : 'Cannot get register user',
            err
          })
        })
      } else {
        res.status(200).send({
          msg   : 'Login is success'
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        msg   : 'Cannot get Login',
        err
      })
    })
  }
}
