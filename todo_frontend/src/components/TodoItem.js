import React, { useState, useEffect, useRef } from 'react';
import './TodoItem.css';

// PUBLIC_INTERFACE
/**
 * TodoItem component represents a single todo item
 * Supports inline editing, completion toggle, and deletion
 * @param {Object} todo - The todo object
 * @param {boolean} isEditing - Whether this item is being edited
 * @param {Function} onToggleComplete - Handler for toggling completion
 * @param {Function} onDelete - Handler for deletion
 * @param {Function} onStartEdit - Handler for starting edit
 * @param {Function} onUpdate - Handler for updating text
 * @param {Function} onCancelEdit - Handler for canceling edit
 */
function TodoItem({ 
  todo, 
  isEditing, 
  onToggleComplete, 
  onDelete, 
  onStartEdit, 
  onUpdate, 
  onCancelEdit 
}) {
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Reset edit text if editing is cancelled
  useEffect(() => {
    if (!isEditing) {
      setEditText(todo.text);
    }
  }, [isEditing, todo.text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(todo.id, editText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <form onSubmit={handleSubmit} className="todo-edit-form">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="todo-edit-input"
            placeholder="Edit task..."
          />
          <div className="todo-edit-actions">
            <button type="submit" className="btn btn-save" title="Save">
              ✓
            </button>
            <button 
              type="button" 
              onClick={onCancelEdit} 
              className="btn btn-cancel"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="todo-checkbox-wrapper">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            className="todo-checkbox"
          />
          <span className="checkbox-custom"></span>
        </label>
        <span className="todo-text" onClick={() => onToggleComplete(todo.id)}>
          {todo.text}
        </span>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onStartEdit(todo.id)}
          className="btn btn-edit"
          title="Edit"
          disabled={todo.completed}
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-delete"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
