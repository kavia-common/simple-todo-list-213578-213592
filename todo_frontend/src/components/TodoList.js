import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';

// PUBLIC_INTERFACE
/**
 * TodoList component manages the entire todo application state and operations
 * Handles CRUD operations and localStorage persistence
 */
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // PUBLIC_INTERFACE
  /**
   * Add a new todo item
   * @param {string} text - The text content of the todo
   */
  const addTodo = (text) => {
    if (!text.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos([...todos, newTodo]);
  };

  // PUBLIC_INTERFACE
  /**
   * Delete a todo item
   * @param {number} id - The ID of the todo to delete
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // PUBLIC_INTERFACE
  /**
   * Toggle the completed status of a todo
   * @param {number} id - The ID of the todo to toggle
   */
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // PUBLIC_INTERFACE
  /**
   * Start editing a todo
   * @param {number} id - The ID of the todo to edit
   */
  const startEdit = (id) => {
    setEditingId(id);
  };

  // PUBLIC_INTERFACE
  /**
   * Update the text of a todo
   * @param {number} id - The ID of the todo to update
   * @param {string} newText - The new text content
   */
  const updateTodo = (id, newText) => {
    if (!newText.trim()) {
      deleteTodo(id);
      return;
    }
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
    setEditingId(null);
  };

  // PUBLIC_INTERFACE
  /**
   * Cancel editing
   */
  const cancelEdit = () => {
    setEditingId(null);
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list-container">
      <header className="todo-header">
        <h1 className="todo-title">📝 My Todo List</h1>
        <p className="todo-subtitle">Keep track of your tasks</p>
      </header>

      <TodoForm onAddTodo={addTodo} />

      <div className="todos-section">
        {activeTodos.length > 0 && (
          <div className="todos-group">
            <h2 className="todos-group-title">Active Tasks ({activeTodos.length})</h2>
            <div className="todos-list">
              {activeTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTodo}
                  onStartEdit={startEdit}
                  onUpdate={updateTodo}
                  onCancelEdit={cancelEdit}
                />
              ))}
            </div>
          </div>
        )}

        {completedTodos.length > 0 && (
          <div className="todos-group">
            <h2 className="todos-group-title">Completed Tasks ({completedTodos.length})</h2>
            <div className="todos-list">
              {completedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTodo}
                  onStartEdit={startEdit}
                  onUpdate={updateTodo}
                  onCancelEdit={cancelEdit}
                />
              ))}
            </div>
          </div>
        )}

        {todos.length === 0 && (
          <div className="empty-state">
            <p>No tasks yet! Add one above to get started.</p>
          </div>
        )}
      </div>

      <footer className="todo-footer">
        <p>Total: {todos.length} task{todos.length !== 1 ? 's' : ''} | 
           Active: {activeTodos.length} | 
           Completed: {completedTodos.length}</p>
      </footer>
    </div>
  );
}

export default TodoList;
