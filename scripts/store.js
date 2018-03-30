'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {
  const addTodo = function(todo) {
    this.todos.push(todo);
  };
  const deleteTodo = function(todo) {
  };
  return {
    todos: [],
    adding: false,
    condensed: false,
    addTodo,
    deleteTodo
  };
}());