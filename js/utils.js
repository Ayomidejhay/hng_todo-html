export function formatDate(date) {
    return new Date(date).toLocaleString();
}

export function getTimeMeta(dueDate) {
    const now = new Date();
    const diff = new Date(dueDate) - now;

    const abs = Math.abs(diff);
    const minutes = Math.floor(abs / (1000 * 60));
    const hours = Math.floor(abs / (1000 * 60 * 60));
    const days = Math.floor(abs / (1000 * 60 * 60 * 24));   

    if (diff < 0) return { text: `Overdue by ${minutes} mins`, cls: "text-red"}
    if (minutes < 60) return { text: `Due in ${minutes} mins`, cls: "text-orange" }
    if (hours < 24) return { text: `Due in ${hours} hours`, cls: "text-yellow" }
    return { text: `Due in ${days} days`, cls: "text-green" }
}