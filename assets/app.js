"use strict";

let todoList = [
  { id: 1, text: 'Work 1', active: true },
  { id: 2, text: 'Work 2', active: true },
  { id: 3, text: 'Work 3', active: false },
];

class Todo {

  todos = []; // array todo
  listTodo = null; // element list

  constructor(list) {
    this.todos = list;
  }

  start() {
    this.createList();
  }

  createList(){
    this.listTodo = document.getElementById("todo-list");
    this.todos.forEach((todo)=>{
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
      this.listTodo.append(elem);
    });
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
    console.log(this);
    event.stopPropagation();
  }
  onClickEditTodo(params){
    console.log(this)
    event.stopPropagation();
  }

}

let todo = new Todo(todoList);
todo.start();