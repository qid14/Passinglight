import { Component } from '@angular/core';
// import { NgForm }  from '@angular/Form';
import { FormsModule, Validator, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { LoginService } from '../services/login.service';
// import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { MessageService } from '../services/message.service';
// <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
//        <div class="form-group">
//            <label for="username">Username</label>
//            <input class="form-control" id="username" name ="username" required [(ngModel)]="username" #username="ngModel">

//        </div>
//        <div class="form-group">
//            <label for="password">Password</label>
//            <input type="password" class="form-control" id="password" name="password" required [(ngModel)]="password" #password="ngModel">

//        </div>
//        <button type="submit" class="btn btn-default" >Login</button>
//    </form>
@Component({
  // moduleId: module.id,   
  providers: [LoginService],
  template:
  `
 <div class="container"  style="margin-left:20px;margin-top:20px;">

            <div >
                <div class="row justify-content-center">
                    <div class="input-field col-4 ">
                        <input [(ngModel)]="username" id="username" 
                            type="username" class="validate">
                        <label for="username">username</label>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="input-field col-4 ">
                        <input [(ngModel)]="password" id="password" 
                            type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>

                 <div class="row justify-content-center">
                    <button (click)="logintest()" 
                    class="btn waves-effect waves-light" 
                    type="submit" name="action">Login</button>
                 </div>
            </div>
        </div>

  `,
  styles: [

  ]
})

// <div *ngIf="authService.isLoggedIn" class="alert alert-danger">
//     {{ errorMsg }}
// </div>

export class LoginComponent {
	public username: string;
	public password: string;
	public postData: string;
  jwtHelper: JwtHelper = new JwtHelper();
	// public userName: string;
	public errorTitle: string;
	public errorDesc: string;
  // authService: AuthService;
	// public isLogin: boolean = false;
	// public errorMsg: boolean = true;
	// public isSubmitted: boolean = false;
  messageService: MessageService;

	constructor(private loginService: LoginService, private router: Router,
    _messageService: MessageService
    // ,private _authService: AuthService
  ) {
    // debugger
    this.messageService = _messageService;
    // this.authService=_authService;
  }

  logintest() {
    this.loginService.login(this.username, this.password).subscribe((data) => {
      debugger
      console.log('respone data of login:', data)
      this.loginService.isLoggedIn = true;
      //     this.loginService.login(this.username, this.password).subscribe(
      // data => {
      //   console.log('data:', data);

      localStorage.setItem('username', data.username);
      localStorage.setItem('readerid', data.readerid);
      localStorage.setItem('token', data.token);
      console.log('token content',
        this.jwtHelper.decodeToken(data.token),
        // this.jwtHelper.getTokenExpirationDate(data.token),
        //     // this.jwtHelper.isTokenExpired(data.token)
      );
      //   // this.isLoggedIn = true;
      //   console.log('this logged in is:',this.isLoggedIn);
      //   debugger
      //   // alert(msg)
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
      let msg = localStorage.getItem("username") || this.username;
      this.messageService.sendMessage(msg);
      // if (this.loginService.isLoggedIn) {
      //   // Get the redirect URL from our auth service
      //   // If no redirect has been set, use the default
      //   let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/admin';

      // Set our navigation extras object
      // that passes on our global query params and fragment
      // let navigationExtras: NavigationExtras = {
      //   queryParamsHandling: 'preserve',
      //   preserveFragment: true
      // };

      // Redirect the user
      // this.router.navigate([redirect], navigationExtras);
      // }
    },
      err => {
        console.log('loging err:', err)
        this.loginService.isLoggedIn = false;
      },
      () => {
        console.log('End of post')
      }
    );

  }
  login() {
    //     this.loginService.login(this.username, this.password).subscribe(
    // data => {
    //   console.log('data:', data);

    //   localStorage.setItem('username', data.username);
    //   localStorage.setItem('readerid', data.readerid);
    //   localStorage.setItem('token', data.token);
    //   console.log('token content',
    //     this.jwtHelper.decodeToken(data.token),
    //     // this.jwtHelper.getTokenExpirationDate(data.token),
    //     // this.jwtHelper.isTokenExpired(data.token)
    //   );
    //   // this.isLoggedIn = true;
    //   console.log('this logged in is:',this.isLoggedIn);
    //   debugger
    //   // alert(msg)
    //   let role = this.jwtHelper.decodeToken(data.token).role;
    //   console.log('mmmmmmmmmm', role, typeof role);
    //   //默认role 为 null
    //   if (role == 'admin') {
    //     this.router.navigate(['/dashboard']);
    //   }
    //   else if (role == 'initiator') {
    //     this.router.navigate(['/initiator']);
    //   } else {
    //     this.router.navigate(['/home']);
    //   }

    // },
    // err => {
    //   debugger
    //   // this.isLoggedIn = false;
    //   localStorage.removeItem('username');
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('readerid');

    // },
    // () => { }
    // );
  }

	onSubmit() {
    // debugger
    if (!this.loginService.login(this.username, this.password)) {
      this.errorMsg = 'Failed to login';
      // this.isLogin = false
      this.loginService.isLoggedIn = false;

    }
    // debugger
    // this.isLogin = true;
    this.loginService.isLoggedIn = true;
    // this.isSubmitted = true;
    let msg = localStorage.getItem("username") || this.username;
    this.messageService.sendMessage(msg);


  }

  // public user = new User('','');
  public errorMsg = 'Wrong password or wrong username!';

  // constructor(
  //     private _service:AuthenticationService) {}

  // login() {
  //     if(!this._service.login(this.user)){
  //         this.errorMsg = 'Failed to login';
  //     }
  // }
}
