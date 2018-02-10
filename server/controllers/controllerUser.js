'use strict'
var jwt = require('jsonwebtoken');

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
    User.findOne({ '_id' : req.params.id })
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
        let role
        req.body.email == 'neqhzcruz@gmail.com' ? role = 'admin' : role = 'user'
        User.create({
          id        : req.body.id,
          email     : req.body.email,
          name      : req.body.name,
          gender    : req.body.gender,
          age       : req.body.age,
          picture   : req.body.picture,
          role      : role
        })
        .then(userCreate => {
          let payload = userCreate
          jwt.sign({data: payload}, 'FUADIGANTENG', (err, token) => {
            if (!err && token) {
              console.log(token);
              res.status(200).send({
                msg         : 'Login is success',
                token
              })
            } else {
              console.log(err);
            }
          })
        })
        .catch(err => {
          res.status(500).send({
            msg   : 'Cannot get register user',
            err
          })
        })
      } else {
        console.log('holaaa');
        jwt.sign({data: result}, 'FUADIGANTENG', (err, token) => {
          if (err) {
            console.log(err)
          } else {
            res.status(200).send({
              msg   : 'Login is success',
              token
            })
          }
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
