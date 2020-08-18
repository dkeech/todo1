// disallow empty input
// uncheck checked todo from localStorage


const input = document.querySelector('#todo').value;
const form = document.querySelector('#todo-form');
const ready = document.querySelector('#readyTodos');
var checkbox = document.querySelector('input[name=checkbox]');
var done = document.querySelector('#doneTodos');


loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', getTodos);
}

function addTodo(e) {
    let todoInput = document.querySelector('#todo').value;
    let newTodo = document.createElement('p');
    newTodo.classList.add('readyTodo');
    
    let l = document.createElement('label');
    let cb = document.createElement('input');
    cb.type="checkbox";
    cb.name="checkbox";
    cb.dataset.value=todoInput;
    cb.addEventListener('click', e => {
        moveToOtherContainer(e);
    });
    let s = document.createElement('span');
    s.textContent = todoInput;

    newTodo.appendChild(l);
    l.appendChild(cb);
    l.appendChild(s);
    ready.appendChild(newTodo);

    storeLocal(todoInput);

    document.querySelector('#todo').value = '';
    e.preventDefault()
}

function storeLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todos);
    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function storeDone(todo){
    let localDone;
    console.log(localDone);
    if(localStorage.getItem('done') === null){
        localDone = [];
    } else {
        localDone = JSON.parse(localStorage.getItem('done'));
    }
    console.log(localDone);
    localDone.push(todo);
    console.log(localDone)
    localStorage.setItem('done', JSON.stringify(localDone));
}

function moveToOtherContainer(e) {
    if(e.target.parentNode.parentNode.parentNode.isEqualNode(ready)){
        console.log(e.target.dataset.value);
        storeDone(e.target.dataset.value);
        done.appendChild(e.target.parentNode.parentNode);
        removeFromLocal('todos', e.target.dataset.value);
    } else {
        console.log("storeLocal " + e.target.dataset.value);
        storeLocal(e.target.dataset.value);//write this function
        ready.appendChild(e.target.parentNode.parentNode);
        removeFromLocal('done', e.target.dataset.value);
    }
}

function removeFromLocal(type, value){
    array = JSON.parse(localStorage.getItem(type));
    // console.log(array);
    const index = array.indexOf(value);
    console.log(`index of ${value} is ${index}`)
    if(index > -1){
        array.splice(index, 1);
    }
    console.log(`array ${type} is ${array}`)
    localStorage.setItem(type, JSON.stringify(array));
}

function getTodos(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        let todoInput = todo;
        let newTodo = document.createElement('p');
        newTodo.classList.add('readyTodo')
        let l = document.createElement('label');
        let cb = document.createElement('input');
        cb.type="checkbox";
        cb.name="checkbox";
        cb.dataset.value=todoInput;
        cb.addEventListener('click', e => {
            moveToOtherContainer(e);
        });
        let s = document.createElement('span');
        s.textContent = todoInput;
    
        newTodo.appendChild(l);
        l.appendChild(cb);
        l.appendChild(s);
        ready.appendChild(newTodo);
        
        document.querySelector('#todo').value = '';
    }); 
}