function getCookies() {
    const cookies = document.cookie.split('; ');
    const cookieObj = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObj[name] = decodeURIComponent(value);
    });
    return cookieObj;
}

function saveToDoList() {
    const todoList = [];
    const list = document.getElementById('ft_list').children;
    for (let i = 0; i < list.length; i++) {
        todoList.push(list[i].textContent);
    }
    document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todoList))}; path=/;`;
}

function loadToDoList() {
    const cookies = getCookies();
    if (cookies.todoList) {
        const todoList = JSON.parse(cookies.todoList);
        todoList.forEach(item => {
            addToDo(item);
        });
    }
}

function addToDo(taskText) {
    const ftList = document.getElementById('ft_list');
    const newTask = document.createElement('div');
    newTask.textContent = taskText;
    newTask.addEventListener('click', function () {
        const confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            ftList.removeChild(newTask);
            saveToDoList(); 
        }
    });
    ftList.insertBefore(newTask, ftList.firstChild); // Add the task to the top
    saveToDoList();
}

function createNewTask() {
    const task = prompt("Enter a new TO DO:");
    if (task) {
        addToDo(task);
    }
}

document.getElementById('newTaskButton').addEventListener('click', createNewTask);

window.onload = function () {
    loadToDoList();
};

