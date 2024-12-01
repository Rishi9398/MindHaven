const Task = require('../models/tasksModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    const groupedTasks = {
      High: tasks.filter((task) => task.priority === 'High'),
      Medium: tasks.filter((task) => task.priority === 'Medium'),
      Low: tasks.filter((task) => task.priority === 'Low'),
    };
    res.status(200).json(groupedTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { taskName, priority, dueDate } = req.body;
    if (!taskName || !priority || !dueDate) {
      return res.status(400).json({ error: 'Task name, priority, and due date are required' });
    }

    const newTask = new Task({
      taskName,
      priority,
      dueDate,
    });

    const savedTask = await newTask.save();
    res.status(201).json({message: 'Task created successfully', task: savedTask});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await Task.findByIdAndDelete(id);
    res.status(204).json({ message: 'Task deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
};