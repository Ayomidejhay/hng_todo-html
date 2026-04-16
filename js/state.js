export const state = {
    todos: [],
    filter: 'all',
    editingTodo: null,
};

export function setState(updater) {
    updater(state);
}