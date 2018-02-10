const express = require('express');
const router = express.Router();
const controllerTodo = require('../controllers/controllerTodo')

router.post('/add', controllerTodo.createTodo)

module.exports = router;
