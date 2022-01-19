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
      {completed: false, comment: "운동하기", important:false, day: this.today.toLocaleDateString()},
      {completed: false, comment: "공부하기", important:false, day: this.today.toLocaleDateString()}
    ]
  }

  ngOnInit(): void {
  }

  addTodo(text: string){
    this.todos.push({
      completed: false,
      comment: text,
      important: false,
      day: this.today.toLocaleDateString(),
    });
  }

  calTodo(): number{
    return this.todos.filter(task => !task.completed).length;
  }
}
