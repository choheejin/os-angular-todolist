import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../../share/todo.model";

@Component({
  selector: 'app-add-todo',
  template: `
    <button (click)="addTodo(newText)">+</button>
    <input type="text" placeholder="할 일 추가" [(ngModel)]="newText">
    <hr align="left" />

  `,
  styles: [`
    button{
      width: 30px;
      height: 30px;
      border-radius: 30px;
      margin-right: 5px;
      border: none;
      background-color: blueviolet;
      color: white;
      font-weight: bold;
      font-size: 19px;
    }
    input{
      height: 30px;
      display: inline-block;
      font-size: 18px;
      margin-bottom: 10px;
    }

    hr{
      color: darkgray;
      width : 50%;
    }
    `
  ]
})
export class AddTodoComponent implements OnInit {
  @Output() onTodoAdded = new EventEmitter();
  newText: string;

  constructor() { }

  ngOnInit(): void {
  }
  addTodo(newText:string){
    this.onTodoAdded.emit(newText)
    this.newText = '';
  }


}
