
//UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');


//UDF to load all event listeners
loadEventListeners();

function loadEventListeners() {

    //Create Add Task Event Listener
    form.addEventListener('submit', addTask);
};

//Add Task
function addTask (e) {

    //Check if a task has been entered
    if(taskInput.value === '') {
        alert('Please enter a task first...');
    };

    //Create <li> list item
    const li = document.createElement('li');
    //Add class to <li> element created
    li.className = 'collection-item'; //class of 'collection' on <ul> and a class of 'collection-item' is recommended with materialize.css
    //Create a text node and append to <li> item
    li.appendChild(document.createTextNode(taskInput.value));
    
    //Create new delete item link element
    const link = document.createElement('a');
    //Add class to <a> element created
    link.className = 'delete-item secondary-content'; //secondary-content for shifting elements to the right in materialize.css
    //Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    //Append the link to the <li> element
    li.appendChild(link);

    //Then append <li> element to the <ul> element
    taskList.appendChild(li);

    //Clear the input (once task added)
    taskInput.value = '';

    // prevent event object default behaviour
    e.preventDefault();

};
