import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
	isLoggedIn = false;
	jwtHelper: JwtHelper = new JwtHelper();
	// store the URL so we can redirect after logging in
	redirectUrl: string;

	login(): Observable<boolean> {
		let data = localStorage.getItem('token');
		if (data) {
			// logged in so return true
			let role = this.jwtHelper.decodeToken(data).role;
			console.log('mmmmmmmmmm', role, typeof role);
			//默认role 为 null
			if (role == 'admin' || role =='initiator') {
				return Observable.of(true).do(val => this.isLoggedIn = true);
			}
		}
		return Observable.of(false).do(val => this.isLoggedIn = false);;
		// return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
	}

	logout(): void {
		this.isLoggedIn = false;
	}
}
