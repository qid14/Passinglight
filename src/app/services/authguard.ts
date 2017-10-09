import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    jwtHelper: JwtHelper = new JwtHelper();
    role: any;
    constructor(private router: Router, private loginService: LoginService) {
        // console.log('AUTHGAUARD constructor');

    }
    OnDestroy() {

        this.role = null;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let url: string = state.url;
        return this.checkLogin(url);

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        // debugger
        // console.log('url:', url);

        let data = localStorage.getItem('token');
        if (data) {
            let xrole = this.jwtHelper.decodeToken(data);

            this.role = xrole.role;
            // console.log('xrole:', this.role)

            if (this.role == null) {
                if (url.includes('initiator') || url.includes('dashboard')) {
                    return false
                }
                else {
                    return true;
                }
            }
            else if (this.role == 'initiator') {
                if (url.includes('dashboard') || url.includes('home')) {
                    return false
                }
                else {
                    return true;
                }
            }

            else if (this.role == 'admin') {
                if (url.includes('initiator') || url.includes('home')) {
                    return false;
                }
                else {
                    return true;
                }
            }


        }
        this.router.navigate(['/login']);

        return false;
    }
}
