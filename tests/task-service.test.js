const TaskService = require('../src/services/TaskService');

describe('Task Service - Pruebas de Facu', () => {
  let taskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  test('Debe implementar lógica de negocio para creación de tareas', () => {
    const taskData = {
      title: 'Tarea de prueba',
      description: 'Esta es una descripción de prueba para la tarea',
      priority: 'medium'
    };

    const task = taskService.createTask(taskData);

    expect(task).toBeDefined();
    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
    expect(task.priority).toBe(taskData.priority);
    expect(taskService.getAllTasks()).toHaveLength(1);
  });

  test('Debe implementar lógica de búsqueda de tareas', () => {
    // Crear varias tareas
    const task1 = taskService.createTask({
      title: 'Tarea 1',
      description: 'Descripción de la primera tarea',
      priority: 'low'
    });

    const task2 = taskService.createTask({
      title: 'Tarea 2',
      description: 'Descripción de la segunda tarea',
      priority: 'high'
    });

    // Buscar por ID
    const foundTask = taskService.getTaskById(task1.id);
    expect(foundTask).toEqual(task1);

    // Buscar todas las tareas
    const allTasks = taskService.getAllTasks();
    expect(allTasks).toHaveLength(2);
    expect(allTasks).toContain(task1);
    expect(allTasks).toContain(task2);
  });

  test('Debe implementar lógica de validación en el servicio', () => {
    const invalidTaskData = {
      title: 'AB', // Muy corto
      description: 'Corta', // Muy corta
      priority: 'invalid-priority'
    };

    expect(() => {
      taskService.createTask(invalidTaskData);
    }).toThrow('Validation failed');

    // Verificar que no se creó la tarea inválida
    expect(taskService.getAllTasks()).toHaveLength(0);
  });
});