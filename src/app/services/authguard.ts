import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let data = localStorage.getItem('token')
        if (data) {
            // logged in so return true
            let role = this.jwtHelper.decodeToken(data).role;
            console.log('mmmmmmmmmm', role, typeof role);
            //默认role 为 null
            if (role == 'admin') {
                return true;
            }

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
