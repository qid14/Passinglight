// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()

export class LoginService {
 
  private loggedIn = false;

  constructor(private http: Http, private router : Router) {
    this.loggedIn = !!localStorage.getItem('email');
  }

  login(email, password) {

    var postData = 'grant_type=password' + '&userName=' + email + '&password=' + password + '';   

    var headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'ClientId': '8er4lt18-opo4xc7u.apps.techaspect.com'
      });

     return this.http.post(
        'https://hrmmobile.techaspect.com/token', 
        postData,         
        { headers }
      )     
      .map(responseData  => responseData.json())
      .subscribe(
         data => {
              this.loggedIn = true;
              localStorage.setItem('email', email);
              this.router.navigate(['/home']);
            },
            err => {
              this.loggedIn = false;
              localStorage.removeItem('email');
            },
            () => { }
      );       
  }
  
  logout() {
    localStorage.removeItem('email');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}