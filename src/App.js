import React, { useState } from 'react';
import './App.css';

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className="todo-list__item"
    >
      {todo.text}
      <div>
        <button
          onClick={() => completeTodo(index)}
          className="btn btn--round"
          style={{ color: todo.isCompleted ? 'red' : 'green' }}
        >
          {todo.isCompleted ? ' ✘' : '✔'}
        </button>
        <button onClick={() => removeTodo(index)} className="btn btn--round">
          <i class="fa fa-trash-o" style={{ color: 'red' }} />
        </button>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const _handleInput = e => {
    setValue(e.target.value);
  };

  const _handleSubmit = e => {
    e.preventDefault();

    if (!value) return;

    addTodo(value);

    setValue('');
  };

  return (
    <form onSubmit={_handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Add task to list..."
        value={value}
        onChange={_handleInput}
      />
    </form>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React Hooks',
      isCompleted: false
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false
    },
    {
      text: 'Build a to-do app',
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <h1 className="todo-list__title">To-do List</h1>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
