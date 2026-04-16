

import { saveTodo } from "../features/todos.js";
import { state } from "../state.js";


export function openModal({ todo = null, onSave, onClose } = {}) {
  let modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }

  modalRoot.innerHTML = "";

  const draft = {
    id: todo?.id || Date.now().toString(),
    title: todo?.title || "",
    description: todo?.description || "",
    priority: todo?.priority || "Medium",
    status: todo?.status || "Pending",
    dueDate: todo?.dueDate || "",
    tags: todo?.tags || [],
    completed: todo?.completed || false,
  };

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-content">

      <label for="title">Title</label>
      <input id="title" value="${draft.title}" />

      <label for="desc">Description</label>
      <textarea id="desc">${draft.description}</textarea>

      <label for="priority">Priority</label>
      <select id="priority">
        <option ${draft.priority === "Low" ? "selected" : ""}>Low</option>
        <option ${draft.priority === "Medium" ? "selected" : ""}>Medium</option>
        <option ${draft.priority === "High" ? "selected" : ""}>High</option>
      </select>

      <label for="status">Status</label>
      <select id="status">
        <option ${draft.status === "Pending" ? "selected" : ""}>Pending</option>
        <option ${draft.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${draft.status === "Done" ? "selected" : ""}>Done</option>
      </select>

      <label for="date">Due Date</label>
      <input type="datetime-local" id="date" />

      <label for="tags">Tags</label>
      <input id="tags" value="${draft.tags.join(",")}" />

      <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:10px;">
        <button id="cancel">Cancel</button>
        <button id="save">Save</button>
      </div>

    </div>
  `;

  modalRoot.appendChild(modal);

  //close
  modal.querySelector("#cancel").onclick = () => {
    modalRoot.innerHTML = "";
    onClose?.();
  };

//save
  modal.querySelector("#save").onclick = () => {
    const updated = {
      ...draft,
      title: modal.querySelector("#title").value,
      description: modal.querySelector("#desc").value,
      priority: modal.querySelector("#priority").value,
      status: modal.querySelector("#status").value,
      dueDate: modal.querySelector("#date").value
        ? new Date(modal.querySelector("#date").value).toISOString()
        : draft.dueDate,
      tags: modal.querySelector("#tags").value
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
    };

  //status
    updated.completed = updated.status === "Done";

    onSave?.(updated);

    modalRoot.innerHTML = "";
    onClose?.();
  };
}