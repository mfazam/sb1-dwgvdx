import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p>&copy; 2024 Secure Angular SPA. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    footer {
      background-color: #f5f5f5;
      padding: 10px;
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  `]
})
export class FooterComponent {}