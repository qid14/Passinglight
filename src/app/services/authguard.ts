import { Injectable } from '@angular/core';
import { Router, Route,CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        // return false;
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
        // if (this.loginService.login()) {return true;}
        if (this.loginService.isLoggedIn) { return true; }

        // Store the attempted URL for redirecting
        this.loginService.redirectUrl = url;

        // Create a dummy session id
        // let sessionId = 123456789;

        // // Set our navigation extras object
        // // that contains our global query params and fragment
        // let navigationExtras: NavigationExtras = {
        //     queryParams: { 'session_id': sessionId },
        //     fragment: 'anchor'
        // };

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        // , navigationExtras);
        return false;
    }

}
