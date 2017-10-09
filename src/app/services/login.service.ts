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
    // debugger
    
  }

  login(username, password): Observable<any> {

    var postData = { "username": username, "password": password };

    var headers = new Headers({
      'Content-Type': 'application/json'

    });
    // console.log('post data when login:', postData);
    return this.http.post( '/readers/login',
      postData,
      { headers }
    )
      .map(responseData => {
        // console.log('response:', responseData.json())
        this.isLoggedIn = true
        return responseData.json()
      })


  }

  logout():void {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('readerid');
    this.isLoggedIn = false;
    
    this.router.navigate(['/homepage']);
  }

  isLoggedInfunc() {
    // debugger
    return this.isLoggedIn;
  }
}