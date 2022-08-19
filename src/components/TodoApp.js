import React from 'react';
import './styles/TodoApp.css';
import TodoList from './co-components/TodoList';

function TodoApp() {
  return (
    <div className='todo-body' style={{ border: "0.1px solid #161a2b" }}>
      <div className='todo-app'>
        <TodoList />
      </div>
    </div>
  );
}

export default TodoApp;
