import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <span>Secure Angular SPA</span>
      <span class="spacer"></span>
      <button mat-button *ngIf="authService.isLoggedIn()" (click)="logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}