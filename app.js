"use strict";

//UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');


//Load all event listeners
loadEventListeners();

function loadEventListeners() {

    //DOM Load Event Listener (to show stored tasks on page load/re-load)
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add Task Event Listener
    form.addEventListener('submit', addTask);

    //Remove Task (single task) Event Listener
    taskList.addEventListener('click', removeTask);

    //Clear Tasks (all tasks) Event Listener
    clearBtn.addEventListener('click', clearTasks);

    //Filter Tasks Event Lister
    filter.addEventListener('keyup', filterTasks);

}

//Get Exisiting Tasks from Local Storage
function getTasks() {
    //local var
    let tasks;

    //check local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        //Create <li> list item
        const li = document.createElement('li');
        //Add class to <li> element created
        li.className = 'collection-item'; //class of 'collection' on <ul> and a class of 'collection-item' is recommended with materialize.css
        //Create a text node and append to <li> item
        li.appendChild(document.createTextNode(task));

        //Create new delete item link element
        const link = document.createElement('a');
        //Add class to <a> element created
        link.className = 'delete-item secondary-content'; //secondary-content for shifting elements to the right (materialize.css)
        //Add icon html
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        //Append the link to the <li> element
        li.appendChild(link);
        //Then append <li> elements to the <ul> element
        taskList.appendChild(li);

    });
}


//Add a Task
function addTask(e) {

    //Check if a task has been entered
    if (taskInput.value === '' || taskInput.value === ' ' || taskInput.value === null || taskInput.value === undefined) {

        alert('Please enter a task first...');

    } else {

        //Create <li> list item
        const li = document.createElement('li');
        //Add class to <li> element created
        li.className = 'collection-item'; //class of 'collection' on <ul> and a class of 'collection-item' is recommended with materialize.css
        //Create a text node and append to <li> item
        li.appendChild(document.createTextNode(taskInput.value));

        //Create new delete item link element
        const link = document.createElement('a');
        //Add class to <a> element created
        link.className = 'delete-item secondary-content'; //secondary-content for shifting elements to the right (materialize.css)
        //Add icon html
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        //Append the link to the <li> element
        li.appendChild(link);
        //Then append <li> element to the <ul> element
        taskList.appendChild(li);

        //Persist data to local storage (in-built JS local storage mechanism)
        storeTaskInLocalStorage(taskInput.value);

        //Clear the input (once task added)
        taskInput.value = '';

        // prevent event object default behaviour
        e.preventDefault();

    }
}

//Store Task
function storeTaskInLocalStorage(task) {

    //local var
    let tasks;

    //check local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //parse for array as will be a string
    }

    //push the new task added in the tasks array
    tasks.push(task);

    //set back to local storage (but tasks back in a string format - array of strings)
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove a Task (single task)
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {

        //confirm deletion of a single task
        if (confirm('Are you sure you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();  //traverse the DOM to <li> (ul > li > a > i) and remove the <li> target element

            //once removed from the DOM, we should remove task from local storage also
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); //remove the li element
        }

    }
}

//Remove From Local Storage
function removeTaskFromLocalStorage(taskItem) {

    //local var
    let tasks;

    //check local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //parse for array as will be a string
    }

    tasks.forEach(function (task, index) {

        //check to see if task item text content in the current iteration is the same as task, and if so, delete task item
        if (taskItem.textContent === task) {
            tasks.splice(index, 1); //delete one from the index
        }
    });

    //set local storage tasks array value again after removal of the task item
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


//Clear All Tasks
function clearTasks() {

    //confirm deletion of all tasks
    if (confirm('Are you sure you want to delete ALL of your current tasks from the list?')) {

        //check for a first child (ensure there's at least one task in the list)
        while (taskList.firstChild) {

            taskList.removeChild(taskList.firstChild); //taskList is the <ul> so remove child <li> element
        }

    };

    //clear all from local storage
    clearTasksFromLocalStorage();
}

//Clear All Tasks from Local Storage
function clearTasksFromLocalStorage() {

    localStorage.clear();

}

//Filter All Tasks
function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {

        const item = task.firstChild.textContent;

        //check if text passed in exits (-1 = no match)
        if (item.toLocaleLowerCase().indexOf(text) !== -1) {

            task.style.display = 'block'; //so that task still shows (if is a match)

        } else {

            task.style.display = 'none'; //so that task hides (no match)

        }

    });

}
