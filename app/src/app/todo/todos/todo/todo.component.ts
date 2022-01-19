import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../share/todo.model";

@Component({
  selector: 'app-todo',
  template: `
    <input class="done" type="checkbox" [ngClass]="{completed: todo.completed}" [(ngModel)]="todo.completed" (click)="toggleTodo(todo)">
    <label (click)="toggleTodo(todo)">{{todo.comment}}</label>
    <input class="star" type="checkbox" [ngClass]="{important: todo.important}" [(ngModel)]="todo.important" (click)="toggleImportant(todo)">
  `,
  styles: [`
    .done {
      margin-right: 5px;
    }

    label{
    }

    .star{
      float: right;
    }

    .done:checked + label {
      text-decoration: line-through;
    }

  `
  ]
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;

  constructor() { }

  ngOnInit(): void {
  }

  toggleImportant(todo:any){
    todo.important = !todo.important
  }
  toggleTodo(todo:any){
    todo.completed = !todo.completed
  }

}
