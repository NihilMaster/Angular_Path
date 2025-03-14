import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  protected isContentReady = false;

  ngOnInit() {
    setTimeout(() => {
      this.isContentReady = true;
    }, 4600);
  }
}
