import { Component, OnInit } from '@angular/core';
import {Todo} from "../share/todo.model";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  newText = '';
  todos: Todo[];
  today = new Date();

  constructor() {
    this.todos = [
      {_id: 1, completed: false, comment: "운동하기", important:false, day: this.today.toLocaleDateString()},
      {_id: 2, completed: false, comment: "공부하기", important:false, day: this.today.toLocaleDateString()}
    ]
  }

  ngOnInit(): void {
  }

  addTodo(text: string){
    if(text.length >= 1)
      this.todos.push({
        _id: this.todos.length,
        completed: false,
        comment: text,
        important: false,
        day: this.today.toLocaleDateString(),
      });
  }

  calTodo(): number{
    return this.todos.filter(task => !task.completed).length;
  }

  removeTodo(todo:any){
    let idx = this.todos.findIndex(function(item){
      return item._id === todo._id;
    });
    this.todos.splice(idx,1);
  }

  toggleTodo(todo:any){
    todo.completed = !todo.completed
  }

  removeAll(todos:any){
    this.todos.splice(0,this.todos.length);
  }

  checkedAll(todos:any){
    document.querySelectorAll('.check').forEach((item) => item.setAttribute("checked", "true"));
  }

  deleteComplete(todos:any){

  }
}
