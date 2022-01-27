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
    this.todoService.getTodayTodo().subscribe((data) => this.todos = data);
  }

  addTodo(text: string){
    console.log("작동중");
    if(text.length >= 1){
      this.todoService.addTask({
        _id: this._id,
        completed: false,
        comment: text,
        day: this.day
      });
      this.todos.push({
        _id: this._id,
        completed: false,
        comment: text,
        day: this.day
      });
      this.ngOnInit();
    }


  }

  getTodo():void{
    this.http.get('/todo/day?day=' + this.day).subscribe((res)=>{
      console.log(res);
    })
  }
  calTodo(): number{
    return this.todos.filter(data => !data.completed).length;
  }

  // removeTodo(todo:any){
  //   let idx = this.todos.findIndex(function(item){
  //     return item._id === todo._id;
  //   });
  //   this.todos.splice(idx,1);
  // }
  //
  // toggleTodo(todo:any){
  //   todo.completed = !todo.completed
  // }
  //
  // removeAll(todos:any){
  //   this.todos.splice(0,this.todos.length);
  // }
  //
  checkedAll(todos:any){
    if(this.todos.filter(data => !data.completed).length === 0)
      this.todos.forEach(data => data.completed = false);
    else
      this.todos.forEach(data => data.completed = true);
  }
  //
  // deleteComplete(todos:any){
  //
  // }
}
