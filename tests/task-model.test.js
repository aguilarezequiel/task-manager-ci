const Task = require('../src/models/Task');

describe('Task Model - Pruebas de Ezequiel', () => {
  test('Debe crear una tarea con propiedades válidas', () => {
    const task = new Task('Completar TP', 'Terminar el trabajo práctico de CI', 'high');
    
    expect(task.title).toBe('Completar TP');
    expect(task.description).toBe('Terminar el trabajo práctico de CI');
    expect(task.priority).toBe('high');
    expect(task.status).toBe('pending');
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  test('Debe validar las propiedades de la tarea correctamente', () => {
    const task = new Task('Test Task', 'Description', 'medium');
    
    expect(typeof task.id).toBe('string');
    expect(task.id.length).toBeGreaterThan(0);
    expect(task.updatedAt).toBeInstanceOf(Date);
    expect(task.status).toBe('pending');
  });

  test('Debe actualizar el estado de la tarea correctamente', () => {
    const task = new Task('Test', 'Test description', 'low');
    
    task.updateStatus('in-progress');
    expect(task.status).toBe('in-progress');
    
    task.updateStatus('completed');
    expect(task.status).toBe('completed');
    
    expect(() => task.updateStatus('invalid-status')).toThrow('Invalid status');
  });
});