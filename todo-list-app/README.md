# To-Do List Application

## Overview
This To-Do List application allows users to create, manage, and organize tasks with categories and priorities. It features a user-friendly interface with drag-and-drop sorting, making task management intuitive and efficient.

## Features
- **Create Tasks**: Add new tasks with a specified category.
- **Delete Tasks**: Remove tasks from the list.
- **Complete Tasks**: Mark tasks as completed.
- **Categorization**: Organize tasks by categories for better management.
- **Drag-and-Drop Sorting**: Easily reorder tasks by dragging and dropping them.
- **Responsive Design**: The application is designed to work on various screen sizes.

## Project Structure
```
todo-list-app
├── src
│   ├── index.html         # Main HTML document
│   ├── styles
│   │   └── styles.css     # CSS styles for the application
│   ├── js
│   │   ├── script.js      # Core functionality of the application
│   │   ├── taskItem.js    # Class representing a single task
│   │   └── categoryFilter.js # Function to filter tasks by category
│   └── utils
│       └── storage.js     # Utility functions for local storage
├── .gitignore             # Files and directories to ignore by Git
├── package.json           # npm configuration file
└── README.md              # Documentation for the project
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd todo-list-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Open `src/index.html` in your web browser.
2. Use the input field to add tasks and select a category.
3. Manage your tasks using the provided buttons for completing and deleting tasks.
4. Drag and drop tasks to reorder them as needed.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.