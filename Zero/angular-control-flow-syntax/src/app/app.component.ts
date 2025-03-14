import { Component } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';
import { ForComponent } from './for/for.component';
import { IfComponent } from './if/if.component';
import { DeferComponent } from './defer/defer.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoadingComponent } from './loading/loading.component';
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';
// import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  imports: [
    ForComponent,
    IfComponent,
    DeferComponent,
    PlaceholderComponent,
    LoadingComponent,
    SwitchComponent,
    AdvancedDeferComponent,
    // ErrorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
