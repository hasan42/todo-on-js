"use strict";

let todoList = [
  { id: 1, text: 'Work 1', active: true },
  { id: 2, text: 'Work 2', active: true },
  { id: 3, text: 'Work 3', active: false },
];

class Todo {

  todos = []; // array todo
  listTodo = null; // element list

  formAdd = null; // form add
  formAddInput = null; // form add input
  formAddBtn = null; //form add btn

  constructor(list) {
    this.todos = list;
  }

  start() {
    this.createList();
    this.createForm();
  }

  createList(){
    this.listTodo = document.getElementById("todo-list");
    this.todos.forEach((todo)=>{
      
      this.listTodo.append( this.addTodoListItem(todo) );
    });
  }

  addTodoListItem(todo){
    let elem = document.createElement('li');
    elem.append(`${todo.id} ${todo.text}`);

    let delBtn = document.createElement('button');
    delBtn.append('del');
    delBtn.addEventListener('click',this.onClickDelTodo.bind(this,{id:todo.id, elem:elem}));
    elem.append(delBtn);

    let editBtn = document.createElement('button');
    editBtn.append('edit');
    editBtn.addEventListener('click',this.onClickEditTodo.bind(this,{id:todo.id, elem:elem}));
    elem.append(editBtn);

    if(todo.active === false){
      elem.classList.add('no-active');
    }
    elem.addEventListener('click',this.onClickTodo.bind(this, {id:todo.id, elem:elem}));

    return elem;
    
  }

  onClickTodo(params){
    params.elem.classList.toggle('no-active');
    let todo = this.todos.find((todo)=>todo.id===params.id);
    todo.active = !todo.active;
  }
  onClickDelTodo(params){
    let todo = this.todos.findIndex((todo)=>todo.id===params.id);
    this.todos.splice(todo, 1);
    params.elem.remove();
    event.stopPropagation();
  }
  onClickEditTodo(params){
    event.stopPropagation();
  }

  createForm(){
    this.formAdd = document.getElementById("todo-add");
    this.formAddInput = document.getElementById("addTodoText");
    this.formAddBtn = document.getElementById("addTodoBtn");

    this.formAddBtn.addEventListener('click',this.onClickAddNewTodo.bind(this));
    this.formAddInput.addEventListener('keyup',(event)=>{
      if (event.keyCode === 13) {
        this.onClickAddNewTodo.call(this);
      }
    });
  }

  onClickAddNewTodo(){
    let newTodoText = this.formAddInput.value.trim();
    if(this.formAddInput.value.length <= 0){
      let errorMsg = document.querySelector('.error-msg');
      if(!errorMsg){
        errorMsg = document.createElement('p');
        errorMsg.classList.add('error-msg');
        errorMsg.append('Error: Text is empty!');
        this.formAdd.append(errorMsg);
      }
      return;
    }else{
      let errorMsg = document.querySelector('.error-msg');
      if(errorMsg){
        errorMsg.remove();
      }
    }

    let newTodoId = this.getMaxId() + 1;

    let obj = {
      id: newTodoId,
      text: newTodoText, 
      active: true
    };

    this.formAddInput.value = '';
    this.formAddInput.blur();

    this.todos.push(obj);
    this.listTodo.append( this.addTodoListItem(obj) );
  }

  getMaxId(){
    let maxId = Math.max.apply(Math, this.todos.map(item => item.id));
    maxId = maxId == -Infinity ? 0 : maxId;
    return maxId;
  }

}

let todo = new Todo(todoList);
todo.start();