function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateDate(dateString) {
  if (!dateString) return true; // Optional field
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date > new Date();
}

function validateRequiredText(text, fieldName, minLength = 1) {
  if (!text || typeof text !== 'string') {
    return { isValid: false, error: `${fieldName} is required and must be a string` };
  }
  if (text.trim().length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  return { isValid: true };
}

function validateTaskData(taskData) {
  const errors = [];

  // Validate title
  const titleValidation = validateRequiredText(taskData.title, 'Title', 3);
  if (!titleValidation.isValid) {
    errors.push(titleValidation.error);
  }

  // Validate description
  const descValidation = validateRequiredText(taskData.description, 'Description', 10);
  if (!descValidation.isValid) {
    errors.push(descValidation.error);
  }

  // Validate priority
  if (taskData.priority) {
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (!validPriorities.includes(taskData.priority)) {
      errors.push('Priority must be one of: low, medium, high, urgent');
    }
  }

  // Validate due date
  if (taskData.dueDate && !validateDate(taskData.dueDate)) {
    errors.push('Due date must be a valid future date');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateEmail,
  validateDate,
  validateRequiredText,
  validateTaskData
};