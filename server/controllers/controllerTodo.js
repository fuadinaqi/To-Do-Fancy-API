'use strict'
const User = require('../models/user');
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

module.exports = class ControllerUser {
  constructor() {

  }

  static findAllTodo(req, res) {
    Todo.find({
      'userId' : req.headers.id
    })
    .then(todos => {
      res.status(200).send({
        msg : 'Got all your todos',
        todos
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'Cannot get all your todos',
        err
      })
    })
  }

  static findTodoById(req, res) {
    Todo.findOne({
      '_id' : req.params.id
    })
    .then(todo => {
      res.status(200).send({
        msg : 'Got your todo',
        todo
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'Cannot get your todo',
        err
      })
    })
  }

  static findAllComplete(req, res) {
    Todo.find({
      'userId' : req.headers.id,
      'status' : true
    })
    .then(todoCompletes => {
      res.status(200).send({
        msg : 'Got your complete todos',
        todoCompletes
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'Cannot Get your complete todos',
        err
      })
    })
  }

  static findAllUncomplete(req, res) {
    Todo.find({
      'userId' : req.headers.id,
      'status' : false
    })
    .then(todoUncompletes => {
      msg : 'Got your uncomplete todos',
      todoUncompletes
    })
    .catch(err => {
      msg : 'Cannot Get your uncomplete todos',
      err
    })
  }

  static createTodo(req, res) {
    jwt.verify(req.headers.token, 'FUADIGANTENG', (err, decoded) => {
      let objCreate = {
        name    : req.body.name,
        dueDate : req.body.dueDate,
        userId  : decoded.data._id
      }
      Todo.create(objCreate)
      .then(objCreate => {
        res.status(200).send({
          msg : 'Succes add your todo',
          objCreate
        })
      })
      .catch(err => {
        res.status(500).send({
          msg : 'Cannot add your todo',
          err
        })
      })
    })
  }

  static updateTodo(req, res) {
    Todo.findOneAndUpdate({
      '_id' : req.params.id
    }, {
      name : req.body.name
    })
    .then(updated => {
      res.status(200).send({
        msg : 'updated your todo',
        updated
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'cannot update your todo',
        err
      })
    })
  }

  static checkListTodo(req, res) {
    Todo.findOneAndUpdate({
      '_id' : req.params.id
    }, {
      status : req.body.status
    })
    .then(updatedCheck => {
      res.status(200).send({
        msg : 'updated your todo status',
        updatedCheck
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'cannot updated your todo status',
        err
      })
    })
  }

  static destroyTodo(req, res) {
    Todo.destroy({
      '_id' : req.params.id
    })
    .then(destroyed => {
      res.status(200).send({
        msg : 'Delete todo success',
        destroyed
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'Cannot delete todo',
        err
      })
    })
  }
}
