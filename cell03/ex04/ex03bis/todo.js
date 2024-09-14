function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
}

$(document).ready(function() {
    let tasks = getCookie('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.reverse().forEach(task => {
            addTaskToDOM(task);
        });
    }

    $('#newTaskButton').on('click', function() {
        const task = prompt('Enter your new task:');
        if (task) {
            addTaskToDOM(task);
            saveTasks();
        }
    });
});

function saveTasks() {
    const tasks = [];
    $('.todo-item').each(function() {
        tasks.push($(this).text());
    });
    setCookie('tasks', JSON.stringify(tasks), 7); 
}

function addTaskToDOM(task) {
    const taskDiv = $('<div></div>').addClass('todo-item').text(task);
    
    taskDiv.on('click', function() {
        if (confirm(`Do you want to delete this task: "${task}"?`)) {
            $(this).remove();
            saveTasks();
        }
    });
    
    $('#ft_list').prepend(taskDiv); 
}
