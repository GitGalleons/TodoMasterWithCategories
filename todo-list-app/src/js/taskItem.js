class TaskItem {
  constructor(text, category) {
    this.text = text;
    this.category = category;
    this.completed = false;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }

  render() {
    const li = document.createElement("li");
    li.className = `task ${this.completed ? "completed" : ""}`;
    li.draggable = true;

    li.innerHTML = `
      <span>${this.text} <span class="category">[${this.category}]</span></span>
      <div>
        <button class="complete-btn">✓</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    return li;
  }
}

export default TaskItem;