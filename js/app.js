
import { loadTodos, saveTodos } from "./storage.js";
import { state } from "./state.js";
import { getFilteredTodos } from "./features/filters.js";
import { TodoCard } from "./components/TodoCard.js";
import { openModal } from "./components/Modal.js";

let container;
let filterContainer;
let addBtn;

//default data
function getDefaultTodos() {
  return [
    {
      id: "1",
      title: "Finish Dashboard UI",
      description: "Build and polish dashboard",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
      priority: "High",
      status: "Pending",
      tags: ["work", "urgent"],
      completed: false,
    },
    {
      id: "2",
      title: "Study CSC505",
      description: "Prepare for exam",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
      priority: "Medium",
      status: "In Progress",
      tags: ["school"],
      completed: false,
    },
    {
      id: "3",
      title: "Fix UI bugs",
      description: "Resolve layout issues",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      priority: "Low",
      status: "Pending",
      tags: ["dev"],
      completed: false,
    },
  ];
}

//state mutators
function updateTodo(updatedTodo) {
  state.todos = state.todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );

  saveTodos(state.todos);
  render();
}

function deleteTodo(id) {
  state.todos = state.todos.filter((todo) => todo.id !== id);

  saveTodos(state.todos);
  render();
}

//render
export function render() {
  if (!container) return;

  container.innerHTML = "";

  const todos = getFilteredTodos();

  todos.forEach((todo) => {
    container.appendChild(
      TodoCard({
        todo,
        onUpdate: updateTodo,
        onDelete: deleteTodo,
      })
    );
  });
}

//filter ui
function renderFilters() {
  filterContainer.innerHTML = "";

  ["all", "high", "medium", "low"].forEach((f) => {
    const btn = document.createElement("button");
    btn.innerText = f;

    if (state.filter === f) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      state.filter = f;
      render();
      renderFilters();
    };

    filterContainer.appendChild(btn);
  });
}

//init
function init() {
  container = document.getElementById("todo-container");
  filterContainer = document.getElementById("filter-buttons");
  addBtn = document.getElementById("add-btn");

  if (!container || !filterContainer || !addBtn) {
    console.error("Missing DOM elements");
    return;
  }

  const stored = loadTodos();

  state.todos = stored.length > 0 ? stored : getDefaultTodos();

  if (stored.length === 0) {
    saveTodos(state.todos);
  }

  renderFilters();
  render();

  
   // IMPORTANT FIX:
   // Modal must update through updateTodo()
   
  addBtn.addEventListener("click", () => {
    openModal({
      todo: null,
      onSave: (newTodo) => {
        state.todos.unshift(newTodo);
        saveTodos(state.todos);
        render();
      },
      onClose: () => {}
    });
  });

  setInterval(render, 60000);
}

document.addEventListener("DOMContentLoaded", init);

console.log("APP STARTED");