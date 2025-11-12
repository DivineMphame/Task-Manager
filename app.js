const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');   //  correct ID
let taskIndex = 1;

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create the new task item
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.textContent = `${taskIndex}. ${taskText}`;

    taskItem.addEventListener('click', function() {
      this.classList.toggle('completed');
      console.log('Task completed');
    });

    // Append to the <ul>, not the input
    taskList.appendChild(taskItem);

    taskIndex++;
    taskInput.value = '';  // clear input
  }
});