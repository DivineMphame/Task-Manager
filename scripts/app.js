const taskForm= document.getElementById('task-form');
const taskList= document.getElementById('task-input');

//Counter variable track the task index
let taskIndex= 1;

// console.log(taskForm, taskList);

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput= document.getElementById('task-input');
    const taskText= taskInput.value.trim();

    //console.log('New Task:', taskText);

    if (taskText !== '') {
        // Add the new task to the task list

    const taskItem= document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.textContent= `${taskIndex}. ${taskText}`;

taskItem.addEventListener('click', function() {
    console.log('completed');            
    this.classList.toggle('completed');
});

    //Append the task item to the task list
    taskList.appendChild(taskItem);

    // Increment the task index for the next task

    taskIndex++;

    // Clear the input field
    taskInput.value= '';
    }
});


