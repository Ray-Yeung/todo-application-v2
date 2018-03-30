'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ray';
  const getTodos = function(callback) {
    $.getJSON(`${BASE_URL}/items`, callback);
  };
  const createTodo = function(newTodo, callback) {
    $.ajax({
      url: `${BASE_URL}/items`,
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(newTodo),
      success: callback
    });
  };
  const deleteTodo = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      dataType: 'json',
      success: callback
    });
  };
  return {
    getTodos,
    createTodo,
    deleteTodo
  };
}());

