import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TodosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TodosComponent
  ]
})

export class TodoModule { }
