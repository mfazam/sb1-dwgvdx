import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .container {
      padding: 20px;
      min-height: calc(100vh - 128px); /* Adjust based on header and footer height */
    }
  `]
})
export class AppComponent {
  title = 'Secure Angular SPA';
}