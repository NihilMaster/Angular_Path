import { Component } from '@angular/core';

@Component({
  selector: 'app-advanced-defer',
  standalone: true,
  imports: [],
  templateUrl: './advanced-defer.component.html',
  styleUrl: './advanced-defer.component.scss'
})
export class AdvancedDeferComponent {
  protected dataReady = true;
}
