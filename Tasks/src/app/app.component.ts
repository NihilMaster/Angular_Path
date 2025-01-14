import { TasksCrudService } from './services/tasks.crud.service'; // Servicio
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para implementar angular en el HTML
import { ReactiveFormsModule } from '@angular/forms'; // Formularios reactivos
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  tasks : any[] = [];
  form : FormGroup;

  constructor(private tasksCrudService: TasksCrudService) {
    this.form = new FormGroup({
      title: new FormControl(''),
      priority: new FormControl(''),
      dueDate: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit() {
    this.readTasks();
  }

  //Create
  //id : number, title : string, priority : string, dueDate : string, description : string
  createTask(): void{
    const { title, priority, dueDate, description } = this.form.value;
    const id = parseInt(this.generateId());
    this.tasksCrudService.createTask(id, title, priority, dueDate, description).subscribe({});
    this.readTasks();
  }

  //Read
  readTasks(): void{
    this.tasksCrudService.readTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateTask(id : number, title : string, priority : string, dueDate : string, description : string): void{
    this.tasksCrudService.updateTask(id, title, priority, dueDate, description).subscribe(() => {});
  }

  deleteTask(id : number): void{
    this.tasksCrudService.deleteTask(id).subscribe(() => {});
  }

  generateId(): string{
    let id = localStorage.getItem("idCounter");
    if (id == null) {
      localStorage.setItem("idCounter", "0");
      id = "0";
    }else{
      localStorage.setItem("idCounter", (parseInt(id) + 1).toString());
      id = (parseInt(id) + 1).toString();
    }
    return id;
  }

  title = 'Tasks';
}
