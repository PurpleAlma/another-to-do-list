//SELECTORS
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//EVENT LISTENERS
window.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click', filterTodo)


//Fun ctions

 

function addTodo(event) {
    event.preventDefault()
    //creating todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creating list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value)
    //check button
    const completedButton = document.createElement("button");
    completedButton.innerText = 'C'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button')
    trashButton.innerText = 'D'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    //append to list
    todoList.appendChild(todoDiv)
    //clear todo input value
    todoInput.value="";
}

function deleteCheck(e){
    const item=e.target;
    if(item.classList[0]=="trash-btn"){
        const todo=item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',()=>todo.remove())
   
    }
    if (item.classList[0]=='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos=todoList.childNodes
    todos.forEach((todo)=>{switch(e.target.value){
        case"all":todo.style.display="flex";
            break
        case"completed":
            todo.classList.contains('completed') ? todo.style.display='flex':todo.style.display='none';
            break;
        case "uncompleted":
            !todo.classList.contains('completed') ? todo.style.display='flex':todo.style.display='none';
            break;
    }
    })
}

function saveLocalTodos(todo){
    //check if there is something in there
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){ 
    console.log('sds')
    //check if there is somn
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //creating list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //add todo to local storage
        //check button
        const completedButton = document.createElement("button");
        completedButton.innerText = 'C'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button')
        trashButton.innerText = 'D'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        //append to list
        todoList.appendChild(todoDiv)
    });
};

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos')===null){
        todos=[]
    }else{
        todos= JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos))
}

