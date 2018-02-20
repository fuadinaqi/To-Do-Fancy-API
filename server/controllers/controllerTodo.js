'use strict'
const User = require('../models/user');
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const dateFormat = require('dateformat');

module.exports = class ControllerUser {
  constructor() {

  }

  static findAllTodo(req, res) {
    // console.log(req.headers.decoded.data._id, 'bisa diatur');
    Todo.find({
      'userId' : req.headers.decoded.data._id
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

  static findTodoByName(req, res) {
    Todo.findOne({ name : new RegExp('^'+ req.query.todo_name +'$', "i")}, function(err, todo) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send({
          msg : 'Got your todo',
          todo
        })
      }
    });
    // Todo.findOne({
    //   'name' : req.query.todo_name
    // })
    // .then(todo => {
    //   res.status(200).send({
    //     msg : 'Got your todo',
    //     todo
    //   })
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     msg : 'Cannot get your todo',
    //     err
    //   })
    // })
  }

  static findAllComplete(req, res) {
    Todo.find({
      'userId' : req.headers.decoded.data._id,
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
    // console.log(req.headers);
    Todo.find({
      'userId' : req.headers.decoded.data._id,
      'status' : false
    })
    .then(todoUncompletes => res.status(200).send({
      msg : 'Got your uncomplete todos',
      todoUncompletes
    }))
    .catch(err => res.status(500).send({
      msg : 'Cannot Get your uncomplete todos',
      err
    }))
  }

  static createTodo(req, res) {
    // console.log(req.headers.decoded.data._id);
    let objCreate = {
      name    : req.body.name,
      dueDate : dateFormat(req.body.dueDate, "dddd, mmmm dS, yyyy"),
      userId  : req.headers.decoded.data._id
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
  }

  static updateTodo(req, res) {
    Todo.findOneAndUpdate({
      '_id' : req.params.id
    }, {
      name : req.body.name,
      dueDate : dateFormat(req.body.dueDate, "dddd, mmmm dS, yyyy")
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
