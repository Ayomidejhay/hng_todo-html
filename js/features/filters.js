import { state } from "../state.js";

export function getFilteredTodos() {
    return state.todos
        .filter(t => state.filter === "all" || t.priority.toLowerCase() === state.filter)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}