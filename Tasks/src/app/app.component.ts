import { TasksCrudService } from './services/tasks.crud.service'; // Servicio
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para implementar angular en el HTML

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  tasks : any[] = [];

  constructor(private tasksCrudService: TasksCrudService) { }

  ngOnInit() {
    this.readTasks();
  }

  //Read
  readTasks(): void{
    this.tasksCrudService.readTasks().subscribe({
      next: (tasks) => {
        console.log(tasks);
        this.tasks = tasks;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  createTask(id : number, title : string, priority : string, dueDate : string, description : string): void{
    this.tasksCrudService.createTask(id, title, priority, dueDate, description).subscribe(() => {});
  }

  updateTask(id : number, title : string, priority : string, dueDate : string, description : string): void{
    this.tasksCrudService.updateTask(id, title, priority, dueDate, description).subscribe(() => {});
  }

  deleteTask(id : number): void{
    this.tasksCrudService.deleteTask(id).subscribe(() => {});
  }

  title = 'Tasks';
}
