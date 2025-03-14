import { Component, OnInit } from '@angular/core';
import { ErrorComponentChild } from './error-child.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ErrorComponentChild],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{
  isContentReady = false;

  ngOnInit() {
    setTimeout(() => {
      this.isContentReady = true;
    }, 10000);
  }
}
