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

  test('Debe actualizar correctamente los campos de una tarea', () => {
    const createdTask = taskService.createTask({ title: 'Original Title', description: 'Original Description', priority: 'medium'});

    const updates = {
      title: 'Título Actualizado',
      description: 'Descripción Actualizada',
      priority: 'high',
      status: 'in-progress',
      dueDate: Date.now() + 86400000 // Mañana
    };

    const updatedTask = taskService.updateTask(createdTask.id, updates);

    expect(updatedTask.title).toBe(updates.title);
    expect(updatedTask.description).toBe(updates.description);
    expect(updatedTask.priority).toBe(updates.priority);
    expect(updatedTask.status).toBe(updates.status);
    expect(new Date(updatedTask.dueDate).getTime()).toBeCloseTo(new Date(updates.dueDate).getTime(), -1);
    expect(new Date(updatedTask.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(createdTask.createdAt).getTime());
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

  test('Debe implementar lógica de obtención de tareas por estado', () => {
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

    // Actualizar el estado de una tarea
    task1.updateStatus('completed');
    task2.updateStatus('in-progress');

    // Obtener tareas por estado
    const completedTasks = taskService.getTasksByStatus('completed');
    expect(completedTasks).toHaveLength(1);
    expect(completedTasks).toContain(task1);
  });

  test('Debe implementar lógica de obtención de tareas vencidas', () => {
    const task1 = taskService.createTask({
      title: 'Tarea 1',
      description: 'Descripción de la primera tarea',
      priority: 'low',
      dueDate: '2030-01-01' // Fecha Futura
    });

    task1.updateDueDate('2020-01-01'); // Actualizar a una fecha pasada

    // Obtener tareas vencidas
    const overdueTasks = taskService.getOverdueTasks();
    expect(overdueTasks).toHaveLength(1);
    expect(overdueTasks).toContain(task1);
  });

  test('Debe lanzar error si se proporciona una fecha de vencimiento inválida o pasada', () => {
    const pastDate = '2000-01-01'; // Fecha pasada

    expect(() => {
      taskService.createTask({
        title: 'Tarea con fecha inválida',
        description: 'Esto no debería funcionar',
        priority: 'medium',
        dueDate: pastDate
      });
    }).toThrow('Due date must be a valid future date');
  });
});