import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TaskEditorComponent } from './task-editor/task-editor.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoAppComponent,
    TaskEditorComponent
  ]
})
export class TodoModule { }