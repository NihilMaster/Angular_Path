import { TasksCrudService } from './services/tasks.crud.service'; // Servicio
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para implementar angular en el HTML
import { ReactiveFormsModule } from '@angular/forms'; // Formularios reactivos
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  tasks : any[] = [];
  form : FormGroup;
  updateTime : boolean = false;
  updateId : number = 0;

  constructor(private tasksCrudService: TasksCrudService, 
              private renderer: Renderer2,
              private elementRef: ElementRef
  ) {
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

  //Create n Update
  createTask(): void{
    const { complete, title, priority, dueDate, description } = this.form.value;
    const id = (this.updateTime) ? this.updateId : parseInt(this.generateId());
    this.tasksCrudService.createTask(id, complete, title, priority, dueDate, description, this.updateTime).subscribe({});
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

  //Delete
  deleteTask(id : number): void{
    this.tasksCrudService.deleteTask(id).subscribe({});
    this.readTasks();
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

  toggleButton(id: number): void{
    this.updateId = id;
    this.updateTime = true;
    this.tasksCrudService.readTask(id).subscribe({
      next: (task) => {
        this.form.setValue({
          title: task.title,
          priority: task.priority,
          dueDate: task.dueDate,
          description: task.description
        });
      }
    });
  }

  //Complete
  toggleCompleteTask(id: number): void{
    this.tasksCrudService.readTask(id).subscribe({
      next: (task) => {
        const element = this.elementRef.nativeElement.querySelector(`#task${id}`);
        if(task.complete != true){
          this.renderer.removeClass(element, 'uncompleted');
          this.renderer.addClass(element, 'completed');
          this.renderer.addClass(element, 'bg-secondary');
          this.tasksCrudService.createTask(task.id, !task.complete, task.title, task.priority, task.dueDate, task.description, true);
        }else{
          this.renderer.removeClass(element, 'completed');
          this.renderer.removeClass(element, 'bg-secondary');
          this.renderer.addClass(element, 'uncompleted');
          this.tasksCrudService.createTask(task.id, !task.complete, task.title, task.priority, task.dueDate, task.description, true);
        }
      }
    });
  }


}
