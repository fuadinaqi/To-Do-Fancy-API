'use strict'
const User = require('../models/user');
const Todo = require('../models/todo');

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
    let objCreate = {
      name    : req.body.name,
      dueDate : req.body.dueDate,
      userId  : req.headers.id
    }
    Todo.create(objCreate)
    .then(objCreate => {
      res.status(200).send(objCreate)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static updateTodo(req, res) {
    Todo.update({
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
