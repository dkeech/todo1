// disallow empty input



const input = document.querySelector('#todo').value;
const form = document.querySelector('#todo-form');
const ready = document.querySelector('#readyTodos');
var checkbox = document.querySelector('input[name=checkbox]');
var done = document.querySelector('#doneTodos');
const clearTodos = document.querySelector('#clearTodos');
const clearDone = document.querySelector('#clearDone');
const makeDelete = () => {
    let d =  document.createElement('a');
    d.innerHTML = '<i class = "black-text material-icons right">delete_forever</i>';
    d.className = 'delete-link secondary content';
    return d;
}



loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', getTodos);
    document.addEventListener('DOMContentLoaded', getDone);
    document.addEventListener('click', removeTodo);
    clearTodos.addEventListener('click', removeTodos);
    clearDone.addEventListener('click', removeDone);
}

function addTodo(e) {
    let todoInput = document.querySelector('#todo').value;
    if(todoInput == ''){
        M.toast({html: 'Please enter a todo'});
        e.preventDefault();
    } else {
        let newTodo = document.createElement('div');
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

        d = makeDelete();
        newTodo.appendChild(d);
        
        ready.insertBefore(newTodo, clearTodos);
        ready.classList.remove('hide');
        storeLocal(todoInput);

        document.querySelector('#todo').value = '';
        e.preventDefault()
    }
        
}

function storeLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function storeDone(todo){
    let localDone;
    if(localStorage.getItem('done') === null){
        localDone = [];
    } else {
        localDone = JSON.parse(localStorage.getItem('done'));
    }
    localDone.push(todo);
    localStorage.setItem('done', JSON.stringify(localDone));
}

function moveToOtherContainer(e) {
    if(e.target.parentNode.parentNode.parentNode.isEqualNode(ready)){
        storeDone(e.target.dataset.value);
        done.insertBefore(e.target.parentNode.parentNode, clearDone);
        removeFromLocal('todos', e.target.dataset.value);
        done.classList.remove('hide');
    } else {
        storeLocal(e.target.dataset.value);//write this function
        ready.insertBefore(e.target.parentNode.parentNode, clearTodos);
        removeFromLocal('done', e.target.dataset.value);
        ready.classList.remove('hide');
    }
}

function removeFromLocal(type, value){
    array = JSON.parse(localStorage.getItem(type));
    const index = array.indexOf(value);
    if(index > -1){
        array.splice(index, 1);
    }
    if(array.length == 0){
        type == 'todos' ? ready.classList.add('hide') : done.classList.add('hide');
    }
    localStorage.setItem(type, JSON.stringify(array));
}

function getTodos(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    if(todos.length > 0){ready.classList.remove('hide');}
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
        d = makeDelete();    
        newTodo.appendChild(l);
        l.appendChild(cb);
        l.appendChild(s);
        newTodo.appendChild(d);
        ready.insertBefore(newTodo, clearTodos); 
    }); 
}

function getDone(){
    if(localStorage.getItem('done') === null){
        localDone = [];
    } else {
        localDone = JSON.parse(localStorage.getItem('done'));
    }
    if(localDone.length > 0) {done.classList.remove('hide');}
    localDone.forEach(task => {
        let todoInput = task;
        let newTodo = document.createElement('p');
        newTodo.classList.remove('readyTodo')
        let l = document.createElement('label');
        let cb = document.createElement('input');
        cb.type="checkbox";
        cb.name="checkbox";
        cb.dataset.value=todoInput;
        cb.checked = true;
        cb.addEventListener('click', e => {
            moveToOtherContainer(e);
        });
        let s = document.createElement('span');
        s.textContent = todoInput;
        
        d=makeDelete();
        newTodo.appendChild(l);
        l.appendChild(cb);
        l.appendChild(s);
        newTodo.appendChild(d)
        done.insertBefore(newTodo, clearDone);
   }); 
}

function removeTodo(e){
    if(e.target.parentElement.classList.contains('delete-link')){
        let type = (e.target.parentElement.parentElement.parentElement.id === 'readyTodos') ? "todos" : "done";
        let value = e.target.parentElement.parentElement.firstChild.firstChild.dataset.value;
        
        // console.log(e.target.parentElement.parentElement.firstChild.firstChild.dataset.value);
        removeFromLocal(type, value);
        e.target.parentElement.parentElement.remove();
        
    }
}

function removeTodos(e){
    while(document.querySelector('#readyTodos').firstChild.nextElementSibling.nextElementSibling.classList.contains('readyTodo')){
        document.querySelector('#readyTodos').firstChild.nextElementSibling.nextElementSibling.remove();
    }
    localStorage.setItem('todos', '[]');
    document.querySelector('#readyTodos').classList.add('hide');
    e.preventDefault
}

function removeDone(e){
    while(document.querySelector('#doneTodos').firstChild.nextElementSibling.nextElementSibling.nodeName == 'P'){
        document.querySelector('#doneTodos').firstChild.nextElementSibling.nextElementSibling.remove();
    }
    localStorage.setItem('todos', '[]');
    document.querySelector('#doneTodos').classList.add('hide');
    e.preventDefault;
}