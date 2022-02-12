import { Component, OnInit } from '@angular/core';
import { Todo } from "../share/todo.model";
import { TodoService } from '../service/todo.service';

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
  editIdx : number;
  editText = '';
  day = this.dt.getFullYear()+'-'+(this.dt.getMonth()+1)+'-'+this.dt.getDate();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.editIdx = 0;
    this.editText = '';
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
    this.todoService.editTodo({
      comment: todo.comment,
      _id: todo._id,
      completed: !todo.completed
    }).subscribe();
  }

  deleteTodo(todo:any){
    this.todoService.deleteTodo(todo._id).subscribe();
    this.todos = this.todos.filter(item => item._id !== todo._id);
  }

  deleteAll(){
    this.todos.forEach(todos => this.todoService.deleteTodo(todos._id));
    this.ngOnInit();
  }

  checkedAll(){
    let setCompleted = this.todos.filter(data => !data.completed);
    if(setCompleted.length === 0){
      this.todos.forEach(data => this.todoService.makeCompleted({
        _id: data._id,
        completed: false
      }).subscribe());
    }
    else
      this.todos.forEach(data => this.todoService.makeCompleted({
        _id: data._id,
        completed: true
      }).subscribe());
    this.ngOnInit();
  }

  deleteComplete(){
    let completeTask = this.todos.filter(data => data.completed);
    completeTask.forEach(todo => this.todoService.deleteTodo(todo._id));
    this.ngOnInit();
  }

  getTodayTodo(){
    this.todoService.getTodayTodo(this.day).subscribe(data => console.log(data));
  }

  editTodo(todo:any){
    const edit = document.getElementById("edit");
    if (!edit) return;
    edit.style.display = 'block';
    this.editIdx = todo._id;
  }

  submitEdit(){
    const edit = document.getElementById("edit");
    if (!edit) return;
    this.todoService.editTodo({
      comment: this.editText,
      _id: this.editIdx,
      completed: false
    }).subscribe();
   this.editText = '';
   this.editIdx = 0;
   edit.style.display = 'none';
   location.reload();
  }
}
