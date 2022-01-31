import { Component, OnInit } from '@angular/core';
import { Todo } from "../share/todo.model";
import { TodoService } from '../service/todo.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {
  dt = new Date();
  _id: number;
  newText = '';
  todos: Todo[] = [];
  day = this.dt.getFullYear()+'-'+(this.dt.getMonth()+1)+'-'+this.dt.getDate();

  constructor(private todoService: TodoService, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.newText = '';
    this.todoService.getAllTodo().subscribe(Res => this.todos = Res.data);
    this.calTodo();
  }

  addTodo(){
    console.log("작동중");
    if(this.newText.length >= 1){
      this.todoService.addTask({
        comment: this.newText,
        day: this.day
      }).subscribe();
      this.todos.push({
        _id: this._id,
        completed: false,
        comment: this.newText,
        day: this.day
      });
      this.newText = '';
      this.ngOnInit();
    }
  }

  calTodo(): number{
    if(this.todos.length === 0)
      return 0;
    else
      return this.todos.filter(data => !data.completed).length;
  }

  toggleTodo(todo:any){
    todo.completed = !todo.completed
  }

  deleteTodo(todo:any){
    this.todoService.deleteTodo(todo._id);
    this.ngOnInit();
  }

  deleteAll(){
    this.todos.forEach(todos => this.todoService.deleteTodo(todos._id));
    this.ngOnInit();
  }

  checkedAll(){
    if(this.todos.filter(data => !data.completed).length === 0){
      this.todos.forEach(data => data.completed = false);
    }
    else
      this.todos.forEach(data => data.completed = true);
  }

  deleteComplete(){
    let completeTask = this.todos.filter(data => data.completed);
    completeTask.forEach(todo => this.todoService.deleteTodo(todo._id));
    this.ngOnInit();
  }
}
