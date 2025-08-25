// filepath: g:\DEBORAJ ROY\Downloads\TodoMasterWithCategories\todo-list-app\src\utils\storage.js
import { saveTasks, getTasks } from '../utils/storage.js';
// If you have a taskItem module, import it like this:
// import TaskItem from './taskItem.js';

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = getTasks();

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.draggable = true;

    li.innerHTML = `
      <span>${task.text} <span class="category">[${task.category}]</span></span>
      <div>
        <button data-action="toggle" data-index="${index}">✓</button>
        <button data-action="delete" data-index="${index}">🗑</button>
      </div>
    `;

    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("index", index);
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    li.addEventListener("drop", (e) => {
      const draggedIndex = +e.dataTransfer.getData("index");
      reorderTasks(draggedIndex, index);
    });

    taskList.appendChild(li);
  });
  saveTasks(tasks);
}

function addTask() {
  const text = taskInput.value.trim();
  const category = categoryInput.value;
  if (!text) return;

  tasks.push({ text, category, completed: false });
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

taskList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const idx = Number(btn.dataset.index);
  if (btn.dataset.action === 'toggle') toggleComplete(idx);
  if (btn.dataset.action === 'delete') deleteTask(idx);
});

addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", renderTasks);