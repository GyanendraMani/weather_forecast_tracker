import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  let getTodosItem = localStorage.getItem("todos");
  let todosItem = JSON.parse(getTodosItem)

  const [todos, setTodos] = useState(todosItem);

  console.log("printing ", todos)
  if (todos.length != 0) {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    localStorage.setItem("todos", JSON.stringify(newTodos))
    let item = localStorage.getItem("todos");
    setTodos(JSON.parse(item));

  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    localStorage.setItem("todos", JSON.stringify(todos))
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(removedArr))

    let item = localStorage.getItem("todos");
    setTodos(JSON.parse(item));

  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
