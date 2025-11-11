// ====== Select Elements ======
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAllBtn");

// ====== Load saved tasks or empty array ======
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

/**
 * Add Task
 * Uses try...catch for error handling
 */
addBtn.addEventListener("click", () => {
  try {
    const text = taskInput.value.trim();
    if (!text) throw new Error("Task cannot be empty.");
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveAndRender();
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
});

/**
 * Render Tasks
 * Recursively loads tasks to the DOM (demonstrates recursion)
 */
function renderTasks(index = 0) {
  if (index === 0) taskList.innerHTML = ""; // clear list before render
  if (index >= tasks.length) return; // recursion base case

  const task = tasks[index];
  const li = document.createElement("li");
  li.className = "task-item" + (task.completed ? " completed" : "");
  li.innerHTML = `
    <span>${task.text}</span>
    <div class="task-buttons">
      <button class="complete"><i class="fas fa-check"></i></button>
      <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
  `;

  // Complete task
  li.querySelector(".complete").addEventListener("click", () => {
    task.completed = !task.completed;
    saveAndRender();
  });

  // Delete task
  li.querySelector(".delete").addEventListener("click", () => {
    tasks.splice(index, 1);
    saveAndRender();
  });

  taskList.appendChild(li);
  renderTasks(index + 1); // recursive call
  updateCounter();
}

/**
 * Save tasks and rerender
 */
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/**
 * Update task counter using ES6 array methods
 */
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskCounter.textContent = Total Tasks: ${total} | Completed: ${completed};
}

/**
 * Clear All Tasks with SweetAlert confirmation
 */
clearAllBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Clear all tasks?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, clear all",
  }).then(result => {
    if (result.isConfirmed) {
      tasks = [];
      saveAndRender();
    }
  });
});