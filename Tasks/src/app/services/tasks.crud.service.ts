import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksCrudService {

  constructor() { }

  //Create n Update
  createTask(id_: number=0, complete_: boolean=false, title_: string="", priority_: string="low", dueDate_: string="", description_: string="", isUpdate: boolean=false): Observable<any> {
    type Task = {id: number; complete: boolean; title: string; priority: string; dueDate: string; description: string;};
    const tasks: Task[] = JSON.parse(localStorage.getItem("task") || "[]");
    if(isUpdate){
      let tempTask = tasks.find(task => task.id === Number(id_)) as Task; //Referencia más no copia
      tempTask.complete = complete_;
      tempTask.title = title_; 
      tempTask.priority = priority_;
      tempTask.dueDate = dueDate_;
      tempTask.description = description_;
    }else{
      tasks.push({id:id_, complete:complete_, title:title_, priority:priority_, dueDate:dueDate_, description:description_});
    }
    localStorage.setItem("task", JSON.stringify(tasks));
    return new Observable<any>();
  }
  //Read
  readTasks(): Observable<any> {
    const tasksString = localStorage.getItem("task") || "[]";
    const tasks = JSON.parse(tasksString);
    return of(tasks);
  }
  //Read by id
  readTask(id: number): Observable<any> {
    type Task = {id: number; title: string; priority: string; dueDate: string; description: string;};
    const tasksString = localStorage.getItem("task") || "[]";
    const tasks = JSON.parse(tasksString);
    const task = tasks.find((task: { id: number; }) => task.id === id) as Task;
    return of(task);
  }
  //Delete
  deleteTask(id: number): Observable<any> {
    const tasks = JSON.parse(localStorage.getItem("task") || "[]");
    const newTasks = tasks.filter((task: { id: number; }) => task.id !== id);
    localStorage.setItem("task", JSON.stringify(newTasks));
    return new Observable<any>();
  }
}