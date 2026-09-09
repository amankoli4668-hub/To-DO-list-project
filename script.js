const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const markAllBtn = document.getElementById("markAllBtn");

let tasks = [];
let currentView = 'all';


// To Create and enter the task in tasks array.
function addTask(){
    const text = taskInput.value;
    taskInput.value = "";
    if(text != ""){
        const task = {
        id: Date.now(),
        title: text,
        completed: false
        }
        tasks.push(task);
        saveTasks();
        tasksStatus();
    }
}

addTaskBtn.addEventListener('click', addTask);


// To show tasks on html or browser.
function showTasks(arr) {
    taskList.innerHTML = "";

    arr.forEach(function(task){

        const li = document.createElement("li");
        if(task.completed){
            li.classList.add('completed');
        }

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add('checkbox');

        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.title;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        // Delete 
        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });

        // updation
        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
        });
    });

    taskCounter();
}


// To show the tasks in Active or Completed.
function tasksStatus(){
    let filterArr;
    if(currentView === 'active'){
        filterArr = tasks.filter(task => task.completed === false);
    } else if(currentView === 'completed'){
        filterArr = tasks.filter(task => task.completed === true);
    } else {
        filterArr = tasks
    }
    
    showTasks(filterArr);
}


// To make the filter buttons to show the completed or pending tasks.
filterBtns.forEach(button => {
    button.addEventListener('click', () =>{

        filterBtns.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        
        currentView = button.dataset.filter;
        tasksStatus();
    });

});


// To Clear all completed tasks.
function clrCompletedTasks(){
    let filterArr;

    filterArr = tasks.filter(task => task.completed === false);

    tasks = filterArr;
    saveTasks();
    tasksStatus();
}

clearCompletedBtn.addEventListener('click', clrCompletedTasks);


//To Marks all tasks completed. 
function MarkallComplete(){
    tasks.forEach(task => task.completed = true);
    saveTasks();
    tasksStatus();
}

markAllBtn.addEventListener('click', MarkallComplete);


// To make Enter Key support.
taskInput.addEventListener('keypress', e => {
    if(e.key === "Enter"){addTask()}
});

// To make Actice task counter.
function taskCounter(){
    let filterArr = tasks.filter(task => task.completed === false);
    const counter = filterArr.length;
    taskCount.textContent = counter + " tasks left";
}

// delete a perticular task 
function deleteTask(id){
    tasks = tasks.filter(task => task.id != id);
    saveTasks();
    tasksStatus();
}

// complete a perticular task
function toggleTask(id){
    tasks.forEach(task => {
        if(task.id == id){
            task.completed = !task.completed;
        }
    });
    saveTasks();
    tasksStatus();
}

// To save the Tasks array in localStorage
function saveTasks(){
    localStorage.setItem("StoredTasks", JSON.stringify(tasks));
}

// To load the Task array from localStorage.
function loadTasks(){
    const StoredTasks = localStorage.getItem("StoredTasks");
    if(StoredTasks){
        tasks = JSON.parse(StoredTasks);
        tasksStatus();
    }
}

document.addEventListener("DOMContentLoaded", loadTasks);