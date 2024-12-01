const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');

router.get('/getTasks', taskController.getAllTasks);
router.post('/createTasks', taskController.createTask);
router.delete('/deleteTask/:id', taskController.deleteTask);

module.exports = router;
