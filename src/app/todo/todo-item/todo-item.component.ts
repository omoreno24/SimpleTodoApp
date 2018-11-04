import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Task } from '../task.model';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'todo-item',
  templateUrl: './template/todo-item.component.html',
  styleUrls: ['./template/todo-item.component.less'],
  inputs:[]
})
export class TodoItemComponent implements OnInit {
  private dataBk:Task = new Task();

  @Input() task: Task;
  @Input() editMode: boolean = false;
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onSave = new EventEmitter<Task>();
  @ViewChild("editor") editor: TaskEditorComponent;

  constructor() { }

  ngOnInit() {  }

  public toggleComplete(){
    let {task} = this;

    task.completed = !task.completed;
    task.completionDate = task.completed ? Date.now() : 0;

    this.onEdit();
  }

  public deleteTask($event){
    if(confirm(`this task is going to be deleted, This action can not be undone.`))
      this.onDelete.emit(this.task);
  }

  public saveTask(){
    this.editor.save();
  }

  public editTask($event)
  {
    Object.assign(this.dataBk, this.task);
    this.editMode = true;
  }

  public onEdit(){
    this.editMode = false;
    this.onSave.emit(this.task);
  }

  public cancelEdit(){
    Object.assign(this.task, this.dataBk);
    this.editMode = false;
  }
}
