import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksCrudService {

  constructor() { }

  //Create
  //localStorage.setItem("task", JSON.stringify([{id: 1, title: "Task 1", priority: "low", dueDate: "2026-01-01", description: "This is a task"}]));
  createTask(id: number=0, title: string="", priority: string="low", dueDate: string="", description: string=""): Observable<any> {
    const task = [{id: 1, title: "Task 1", priority: "low", dueDate: "2026-01-01", description: "This is a task"}]
    localStorage.setItem("task", JSON.stringify(task));
    return new Observable<any>();
  }
  //Read
  readTasks(): Observable<any> {
    const tasksString = localStorage.getItem("task") || "[]";
    const tasks = JSON.parse(tasksString);
    console.log(tasks);
    return of(tasks);
  }
  //Update
  updateTask(id: number, title: string, priority: string, dueDate: string, description: string): Observable<any> {
    const task = [{id: 1, title: "Task 1", priority: "low", dueDate: "2026-01-02", description: "This is a task" }]
    localStorage.setItem("task", JSON.stringify(task));
    return new Observable<any>();
  }
  //Delete
  deleteTask(id: number): Observable<any> {
    localStorage.removeItem("task");
    return new Observable<any>();
  }
}
