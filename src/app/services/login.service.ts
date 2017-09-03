// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
// import { AuthService } from './auth.service';
// import { MessageService } from './message.service';
@Injectable()

export class LoginService {
  // messageService: MessageService;
  public isLoggedIn = false;
  redirectUrl: string;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http, private router: Router
    // , private authService: AuthService
    ) {
    console.log('xxxxxx', !!localStorage.getItem('username'))
    this.isLoggedIn = !!localStorage.getItem('username');
  }

  login(username, password) :Observable<any> {

    var postData = { "username": username, "password": password };

    var headers = new Headers({
      'Content-Type': 'application/json'

    });
    console.log('post data when login:', postData);
    return this.http.post(
      'http://localhost:3002/readers/login',
      postData,
      { headers }
    )
      .map(responseData => {
        console.log('response:', responseData.json()) 
        this.isLoggedIn = true
        return responseData.json()
      })


  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/homepage']);
  }

  isLoggedInfunc() {
    debugger
    return this.isLoggedIn;
  }
}