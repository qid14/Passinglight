// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
// import { MessageService } from './message.service';
@Injectable()

export class LoginService {
  // messageService: MessageService;
  private loggedIn = false;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http, private router: Router) {
    console.log('xxxxxx', !!localStorage.getItem('username'))
    this.loggedIn = !!localStorage.getItem('username');
  }

  login(username, password) {

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
        return responseData.json()
      })
      .subscribe(
      data => {
        console.log('data:', data);
        this.loggedIn = true;
        // debugger
        localStorage.setItem('username', data.username);
        localStorage.setItem('readerid', data.readerid);
        localStorage.setItem('token', data.token);
        console.log('token content',
          this.jwtHelper.decodeToken(data.token),
          // this.jwtHelper.getTokenExpirationDate(data.token),
          // this.jwtHelper.isTokenExpired(data.token)
        );

        // alert(msg)
        let role = this.jwtHelper.decodeToken(data.token).role;
        console.log('mmmmmmmmmm', role, typeof role);
        //默认role 为 null
        if (role == 'admin') {
          this.router.navigate(['/dashboard']);
        }
        else if (role == 'initiator') {
          this.router.navigate(['/initiator']);
        } else {
          this.router.navigate(['/home']);
        }

      },
      err => {
        this.loggedIn = false;
        localStorage.removeItem('username');
        localStorage.removeItem('token');
      },
      () => { }
      );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/homepage']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}