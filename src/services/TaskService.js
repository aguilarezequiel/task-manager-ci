const Task = require('../models/Task');
const { validateTaskData } = require('../utils/validators');

class TaskService {
  constructor() {
    this.tasks = [];
  }

  createTask(taskData) {
    const validation = validateTaskData(taskData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const task = new Task(
      taskData.title,
      taskData.description,
      taskData.priority,
      taskData.dueDate
    );
    this.tasks.push(task);
    return task;
  }

  getAllTasks() {
    return [...this.tasks];
  }

  getTaskById(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  updateTask(id, updates) {
    const task = this.getTaskById(id);
    
    if (updates.title) task.title = updates.title;
    if (updates.description) task.description = updates.description;
    if (updates.priority) task.updatePriority(updates.priority);
    if (updates.status) task.updateStatus(updates.status);
    if (updates.dueDate) task.dueDate = new Date(updates.dueDate);
    
    task.updatedAt = new Date();
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    return this.tasks.splice(index, 1)[0];
  }

  getTasksByStatus(status) {
    return this.tasks.filter(task => task.status === status);
  }

  getOverdueTasks() {
    return this.tasks.filter(task => task.isOverdue());
  }
}

module.exports = TaskService;