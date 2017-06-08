/*import { Injectable }             from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { LoginService }            from './login.service';

@Injectable()
export class loginAuth implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    // Not using but worth knowing about
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.loginService.isLoggedIn) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}*/


 