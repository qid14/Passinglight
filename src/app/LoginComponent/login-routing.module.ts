import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from '../services/authguard';
// import { AuthService }          from './auth.service';
import { LoginComponent }       from './login.component';
import { LoginService } from '../services/login.service';
const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    LoginService
  ]
})
export class LoginRoutingModule {}