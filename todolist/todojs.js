const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById ('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');
let tasks;
let todiItemElems = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))
function Task(description) {
    this.description = description;
    this.completed = false;   
}
const createTemplate = (task,index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
     <div class="desc-wrap">
            <div class="description">${task.description}</div> </div>
            <div class="wrapper">
            <div class='buttons'>
            <input onClick='completeTask(${index})'  class='btn-complete' type='checkbox'${task.completed ? 'checked': ''}>
            <button onClick="deleteTask(${index})" class='btn-delete'>Delete</button>
            </div>
    </div>   
    </div> `
    
}
const filterTask = () => {
    const activeTask = tasks.length && tasks.filter (item => item.completed == false);
    const completedTask = tasks.length && tasks.filter (item => item.completed == true);
    tasks = [...activeTask, ...completedTask];
}
const fillHtmlList = () =>{
    todosWrapper.innerHTML = "" ;
    if(tasks.length >0) {
        filterTask();
        tasks.forEach((item,index)=> {
            todosWrapper.innerHTML += createTemplate(item,index);
            deskTaskInput.value = "" ;
        });
        todiItemElems = document.querySelectorAll('.todo-item');
    }
    
}
fillHtmlList();
const updateLocal = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
const completeTask = index => {
    console.log(index);
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed){
        todiItemElems[index].classList.add('checked');
    } else {
        todiItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}
addTaskBtn.addEventListener('click', ()=> {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
})
const deleteTask = index => {
tasks.splice(index, 1);
updateLocal();
fillHtmlList();
}


