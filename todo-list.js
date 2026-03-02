let tasks = JSON.parse(localStorage.getItem("gtasks") || "[]");
let filter = "all",
  editingId = null;
const input = document.getElementById("task-input");
const ps = document.getElementById("priority-select");
const list = document.getElementById("todo-list");
const h = new Date().getHours();
document.getElementById("greeting").textContent =
  h < 12
    ? "Good morning! Ready to crush it?"
    : h < 17
      ? "Good afternoon! Stay focused."
      : "Good evening! Wrapping things up?";
function save() {
  localStorage.setItem("gtasks", JSON.stringify(tasks));
}
function stats() {
  const tot = tasks.length,
    done = tasks.filter((t) => t.done).length;
  document.getElementById("total-count").textContent = tot;
  document.getElementById("done-count").textContent = done;
  document.getElementById("pending-count").textContent = tot - done;
  document.getElementById("progress").style.width = tot
    ? (done / tot) * 100 + "%"
    : "0%";
}
function fmt(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function filtered() {
  return tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    if (filter === "high") return t.priority === "high";
    if (filter === "medium") return t.priority === "medium";
    if (filter === "low") return t.priority === "low";
    return true;
  });
}
function render() {
  stats();
  const f = filtered();
  list.innerHTML = "";
  if (!f.length) {
    list.innerHTML = `<div class="empty"><div class="empty-icon">${filter === "done" ? "🎉" : "🗂️"}</div><h3>${filter === "done" ? "No completed tasks yet" : "No tasks here"}</h3><p>${filter === "all" ? "Add your first task above!" : "Try a different filter."}</p></div>`;
    return;
  }
  f.forEach((task) => {
    const div = document.createElement("div");
    div.className = `todo-item priority-${task.priority}${task.done ? " done" : ""}`;
    div.dataset.id = task.id;
    const textHtml =
      editingId === task.id
        ? `<input class="edit-input" value="${task.text.replace(/"/g, "&quot;")}" id="edit-field"/>`
        : `<div class="todo-text">${task.text}</div>`;
    const btnHtml =
      editingId === task.id
        ? `<button class="action-btn" data-action="save">💾</button>`
        : `<button class="action-btn" data-action="edit">✏️</button>`;
    div.innerHTML = `<div class="checkbox${task.done ? " checked" : ""}" data-action="toggle"></div><div class="todo-content">${textHtml}<div class="todo-meta"><span class="priority-tag ${task.priority}">${task.priority}</span><span class="todo-date">${fmt(task.createdAt)}</span></div></div><div class="todo-actions">${btnHtml}<button class="action-btn delete" data-action="delete">🗑️</button></div>`;
    list.appendChild(div);
    if (editingId === task.id) {
      const ef = document.getElementById("edit-field");
      ef.focus();
      ef.setSelectionRange(ef.value.length, ef.value.length);
      ef.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit(task.id, ef.value);
        if (e.key === "Escape") {
          editingId = null;
          render();
        }
      });
    }
  });
}
function addTask() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.style.borderColor = "var(--danger)";
    setTimeout(() => (input.style.borderColor = ""), 800);
    return;
  }
  tasks.unshift({
    id: Date.now(),
    text,
    priority: ps.value,
    done: false,
    createdAt: Date.now(),
  });
  input.value = "";
  save();
  render();
}
function saveEdit(id, val) {
  val = val.trim();
  if (!val) return;
  const t = tasks.find((t) => t.id === id);
  if (t) t.text = val;
  editingId = null;
  save();
  render();
}
list.addEventListener("click", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;
  const id = Number(item.dataset.id),
    action = e.target.closest("[data-action]")?.dataset.action;
  if (action === "toggle") {
    tasks.find((t) => t.id === id).done ^= true;
    save();
    render();
  } else if (action === "delete") {
    item.classList.add("removing");
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id);
      save();
      render();
    }, 280);
  } else if (action === "edit") {
    editingId = id;
    render();
  } else if (action === "save") {
    saveEdit(id, document.getElementById("edit-field").value);
  }
});
document.getElementById("add-btn").addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
document.querySelectorAll(".filter-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  }),
);
document.getElementById("clear-done").addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
});
if (!tasks.length) {
  tasks = [
    {
      id: 1,
      text: "Design the new landing page",
      priority: "high",
      done: false,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 2,
      text: "Review pull requests on GitHub",
      priority: "medium",
      done: true,
      createdAt: Date.now() - 7200000,
    },
    {
      id: 3,
      text: "Reply to team emails",
      priority: "low",
      done: false,
      createdAt: Date.now() - 1800000,
    },
  ];
  save();
}
render();
