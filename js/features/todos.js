import { state } from "../state.js";
import { saveTodos } from "../storage.js";
import { render } from "../app.js";
import { openModal } from "../components/Modal.js";

export function toggleTodo(id) {
  state.todos = state.todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );

  persist();
}

export function deleteTodo(id) {
  state.todos = state.todos.filter(t => t.id !== id);
  persist();
}

export function editTodo(todo) {
  openModal(todo);
}

export function saveTodo(todo) {
  if (todo.id) {
    state.todos = state.todos.map(t =>
      t.id === todo.id ? { ...t, ...todo } : t
    );
  } else {
    state.todos.unshift({
      ...todo,
      id: Date.now().toString(),
      completed: false,
      status: "Pending",
    });
  }

  persist();
}

function persist() {
  saveTodos(state.todos);
  render();
}