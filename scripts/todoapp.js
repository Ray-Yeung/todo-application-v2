'use strict';

/* global store, api */

const todoList = (function() {

//returns html element as a string
  function generateTodoElement(todo) {
    return `
    <li class="js-item-index-element" data-todo-id="${todo.id}">
        <h3>${todo.name}</h3>
    <div class="todo-item-controls">
      <button class="todo-item-delete js-item-delete" data-todo-id="${todo.id}">
        <span class="button-label">Delete</span>
      </button>
    </div>
    </li>`;
  }

  function generateTodoString(todoList) {
  //will map over todoList array and generateTodoElement on each
  const todos = todoList.map((todo) => generateTodoElement(todo));
  return todos.join('');
  }

  function renderTodoList() {
    api.getTodos((todos) => {
      store.todos = todos;
      const todoHtmlElement = generateTodoString(store.todos);
      $('.js-todo-list').html(todoHtmlElement);
    });
  }

  function handleAddButtonClicked() {
  //event listener for add button to be clicked
  $('.js-add-checked').change(function() {
    if($('input[type=checkbox]').prop('checked')) {
      $('.js-add-toggle').removeClass('hidden');
    } else {
      $('.js-add-toggle').addClass('hidden');
    }
  });
  }

  function handleNewTodoSubmit() {
  //function is for when user clicks add new todo
    $('#new-todo-submit').click(function(event) {
      event.preventDefault();
      const newTodo = {
        name: $('.js-todo-list-entry').val(),
      };
      $('.js-todo-list-entry').val('');
      if(newTodo.name === '') {
        alert('Please enter a title');
        return false;
      }
      api.createTodo(newTodo, renderNewTodo);
    });
  }

  function renderNewTodo(data) {
    const todoElement = generateTodoElement(data);
    //.prepend adds to top of list
    $('.js-todo-list').prepend(todoElement);
  }

  function handleTodoDeleteClicked() {
    $('.js-todo-list').on('click', '.js-item-delete', event => {
      const todoId = $(event.currentTarget).attr('data-todo-id');
      api.deleteTodo(todoId, renderTodoList);
    });
  }

  function bindEventListeners() {
    handleAddButtonClicked();
    handleNewTodoSubmit();
    handleTodoDeleteClicked();
  }

  return {
    renderTodoList,
    bindEventListeners
  };

}());
