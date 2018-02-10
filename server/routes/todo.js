const express = require('express');
const router = express.Router();
const controllerTodo = require('../controllers/controllerTodo')

router.get('/', controllerTodo.findAllTodo)
router.get('/completed', controllerTodo.findAllComplete)
router.get('/uncompleted', controllerTodo.findAllUncomplete)
router.post('/add', controllerTodo.createTodo)
router.get('/:id', controllerTodo.findTodoById)
router.put('/:id', controllerTodo.updateTodo)
router.delete('/:id', controllerTodo.destroyTodo)

module.exports = router
