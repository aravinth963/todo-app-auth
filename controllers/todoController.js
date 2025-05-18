

const Todo = require('../models/todoModel');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createTodo = async (req, res) => {
  console.log('📥 Received todo:', req.body);
  try {
    const { title, description, dueDate, priority, category, status } = req.body;
    const todo = new Todo({
      user: req.userId,
      title,
      description,
      dueDate,
      priority,
      category,
      status
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });
    res.json({ msg: 'Todo deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
