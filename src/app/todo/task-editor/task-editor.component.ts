import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Task } from '../task.model';


@Component({
  selector: 'task-editor',
  templateUrl: './template/task-editor.component.html',
  styleUrls: ['./template/task-editor.component.less']
})
export class TaskEditorComponent implements OnInit {
  @Input() task: Task;
  @Input() hideControls: boolean;
  @Output() onSave = new EventEmitter<Task>();
  @ViewChild("DI") descriptionInput: ElementRef;

  isEditing: boolean  = true;
  private lastDurationTime = 0;

  constructor() { }

  get isValid():boolean{
    return this.task.description.length > 5;
  }

  ngOnInit() {
    
    if(this.task == null)
    {
      this.isEditing = false;
      this.task = new Task();
    }
      
    if(this.hideControls == null)
      this.hideControls = false;

    this.lastDurationTime = this.task.duration;
  }

  save(){
    if(this.lastDurationTime != this.task.duration)
    {
      this.task.recalculateRelativetime();
      this.lastDurationTime = this.task.duration
    }
    
    this.onSave.emit(this.task);

    if(!this.isEditing)
      this.task = new Task();
  }

  handleKeyboardSubmit($event):void {
    if($event.keyCode == 13 && this.isValid){
      this.save();
    }
  }

  focusOnInput(){
    this.descriptionInput.nativeElement.focus();
  }

}
