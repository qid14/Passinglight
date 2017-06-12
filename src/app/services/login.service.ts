// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()

export class LoginService {

  private loggedIn = false;

  constructor(private http: Http, private router: Router) {
    console.log('xxxxxx',!!localStorage.getItem('username'))
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
        console.log('data:',data);
        this.loggedIn = true;
        debugger
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/questions']);
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
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}