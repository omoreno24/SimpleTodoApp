import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../task.model';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'todo-list',
  templateUrl: './template/todo-list.component.html',
  styleUrls: ['./template/todo-list.component.less']
})
export class TodoListComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() title: string;

  get hasTask(): boolean{
    return this.tasks.length > 0;
  }

  constructor(private taskService: TodoService) { }

  ngOnInit() {
  }

  deleteTask(task:Task) {
    this.taskService.deleteTask(task);
  }

  updateTask(task: Task){
    this.taskService.updateTask(task);
  }
}
