const express = require('express');
const router = express.Router();
const controllerTodo = require('../controllers/controllerTodo')
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, controllerTodo.findAllTodo)
router.get('/completed', authenticateToken, controllerTodo.findAllComplete)
router.get('/uncompleted', authenticateToken, controllerTodo.findAllUncomplete)
router.post('/add', authenticateToken, controllerTodo.createTodo)
router.get('/?todo_name', controllerTodo.findTodoByName)
router.put('/:id', controllerTodo.updateTodo)
router.delete('/:id', controllerTodo.destroyTodo)
router.put('/:id/checklist', controllerTodo.checkListTodo)

module.exports = router
