

export function TodoCard({ todo, onUpdate, onDelete }) {
  const card = document.createElement("article");
  card.className = "todo-card";
  card.setAttribute("data-testid", "test-todo-card");

  let isEditing = false;
  let expanded = false;

  const isLong = todo.description.length > 120;

//time logic
  function getTimeMeta() {
    if (todo.status === "Done") {
      return { text: "Completed", color: "text-green-600", overdue: false };
    }

    const now = new Date();
    const diff = new Date(todo.dueDate) - now;

    const abs = Math.abs(diff);
    const min = Math.floor(abs / 60000);
    const hr = Math.floor(abs / 3600000);
    const day = Math.floor(abs / 86400000);

    if (diff < 0) {
      if (min < 60) return { text: `Overdue by ${min} min`, color: "text-red", overdue: true };
      if (hr < 24) return { text: `Overdue by ${hr} hr`, color: "text-red", overdue: true };
      return { text: `Overdue by ${day} day(s)`, color: "text-red", overdue: true };
    }

    if (min < 60) return { text: `Due in ${min} min`, color: "text-orange", overdue: false };
    if (hr < 24) return { text: `Due in ${hr} hr`, color: "text-yellow", overdue: false };
    return { text: `Due in ${day} day(s)`, color: "text-green-600", overdue: false };
  }

  
    card.className = "card";
  function render() {
    const meta = getTimeMeta();

    card.innerHTML = `
      <!-- PRIORITY INDICATOR -->
      <div
        data-testid="test-todo-priority-indicator"
        style="
          height: 4px;
          width: 100%;
          margin-bottom: 8px;
          background: ${
            todo.priority === "High"
              ? "red"
              : todo.priority === "Medium"
              ? "orange"
              : "green"
          };
        "
      ></div>

      <!-- TITLE -->
      <h3 style="${todo.completed ? "text-decoration:line-through;opacity:0.6" : ""}">
        ${todo.title}
      </h3>

      <!-- DESCRIPTION -->
      <section
        data-testid="test-todo-collapsible-section"
        id="desc-${todo.id}"
      >
        <p>
          ${
            expanded || !isLong
              ? todo.description
              : todo.description.slice(0, 120) + "..."
          }
        </p>

        ${
          isLong
            ? `
          <button
            data-testid="test-todo-expand-toggle"
            aria-expanded="${expanded}"
            aria-controls="desc-${todo.id}"
          >
            ${expanded ? "Collapse" : "Expand"}
          </button>
        `
            : ""
        }
      </section>

      <!-- TIME -->
      <div class="${meta.color}">
        <span data-testid="test-todo-overdue-indicator">
          ${meta.overdue ? "⚠ Overdue • " : ""}
        </span>
        ${meta.text}
      </div>

      <!-- STATUS -->
      <select data-testid="test-todo-status-control">
        <option ${todo.status === "Pending" ? "selected" : ""}>Pending</option>
        <option ${todo.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${todo.status === "Done" ? "selected" : ""}>Done</option>
      </select>

      <!-- CHECKBOX -->
      <label>
        <input type="checkbox" ${todo.completed ? "checked" : ""} />
        Complete
      </label>

      <!-- ACTIONS -->
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="edit-btn" data-testid="test-todo-edit-button">Edit</button>
        <button class="delete-btn" data-testid="test-todo-delete-button" style="color:red;">Delete</button>
      </div>
    `;

    //events

    // Delete
    card.querySelector('[data-testid="test-todo-delete-button"]')
      .onclick = () => onDelete(todo.id);

    // Edit (inline edit mode)
    card.querySelector('[data-testid="test-todo-edit-button"]')
      .onclick = () => enterEditMode();

    // Expand
    const expandBtn = card.querySelector('[data-testid="test-todo-expand-toggle"]');
    if (expandBtn) {
      expandBtn.onclick = () => {
        expanded = !expanded;
        render();
      };
    }

    // Status change
    card.querySelector('[data-testid="test-todo-status-control"]')
      .onchange = (e) => {
        todo.status = e.target.value;

        if (todo.status === "Done") {
          todo.completed = true;
        }

        onUpdate({ ...todo });
      };

    // Checkbox sync
    card.querySelector("input[type='checkbox']")
      .onchange = () => {
        todo.completed = !todo.completed;

        todo.status = todo.completed ? "Done" : "Pending";

        onUpdate({ ...todo });
      };
  }

 //edit mode
  function enterEditMode() {
    isEditing = true;

    card.innerHTML = `
  <div data-testid="test-todo-edit-form" class="edit-form">

    <div class="edit-group">
      <label for="title">Title</label>
      <input 
        id="title"
        data-testid="test-todo-edit-title-input" 
        value="${todo.title}" 
      />
    </div>

    <div class="edit-group">
      <label for="desc">Description</label>
      <textarea 
        id="desc"
        data-testid="test-todo-edit-description-input"
      >${todo.description}</textarea>
    </div>

    <div class="edit-row">
      <div class="edit-group">
        <label for="priority">Priority</label>
        <select 
          id="priority"
          data-testid="test-todo-edit-priority-select"
        >
          <option ${todo.priority === "Low" ? "selected" : ""}>Low</option>
          <option ${todo.priority === "Medium" ? "selected" : ""}>Medium</option>
          <option ${todo.priority === "High" ? "selected" : ""}>High</option>
        </select>
      </div>

      <div class="edit-group">
        <label for="date">Due Date</label>
        <input 
          id="date"
          type="datetime-local" 
          data-testid="test-todo-edit-due-date-input"
        />
      </div>
    </div>

    <div class="edit-actions">
      <button data-testid="test-todo-cancel-button" class="btn-secondary">
        Cancel
      </button>
      <button data-testid="test-todo-save-button" class="btn-primary">
        Save
      </button>
    </div>

  </div>
`;

    // SAVE
    card.querySelector('[data-testid="test-todo-save-button"]')
      .onclick = () => {
        todo.title = card.querySelector('[data-testid="test-todo-edit-title-input"]').value;
        todo.description = card.querySelector('[data-testid="test-todo-edit-description-input"]').value;
        todo.priority = card.querySelector('[data-testid="test-todo-edit-priority-select"]').value;

        const dateVal = card.querySelector('[data-testid="test-todo-edit-due-date-input"]').value;

        if (dateVal) {
          todo.dueDate = new Date(dateVal).toISOString();
        }

        isEditing = false;
        onUpdate({ ...todo });
      };

    // CANCEL
    card.querySelector('[data-testid="test-todo-cancel-button"]')
      .onclick = () => {
        isEditing = false;
        render();
      };
  }

  //init
  render();

  // time updater 
  setInterval(() => {
    if (!todo.completed) render();
  }, 60000);

  return card;
}