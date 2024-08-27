const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
exports.getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    
    const todos = await Todo.find()
      // .skip((parsedPage - 1) * parsedLimit)
      // .limit(parsedLimit);
    
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single todo by ID
// @route   GET /api/todos/:id
// @access  Public
exports.getTodo = async (req, res) => {
  try {
   
    console.log(req.params);
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
exports.createTodo = async (req, res) => {
  try {
    console.log("request got")
    console.log(req.body)
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      date: new Date(),
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
