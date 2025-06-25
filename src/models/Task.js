class Task {
  constructor(title, description, priority = 'medium', dueDate = null) {
    this.id = require('uuid').v4();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = 'pending';
    this.createdAt = new Date();
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.updatedAt = new Date();
  }

  updateStatus(newStatus) {
    const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Invalid status');
    }
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  updatePriority(newPriority) {
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (!validPriorities.includes(newPriority)) {
      throw new Error('Invalid priority');
    }
    this.priority = newPriority;
    this.updatedAt = new Date();
  }

  updateDueDate(newDueDate) {
    this.dueDate = new Date(newDueDate);
  }

  isOverdue() {
    if (!this.dueDate) return false;
    return new Date() > this.dueDate && this.status !== 'completed';
  }
}

module.exports = Task;