const STORAGE_KEY = "todo-app-data";

export function loadTodos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}