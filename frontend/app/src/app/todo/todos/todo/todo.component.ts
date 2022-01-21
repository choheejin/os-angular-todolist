import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../share/todo.model";

@Component({
  selector: 'app-todo',
  template: `
    <input class="done" type="checkbox"  (click)="toggleTodo(todo)">
    <label (click)="toggleTodo(todo)">{{todo.comment}}</label>
  `,
  styles: [`
    .done {
      margin-right: 5px;
    }

    label{
    }

    .remove{
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

  toggleTodo(todo:any){
    todo.completed = !todo.completed
  }

}
