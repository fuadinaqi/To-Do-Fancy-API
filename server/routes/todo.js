const express = require('express');
const router = express.Router();
const controllerTodo = require('../controllers/controllerTodo')

router.get('/', controllerTodo.findAllTodo)
router.get('/:id', controllerTodo.findTodoById)
router.get('/completed', controllerTodo.findAllComplete)
router.get('/uncompleted', controllerTodo.findAllUncomplete)
router.post('/add', controllerTodo.createTodo)
router.put('/:id/update', controllerTodo.updateTodo)
router.delete('/:id/delete', controllerTodo.destroyTodo)

module.exports = router;
