const { validateEmail, validateDate, validateRequiredText } = require('../src/utils/validators');

describe('Validators - Pruebas de Cocha', () => {
  test('Debe validar formato de email correctamente', () => {
    // Emails válidos
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('valid_email@test.org')).toBe(true);

    // Emails inválidos
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test.example.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });

  test('Debe validar fechas correctamente', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    // Fechas válidas (futuras)
    expect(validateDate(futureDate.toISOString())).toBe(true);
    expect(validateDate(null)).toBe(true); // Campo opcional
    expect(validateDate(undefined)).toBe(true); // Campo opcional

    // Fechas inválidas
    expect(validateDate(pastDate.toISOString())).toBe(false);
    expect(validateDate('invalid-date')).toBe(false);
    expect(validateDate('2023-13-40')).toBe(false); // Fecha imposible
  });

  test('Debe validar texto requerido correctamente', () => {
    // Textos válidos
    expect(validateRequiredText('Texto válido', 'Campo')).toEqual({
      isValid: true
    });
    expect(validateRequiredText('ABC', 'Campo', 3)).toEqual({
      isValid: true
    });

    // Textos inválidos
    expect(validateRequiredText('', 'Campo')).toEqual({
      isValid: false,
      error: 'Campo is required and must be a string'
    });
    expect(validateRequiredText(null, 'Campo')).toEqual({
      isValid: false,
      error: 'Campo is required and must be a string'
    });
    expect(validateRequiredText(123, 'Campo')).toEqual({
      isValid: false,
      error: 'Campo is required and must be a string'
    });
    expect(validateRequiredText('AB', 'Campo', 5)).toEqual({
      isValid: false,
      error: 'Campo must be at least 5 characters'
    });
  });
});