##  Stage 2 – What Changed

Stage 2 upgrades the Todo Card from a static component to a more interactive and state-driven UI.

###  Key Improvements

* **Edit Mode**

  * Inline editing for title, description, priority, and due date
  * Save and Cancel actions added

* **Status Control**

  * Dropdown for status: *Pending, In Progress, Done*
  * Synced with checkbox (auto-updates both ways)

* **Priority Indicator**

  * Visual color indicator (High = red, Medium = orange, Low = green)

* **Expand / Collapse**

  * Long descriptions can be toggled (expand/collapse)
  * Accessible with `aria-expanded`

* **Time & Overdue Handling**

  * Live time updates (every 60s)
  * Shows “Due in…” or “Overdue by…”
  * Completed tasks show “Completed”

* **Improved State Management**

  * Centralized state (`state.todos`)
  * Updates handled via callbacks (`onUpdate`, `onDelete`)

* **Modal Refactor**

  * Modal now uses `onSave` instead of directly mutating state

* **Responsive UI**

  * Works across mobile, tablet, and desktop
  * Edit form adapts to screen size

###  Summary

Stage 2 makes the Todo Card interactive, responsive, and easier to maintain with a cleaner state management approach.
