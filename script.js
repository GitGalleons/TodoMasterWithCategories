const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.draggable = true;

    li.innerHTML = `
      <span>${task.text} <span class="category">[${task.category}]</span></span>
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

addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", renderTasks);
