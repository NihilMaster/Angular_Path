import { TasksCrudService } from './services/tasks.crud.service'; // Servicio
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, AfterViewInit, OnDestroy, Input} from '@angular/core'; // Lifecycle hooks
import { ElementRef, Renderer2 } from '@angular/core'; // Gestión del DOM
import { CommonModule } from '@angular/common'; // Necesario para implementar angular en el HTML
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms'; // Formularios reactivos
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit ,/*OnChanges,*/ DoCheck, AfterViewInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private timeoutId: any;

  tasks : any[] = [];
  form : FormGroup;
  updateTime : boolean = false;
  updateId : number = 0;
  //@Input() filterValue: string = 'all';  // Para detectar cambios con ngOnChanges
  filterValue: string = 'all';
  alertModal : boolean = false;
  shownModal : boolean = false;
  errorModal : boolean = false;

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

  // Lifecycle hooks
  //  Init
  ngOnInit() {
    this.readTasks();
  }
  //  Check
  ngDoCheck(): void {
    this.tasksCrudService.CheckIfAllTasksCompleted().subscribe({
      next: (allCompleted) => {
        if (allCompleted &&!this.shownModal) {
          this.alertModal = true;
          this.shownModal = true;
        }
      }
    });
  }
  // AfterView
  ngAfterViewInit(): void {
    const createTasksBttn = this.elementRef.nativeElement.querySelector('#createTaskButton');
    const filterTasksSlct =  this.elementRef.nativeElement.querySelector('#taskFilter');
    setTimeout(() => { // Evitar que el usuario cree o filtre tareas mientras se cargan
      createTasksBttn.removeAttribute('disabled');
      filterTasksSlct.removeAttribute('disabled');
    }, 2000)
  }
  // Destroy
  ngOnDestroy(): void {
    localStorage.setItem('task', JSON.stringify(this.tasks)); // Guardar cambios no guardados
    this.subscriptions.unsubscribe(); // Cancelar subscripciones
    if (this.timeoutId) { // Limpiar setTimeout
      clearTimeout(this.timeoutId);
    }
  }
  //  Change
  onFilterChange() {
    this.filterTasks(this.filterValue);
  }

  //Create n Update
  createTask(): void{
    const { title, priority, dueDate, description } = this.form.value;
    if([title, priority, dueDate, description].every(field => field !== null && field !== '')){
      const id = (this.updateTime) ? this.updateId : parseInt(this.generateId());
      const complete = false;
      this.tasksCrudService.createTask(id, complete, title, priority, dueDate, description, this.updateTime).subscribe({});
      this.readTasks();
      this.shownModal = false;
    }else{
      this.errorModal = true;
    }
  }

  //Read
  readTasks(): void{
    this.tasksCrudService.readTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  //Delete
  deleteTask(id : number): void{
    if(window.confirm("Are you sure you want to delete this task?")){
      this.tasksCrudService.deleteTask(id).subscribe({});
      this.readTasks();
    }
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
          this.shownModal = false;
        }else{
          this.renderer.removeClass(element, 'completed');
          this.renderer.removeClass(element, 'bg-secondary');
          this.renderer.addClass(element, 'uncompleted');
          this.tasksCrudService.createTask(task.id, !task.complete, task.title, task.priority, task.dueDate, task.description, true);
          this.alertModal = false;
        }
      }
    });
  }

  //Filter
  filterTasks(filterEvent: string): void {
  //filterTasks(event: any): void {
    //const filterEvent = event.target.value;
    if(filterEvent == "all"){
      this.readTasks();
    }else if(filterEvent == "complete"){
      this.readTasks();
      this.tasks = this.tasks.filter(task => task.complete);
    }else if(filterEvent == "pending"){
      this.readTasks();
      this.tasks = this.tasks.filter(task => !task.complete);
    }
  }

  closeModal(): void{
    this.alertModal = false;
    this.errorModal = false;
  }

}