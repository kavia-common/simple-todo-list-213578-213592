import React, { useState } from 'react';
import './TodoForm.css';

// PUBLIC_INTERFACE
/**
 * TodoForm component for adding new todo items
 * @param {Function} onAddTodo - Handler for adding a new todo
 */
function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
        maxLength={200}
      />
      <button type="submit" className="btn btn-add" disabled={!inputValue.trim()}>
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
