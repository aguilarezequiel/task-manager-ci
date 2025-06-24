const TaskController = require('../src/controllers/TaskController');

describe('Task Controller - Pruebas de Matías', () => {
  let controller;
  let req, res;

  beforeEach(() => {
    controller = new TaskController();
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('Debe crear una tarea via controlador exitosamente', () => {
    req.body = {
      title: 'Nueva tarea',
      description: 'Descripción de la nueva tarea',
      priority: 'high'
    };

    controller.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Task created successfully',
        data: expect.any(Object)
      })
    );
  });

  test('Debe actualizar una tarea via controlador', () => {
    // Primero crear una tarea
    req.body = {
      title: 'Tarea para actualizar',
      description: 'Descripción inicial de la tarea'
    };
    controller.createTask(req, res);

    // Obtener el ID de la tarea creada
    const createdTask = res.json.mock.calls[0][0].data;
    
    // Resetear mocks
    res.status.mockClear();
    res.json.mockClear();

    // Actualizar la tarea
    req.params.id = createdTask.id;
    req.body = { title: 'Tarea actualizada' };

    controller.updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Task updated successfully'
      })
    );
  });

  test('Debe eliminar una tarea via controlador', () => {
    // Crear tarea
    req.body = {
      title: 'Tarea para eliminar',
      description: 'Esta tarea será eliminada'
    };
    controller.createTask(req, res);

    const createdTask = res.json.mock.calls[0][0].data;
    
    // Reset mocks
    res.status.mockClear();
    res.json.mockClear();

    // Eliminar tarea
    req.params.id = createdTask.id;
    controller.deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Task deleted successfully'
      })
    );
  });
});