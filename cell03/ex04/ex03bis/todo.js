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
    $('#ft_list').children().each(function () {
        todoList.push($(this).text());
    });
    document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todoList))}; path=/;`;
}

function loadToDoList() {
    const cookies = getCookies();
    if (cookies.todoList) {
        const todoList = JSON.parse(cookies.todoList);
        $.each(todoList, function (index, item) {
            addToDo(item);
        });
    }
}

function addToDo(taskText) {
    const newTask = $('<div></div>').text(taskText).on('click', function () {
        const confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            $(this).remove();
            saveToDoList();
        }
    });

    $('#ft_list').prepend(newTask);
    saveToDoList();
}

function createNewTask() {
    const task = prompt("Enter a new TO DO:");
    if (task) {
        addToDo(task);
    }
}

$(document).ready(function () {
    $('#newTaskButton').on('click', createNewTask);
    loadToDoList();
});
