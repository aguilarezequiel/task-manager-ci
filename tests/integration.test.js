const TaskService = require('../src/services/TaskService');
const TaskController = require('../src/controllers/TaskController');

describe('Integration Tests - Pruebas de Nico', () => {
  let taskService;
  let controller;

  beforeEach(() => {
    taskService = new TaskService();
    controller = new TaskController();
  });

  test('Debe manejar integración API completa end-to-end', async () => {
    const taskData = {
      title: 'Integración completa',
      description: 'Prueba de integración desde controlador hasta modelo',
      priority: 'high'
    };

    // Simular request/response
    const req = { body: taskData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Ejecutar flujo completo
    controller.createTask(req, res);

    // Verificar respuesta
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Task created successfully',
        data: expect.objectContaining({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority
        })
      })
    );
  });

  test('Debe manejar flujo completo de creación-edición-eliminación', () => {
    const initialData = {
      title: 'Tarea inicial',
      description: 'Descripción inicial de la tarea de prueba'
    };

    // Crear tarea
    const task = taskService.createTask(initialData);
    expect(taskService.getAllTasks()).toHaveLength(1);

    // Editar tarea
    const updatedTask = taskService.updateTask(task.id, {
      title: 'Tarea editada',
      status: 'in-progress'
    });
    expect(updatedTask.title).toBe('Tarea editada');
    expect(updatedTask.status).toBe('in-progress');

    // Eliminar tarea
    const deletedTask = taskService.deleteTask(task.id);
    expect(deletedTask.id).toBe(task.id);
    expect(taskService.getAllTasks()).toHaveLength(0);
  });

  test('Debe manejar errores end-to-end correctamente', () => {
    // Test de error en creación
    expect(() => {
      taskService.createTask({
        title: '', // Título inválido
        description: 'Desc'
      });
    }).toThrow('Validation failed');

    // Test de error en búsqueda
    expect(() => {
      taskService.getTaskById('id-inexistente');
    }).toThrow('Task not found');

    // Test de error en actualización
    expect(() => {
      taskService.updateTask('id-inexistente', { title: 'Nuevo título' });
    }).toThrow('Task not found');

    // Test de error en eliminación
    expect(() => {
      taskService.deleteTask('id-inexistente');
    }).toThrow('Task not found');
  });
});
