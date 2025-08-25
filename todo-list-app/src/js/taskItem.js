// class TaskItem {
//   constructor(text, category) {
//     this.text = text;
//     this.category = category;
//     this.completed = false;
//   }

//   toggleCompletion() {
//     this.completed = !this.completed;
//   }

//   render() {
//     const li = document.createElement("li");
//     li.className = `task ${this.completed ? "completed" : ""}`;
//     li.draggable = true;

//     li.innerHTML = `
//       <span>${this.text} <span class="category">[${this.category}]</span></span>
//       <div>
//         <button class="complete-btn">✓</button>
//         <button class="delete-btn">🗑</button>
//       </div>
//     `;

//     return li;
//   }
// }
// ...existing code...// ...existing code...
export default class TaskItem {
  constructor(text, category, completed = false) {
    this.text = text;
    this.category = category;
    this.completed = completed;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }

  // render(index) returns a DOM <li> for insertion into the list
  render(index) {
    const li = document.createElement("li");
    li.className = `task ${this.completed ? "completed" : ""}`;
    li.draggable = true;
    li.dataset.index = index;

    li.innerHTML = `
      <span class="task-text">${this.text} <span class="category">[${this.category}]</span></span>
      <div class="task-controls">
        <button class="complete-btn" data-action="toggle" data-index="${index}">✓</button>
        <button class="delete-btn" data-action="delete" data-index="${index}">🗑</button>
      </div>
    `;

    return li;
  }
}