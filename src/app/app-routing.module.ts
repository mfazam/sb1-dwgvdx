import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuperUserComponent } from './components/super-user/super-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { AppSupportComponent } from './components/app-support/app-support.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'super-user', 
    component: SuperUserComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'SuperUser' } 
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'Admin' } 
  },
  { 
    path: 'app-support', 
    component: AppSupportComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'AppSupport' } 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }