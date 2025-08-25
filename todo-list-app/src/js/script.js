const TaskItem = require('./taskItem');

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const categoryFilter = document.getElementById("categoryFilter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filterCategory = "") {
  taskList.innerHTML = "";
  const filteredTasks = filterCategory ? tasks.filter(task => task.category === filterCategory) : tasks;

  filteredTasks.forEach((task, index) => {
    const taskItem = new TaskItem(task.text, task.category, task.completed);
    const li = document.createElement("li");
    li.className = `task ${taskItem.completed ? "completed" : ""}`;
    li.draggable = true;

    li.innerHTML = `
      <span>${taskItem.text} <span class="category">[${taskItem.category}]</span></span>
      <div>
        <button onclick="toggleComplete(${index})">✓</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("index", index);
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    li.addEventListener("drop", (e) => {
      const draggedIndex = e.dataTransfer.getData("index");
      reorderTasks(draggedIndex, index);
    });

    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  const category = categoryInput.value;
  if (!text) return;

  tasks.push(new TaskItem(text, category, false));
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function reorderTasks(from, to) {
  const movedItem = tasks.splice(from, 1)[0];
  tasks.splice(to, 0, movedItem);
  renderTasks();
}

function filterTasks() {
  const selectedCategory = categoryFilter.value;
  renderTasks(selectedCategory);
}

addTaskBtn.addEventListener("click", addTask);
categoryFilter.addEventListener("change", filterTasks);
window.addEventListener("load", () => {
  renderTasks();
  categoryFilter.value = ""; // Reset filter on load
});