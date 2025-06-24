const TaskService = require('../services/TaskService');

class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  createTask(req, res) {
    try {
      const task = this.taskService.createTask(req.body);
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  getAllTasks(req, res) {
    try {
      const tasks = this.taskService.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  getTask(req, res) {
    try {
      const task = this.taskService.getTaskById(req.params.id);
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  updateTask(req, res) {
    try {
      const task = this.taskService.updateTask(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task
      });
    } catch (error) {
      const statusCode = error.message === 'Task not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  deleteTask(req, res) {
    try {
      const task = this.taskService.deleteTask(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: task
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = TaskController;