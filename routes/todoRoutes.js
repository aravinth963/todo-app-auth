const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const todoController = require('../controllers/todoController');

// All routes require authentication
router.use(auth);

// CRUD routes
router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

