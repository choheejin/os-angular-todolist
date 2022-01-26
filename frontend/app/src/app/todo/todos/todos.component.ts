import { Component, OnInit } from '@angular/core';
import { Todo } from "../share/todo.model";
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  newText = '';
  todos: Todo[] = [];
  today = new Date();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    // this.todoService
    //   .getTodayTodo()
    //   .subscribe(data => this.todos = data);
  }

  addTodo(text: string){
    if(text.length >= 1)
      // this.todoService.addTask({_id: this.})
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
