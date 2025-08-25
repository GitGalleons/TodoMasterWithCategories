$(document).ready(function() {
    // Initialize Toast
    const toast = new bootstrap.Toast(document.getElementById('toastNotification'));

    // Display current date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#currentDate').text(now.toLocaleDateString('en-US', options));

    // Load tasks and logs from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let workLogs = JSON.parse(localStorage.getItem('workLogs')) || [];
    renderTasks();
    renderLogHistory();

    // Add new task
    $(document).on('click', '.add-task-btn', function() {
        const taskInput = $(this).siblings('.task-input');
        const categorySelect = $(this).siblings('#category-select');
        const taskText = taskInput.val().trim();
        const category = categorySelect.val();

        if (taskText) {
            const taskId = Date.now();
            const task = {
                id: taskId,
                text: taskText,
                category: category,
                completed: false
            };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTaskToDOM(task);
            taskInput.val('');
            showToast('Task added successfully!');
        } else {
            showToast('Please enter a task!', 'bg-danger');
        }
    });

    // Allow pressing Enter to add task
    $(document).on('keypress', '.task-input', function(e) {
        if (e.which === 13) {
            $(this).nextAll('.add-task-btn').click();
        }
    });

    // Toggle task completion
    $(document).on('change', '.task-checkbox', function() {
        const taskId = $(this).closest('.task-item').data('task-id');
        const task = tasks.find(t => t.id === taskId);
        task.completed = $(this).is(':checked');
        $(this).siblings('.task-label').toggleClass('completed', task.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        showToast('Task status updated!');
    });

    // Delete task
    $(document).on('click', '.delete-task', function() {
        const taskId = $(this).closest('.task-item').data('task-id');
        tasks = tasks.filter(t => t.id !== taskId);
        $(this).closest('.task-item').remove();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        showToast('Task deleted successfully!', 'bg-warning');
    });

    // New Task button
    $('#newTaskBtn').click(function() {
        $('.task-input').val('');
        $('.task-input').focus();
    });

    // Save Today's Work
    $('#saveLogBtn').click(function() {
        if (tasks.length > 0) {
            const logEntry = {
                date: now.toISOString(),
                tasks: tasks.map(task => ({
                    text: task.text,
                    category: task.category,
                    completed: task.completed
                }))
            };

            // Check if today's log already exists
            const todayLogIndex = workLogs.findIndex(log => {
                const logDate = new Date(log.date);
                return logDate.toDateString() === now.toDateString();
            });

            if (todayLogIndex !== -1) {
                workLogs[todayLogIndex] = logEntry;
            } else {
                workLogs.unshift(logEntry);
            }

            localStorage.setItem('workLogs', JSON.stringify(workLogs));
            renderLogHistory();
            showToast('Today\'s work log saved successfully!');
        } else {
            showToast('No tasks to save!', 'bg-danger');
        }
    });

    // Copy Work Log
    $('#copyLogBtn').click(function() {
        let log = `🗒️ Work Log - ${now.toLocaleDateString('en-US', options)}\n\n`;
        tasks.forEach(task => {
            log += `${task.completed ? '✅' : '⏳'} ${task.text} (${task.category})\n`;
        });

        const tempTextarea = $('<textarea>');
        $('body').append(tempTextarea);
        tempTextarea.val(log).select();
        document.execCommand('copy');
        tempTextarea.remove();
        showToast('Work log copied to clipboard!');
    });

    // Load log from history
    $(document).on('click', '.log-history-item', function() {
        const logId = $(this).data('log-id');
        const logEntry = workLogs.find(log => log.date === logId);

        if (logEntry) {
            tasks = logEntry.tasks.map((task, index) => ({
                id: Date.now() + index,
                text: task.text,
                category: task.category,
                completed: task.completed
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            showToast('Log loaded successfully!');
        }
    });

    // Delete log from history
    $(document).on('click', '.delete-log', function(e) {
        e.stopPropagation();
        const logId = $(this).closest('.log-history-item').data('log-id');
        workLogs = workLogs.filter(log => log.date !== logId);
        localStorage.setItem('workLogs', JSON.stringify(workLogs));
        renderLogHistory();
        showToast('Log deleted successfully!', 'bg-warning');
    });

    // Drag and Drop
    let draggedItem = null;

    $(document).on('dragstart', '.task-item', function() {
        draggedItem = this;
        setTimeout(() => $(this).css('opacity', '0.5'), 0);
    });

    $(document).on('dragend', '.task-item', function() {
        $(this).css('opacity', '1');
        draggedItem = null;
    });

    $(document).on('dragover', '.task-item', function(e) {
        e.preventDefault();
    });

    $(document).on('drop', '.task-item', function(e) {
        e.preventDefault();
        if (draggedItem) {
            const draggedIndex = tasks.findIndex(t => t.id === $(draggedItem).data('task-id'));
            const dropIndex = tasks.findIndex(t => t.id === $(this).data('task-id'));
            const [draggedTask] = tasks.splice(draggedIndex, 1);
            tasks.splice(dropIndex, 0, draggedTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    // Render tasks
    function renderTasks() {
        $('#taskContainer').empty();
        tasks.forEach(task => addTaskToDOM(task));
    }

    // Add task to DOM
    function addTaskToDOM(task) {
        const taskHtml = `
            <div class="task-item d-flex justify-content-between align-items-center fade-in" data-task-id="${task.id}" draggable="true">
                <div class="form-check">
                    <input class="form-check-input task-checkbox" type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
                    <label class="form-check-label task-label ${task.completed ? 'completed' : ''}" for="task-${task.id}">
                        <span class="category-badge">${task.category}</span> ${task.text}
                    </label>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-outline-danger delete-task">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
        $('#taskContainer').append(taskHtml);
    }

    // Render log history
    function renderLogHistory() {
        $('#logHistory').empty();

        if (workLogs.length === 0) {
            $('#logHistory').append(`
                <div class="text-center text-muted py-3">
                    No saved logs yet
                </div>
            `);
            return;
        }

        workLogs.forEach(log => {
            const logDate = new Date(log.date);
            const dateStr = logDate.toLocaleDateString('en-US', options);
            const taskCount = log.tasks.length;
            const completedCount = log.tasks.filter(task => task.completed).length;

            $('#logHistory').append(`
                <div class="list-group-item log-history-item" data-log-id="${log.date}">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${dateStr}</strong><br>
                            <small>${completedCount}/${taskCount} tasks completed</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger delete-log">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `);
        });
    }

    // Show toast notification
    function showToast(message, headerClass = 'bg-success') {
        $('.toast-body').text(message);
        $('.toast-header').removeClass('bg-success bg-danger bg-warning').addClass(headerClass);
        toast.show();
        setTimeout(() => {
            $('.toast-header').removeClass('bg-danger bg-warning').addClass('bg-success');
        }, 3000);
    }
});