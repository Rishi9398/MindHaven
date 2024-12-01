const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  dueDate: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now },
});

const tasksModel = mongoose.model('Task', taskSchema);

module.exports = tasksModel;
