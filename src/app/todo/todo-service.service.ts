import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from './task.model';

const TASKS_LOCALSTORAGE_KEY = "tasks";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public tasks: Task[] = [];
  public timedTasks: Task[] = [];
  private interval = null;
  
  constructor() { }
  
  loadTasks(){
    this._loadTasks().subscribe(tasks => {this.tasks = tasks; this.extractTimedTask()});
  }
  
  private _loadTasks(): Observable<Task[]>{
    return of (this.getTasksFromLocalStorage());
  }

  addTask(task: Task){
    this.tasks.unshift(task);
    if(task.isTimed) this.prepareTimeTask(task);
    this.sortTasks();
    this.saveCurrentStatus();
  }

  updateTask(task: Task){
    if(task.isTimed) this.prepareTimeTask(task);
    
    this.sortTasks();
    this.saveCurrentStatus();
  }

  deleteTask(task: Task){
    this.tasks = this.tasks.filter(t => t != task );
    this.saveCurrentStatus();

    this.extractTimedTask();
  }

  private getMockTask(): Task[]{
    let {tasks} = this;

    for(let i = 0; i < 1000; i++){
      let task  = new Task();
      task.modified = Date.now();
      task.description = `Test Task ${i}`;
      task.dueDate = Date.now()+  (5 * 60 * 1000);
      task.completed = i%2 == 0;
      tasks.push(task);
    }
    return tasks;
  }

  private getTasksFromLocalStorage(): Task[]{
    let item = localStorage.getItem(TASKS_LOCALSTORAGE_KEY);

    if(item == null) return [];

    let _tasks = JSON.parse(item) as Task[];
    let tasks: Task[] = [];

    _tasks.forEach(task=> tasks.push(new Task(task)));

    tasks = tasks.sort(this.taskSorter);
    return tasks;
  }

  private extractTimedTask(){
    this.timedTasks = this.tasks.filter(t => {
      if(!t.isTimed || t.completed)
        return false;
      
      this.calcElapsedTime(t);
      return  Math.abs(t.elapsedTime) <= 300;
    });
    
    if(this.timedTasks.length > 0)
    {
      this.startTimedTaskJob();
    }
  }

  private startTimedTaskJob(){
    if(this.interval!= null)
        clearInterval(this.interval);
      
    this.interval = setInterval(this.timedTaskJob.bind(this),1000);
  }

  public saveCurrentStatus(){
    localStorage.setItem(TASKS_LOCALSTORAGE_KEY, JSON.stringify(this.tasks));
  }

  private timedTaskJob(){
    if(this.timedTasks.length > 0){
      this.timedTasks.forEach((element,index) => {
        if(element.completed) {
          this.timedTasks.slice(index,1);
          return;
        }
        this.calcElapsedTime(element);
      });
    }
  }

  private calcElapsedTime(task: Task){
    task.elapsedTime = Math.round((task.dueDate  - Date.now())/1000);
  }

  private sortTasks(){
    this.tasks = this.tasks.sort(this.taskSorter);
  }

  private taskSorter(t1:Task, t2:Task){
    if(t1.isTimed && t2.isTimed){
      return t1.dueDate < t2.dueDate ? -1: 1;
    }else{
      return t1.isTimed ? -1 : 1;
    }
  }

  private prepareTimeTask(task: Task){
    this.calcElapsedTime(task);
    
    if(Math.abs(task.elapsedTime) <= 300 && !this.timedTasks.some(t=> t == task)){
      this.timedTasks.push(task);
      this.startTimedTaskJob();
    }
  }
}