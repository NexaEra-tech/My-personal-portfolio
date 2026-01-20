alert("Welcome to the To-Do list application!")
let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    displayTasks();
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    if (text === "") return alert("Enter a task");

    const dateTime = new Date().toLocaleString();

    tasks.push({
        text: text,
        completed: false,
        time: dateTime
    });

    saveTasks();
    displayTasks();
    document.getElementById("taskInput").value = "";
}

function displayTasks(filteredTasks = tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const checked = task.completed ? "checked" : "";
        const completedClass = task.completed ? "completed" : "";

        list.innerHTML += `
            <li class="${completedClass}">
                <input type="checkbox" onclick="toggleComplete(${index})" ${checked}>
                
                <div class="task-info">
                    <span>${task.text}</span>
                    <div class="task-time">${task.time}</div>
                </div>
                
                <div class="actions">
                    <button onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            </li>
        `;
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index].text);
    if (!newText || newText.trim() === "") return;

    tasks[index].text = newText;
    saveTasks();
    displayTasks();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

document.getElementById("searchInput").addEventListener("input", () => {
    const text = document.getElementById("searchInput").value.toLowerCase();
    const filtered = tasks.filter(task => task.text.toLowerCase().includes(text));
    displayTasks(filtered);
});


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}