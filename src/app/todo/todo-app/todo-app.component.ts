import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'todo-app',
  templateUrl: './template/todo-app.component.html',
  styleUrls: ['./template/todo-app.component.less']
})
export class TodoAppComponent implements OnInit {
  public today: Number = Date.now();
  public newTask: Task = new Task();

  get tasks(): Task[]{
    return this.taskService.tasks;
  }
  constructor(private taskService: TodoService) {}

  get pendingTasks(): Task[]{
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks(): Task[]{
    return this.tasks.filter(task => task.completed);
  }

  ngOnInit() {
    this.taskService.loadTasks();
  }

  addTask(task: Task){
    this.taskService.addTask(task);
  }
}
