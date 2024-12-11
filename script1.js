// script1.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => createTaskElement(task));
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map((li) => ({
            text: li.querySelector(".task-text").textContent,
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Create a new task element
    const createTaskElement = (task) => {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.addEventListener("click", () => editTask(taskText));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(actions);
        taskList.appendChild(li);
    };

    // Add task
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTaskElement({ text: taskText });
            saveTasks();
            taskInput.value = "";
        }
    });

    // Edit task
    const editTask = (taskTextElement) => {
        const newText = prompt("Edit your task:", taskTextElement.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskTextElement.textContent = newText.trim();
            saveTasks();
        }
    };

    // Initialize
    loadTasks();
});