const express = require('express');
const TaskController = require('./controllers/TaskController');

const app = express();
const controller = new TaskController();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API - TP4 Integración Continua',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'POST /tasks': 'Create new task',
      'GET /tasks/:id': 'Get task by ID',
      'PUT /tasks/:id': 'Update task',
      'DELETE /tasks/:id': 'Delete task'
    }
  });
});

app.post('/tasks', (req, res) => controller.createTask(req, res));
app.get('/tasks', (req, res) => controller.getAllTasks(req, res));
app.get('/tasks/:id', (req, res) => controller.getTask(req, res));
app.put('/tasks/:id', (req, res) => controller.updateTask(req, res));
app.delete('/tasks/:id', (req, res) => controller.deleteTask(req, res));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API available at http://localhost:${PORT}`);
  });
}

module.exports = app;