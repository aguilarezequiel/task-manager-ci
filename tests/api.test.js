const request = require('supertest');
const express = require('express');
const TaskController = require('../src/controllers/TaskController');

// Configurar app de prueba
const createTestApp = () => {
  const app = express();
  const controller = new TaskController();
  
  app.use(express.json());
  
  app.post('/tasks', (req, res) => controller.createTask(req, res));
  app.get('/tasks', (req, res) => controller.getAllTasks(req, res));
  app.get('/tasks/:id', (req, res) => controller.getTask(req, res));
  app.put('/tasks/:id', (req, res) => controller.updateTask(req, res));
  app.delete('/tasks/:id', (req, res) => controller.deleteTask(req, res));
  
  return app;
};

describe('API Tests - Pruebas de Pachi', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  test('Debe verificar que endpoints REST funcionan correctamente', async () => {
    const taskData = {
      title: 'API Test Task',
      description: 'Tarea para probar la API REST'
    };

    // POST - Crear tarea
    const createResponse = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(201);

    expect(createResponse.body.success).toBe(true);
    expect(createResponse.body.data.title).toBe(taskData.title);

    // GET - Obtener todas las tareas
    const getAllResponse = await request(app)
      .get('/tasks')
      .expect(200);

    expect(getAllResponse.body.success).toBe(true);
    expect(getAllResponse.body.count).toBe(1);

    // GET - Obtener tarea específica
    const taskId = createResponse.body.data.id;
    const getOneResponse = await request(app)
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(getOneResponse.body.data.id).toBe(taskId);
  });

  test('Debe retornar códigos de respuesta HTTP correctos', async () => {
    // 201 - Created
    await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description'
      })
      .expect(201);

    // 400 - Bad Request (datos inválidos)
    await request(app)
      .post('/tasks')
      .send({
        title: 'A', // Muy corto
        description: 'B' // Muy corto
      })
      .expect(400);

    // 404 - Not Found
    await request(app)
      .get('/tasks/id-inexistente')
      .expect(404);

    // 200 - OK
    await request(app)
      .get('/tasks')
      .expect(200);
  });

  test('Debe retornar formato JSON correcto en respuestas', async () => {
    // Crear tarea
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'JSON Format Test',
        description: 'Verificar formato de respuesta JSON'
      })
      .expect(201);

    // Verificar estructura de respuesta exitosa
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('description');
    expect(response.body.data).toHaveProperty('status');
    expect(response.body.data).toHaveProperty('createdAt');

    // Verificar respuesta de error
    const errorResponse = await request(app)
      .get('/tasks/invalid-id')
      .expect(404);

    expect(errorResponse.body).toHaveProperty('success', false);
    expect(errorResponse.body).toHaveProperty('message');
  });
});