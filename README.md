# TaskMaster - To-Do List with Categories

TaskMaster is a modern, minimalistic web-based to-do list application designed to help you manage tasks efficiently. It supports task creation, deletion, completion, categorization, drag-and-drop reordering, work log generation, and log history management.

## Features

- **Task Management**: Create, delete, and mark tasks as complete.
- **Categories**: Assign tasks to categories (Work, Personal, Shopping, Other).
- **Drag-and-Drop**: Reorder tasks using drag-and-drop functionality.
- **Work Log Generation**: Generate and copy a formatted work log to the clipboard (e.g., "🗒️ Work Log - Monday, August 25, 2025").
- **Save Today's Work**: Save the current task list as a log entry for the day.
- **Previous Logs**: View and load previous logs, with the ability to delete them.
- **Responsive UI**: Clean, neon-themed interface with a sidebar, built using Bootstrap and Bootstrap Icons.
- **Persistent Storage**: Tasks and logs are saved in the browser's localStorage.

## Technologies Used

- **HTML5**: Structure of the application.
- **CSS3**: Custom styling with a neon aesthetic, enhanced by Bootstrap 5.3.
- **JavaScript/jQuery**: Dynamic functionality and DOM manipulation.
- **Bootstrap 5.3**: Responsive layout and components.
- **Bootstrap Icons**: Icons for a polished UI.

## Setup

To run TodoMasterWithCategories locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GitGalleons/TodoMasterWithCategories.git
   cd TodoMasterWithCategories
   ```

2. **Serve the Application**:
   Since this is a static web app, you can serve it using a local server. For example, using Python's HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Alternatively, use any web server (e.g., Node.js with `http-server`, VS Code Live Server).

3. **Open in Browser**:
   Navigate to `http://localhost:8000` in your web browser to use the app.

## File Structure

```
TaskMaster/
├── index.html        # Main HTML file
├── styles.css       # Custom CSS for styling
├── script.js        # JavaScript/jQuery for functionality
└── README.md        # Project documentation
```

## Usage

1. **Adding a Task**:
   - Enter a task in the input field.
   - Select a category (e.g., Work, Personal) from the dropdown.
   - Click the "Add" button or press Enter to add the task.

2. **Managing Tasks**:
   - Check the checkbox to mark a task as complete.
   - Click the trash icon to delete a task.
   - Drag and drop tasks to reorder them.

3. **Saving Work**:
   - Click "Save Today's Work" to save the current task list as a log entry for the day.
   - If a log for the current day exists, it will be overwritten.

4. **Viewing Previous Logs**:
   - Saved logs appear in the "Previous Logs" section of the sidebar.
   - Click a log to load its tasks into the task list.
   - Click the trash icon next to a log to delete it.

5. **Copying Work Log**:
   - Click "Copy Work Log" to generate a formatted log (e.g., "🗒️ Work Log - Monday, August 25, 2025") and copy it to the clipboard.
   - Paste the log into any text editor or communication tool.

## Example Work Log Output

```
🗒️ Work Log - Monday, August 25, 2025

✅ Finish project proposal (Work)
⏳ Buy groceries (Shopping)
✅ Call client (Work)
```

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For issues or suggestions, please open an issue on the [GitHub repository](https://github.com/GitGalleons/TodoMasterWithCategories).