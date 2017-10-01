import { Component } from '@angular/core';
import { FormsModule, Validator, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { MessageService } from '../services/message.service';

@Component({

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
                 <button (click)="logout()" *ngIf="loginService.isLoggedIn">Logout</button>
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
  subscription: Subscription;
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
  ngOnDestory() {
    this.subscription.unsubscribe();
  }
  logintest() {
    // debugger
    this.subscription = this.loginService.login(this.username, this.password).subscribe((data) => {
      debugger
      console.log('msg is :',this.loginService.isLoggedIn);
      let msg = localStorage.getItem("username") || this.username;
      this.messageService.sendMessage(msg);


      // let data = localStorage.getItem('token');
      // if (data) {
      //   let xrole = this.jwtHelper.decodeToken(data);
      //   console.log('xrole:', xrole.role)
      //   if (xrole.role == null) {
      //     console.log('xxxxxx', !!localStorage.getItem('username'))
      //     this.isLoggedIn = !!localStorage.getItem('username');
      //     this.isInitiator = false;
      //     this.isAdmin = false;
      //   }
      //   else if (xrole.role == 'admin') {
      //     if (localStorage.getItem('username') == 'admin') {
      //       this.isLoggedIn = true;
      //       this.isAdmin = true;
      //       this.isInitiator = false;
      //     }
      //     else {
      //       this.isLoggedIn = false;
      //       // this.isInitiator = false;
      //     }
      //   }
      //   else if (xrole.role = 'initiator') {
      //     this.isLoggedIn = !!localStorage.getItem('username');
      //     this.isInitiator = true;
      //     this.isAdmin = false;
      //     ////
      //   }
      // }
      // else {
      //   this.isLoggedIn = false;
      // }


      console.log('respone data of login:', data)
      // this.loginService.isLoggedIn = true;

      localStorage.setItem('username', data.username);
      localStorage.setItem('readerid', data.readerid);
      localStorage.setItem('token', data.token);
      // console.log('token content',
      //   this.jwtHelper.decodeToken(data.token),

      // );

      let role = this.jwtHelper.decodeToken(data.token).role;
      console.log('role is mmmmmmmmmm', role, typeof role);
      //默认role 为 null
      if (role == 'admin') {

        this.router.navigate(['/dashboard']);
      }
      else if (role == 'initiator') {
        this.router.navigate(['/initiator']);
      } else {
        this.router.navigate(['/home']);
      }

    }
      //   ,err => {
      //     console.log('loging err:', err)
      //     this.loginService.isLoggedIn = false;
      //   },
      //   () => {
      //     console.log('End of login')
      //   }
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
  logout() {
    this.loginService.logout();
    this.subscription.unsubscribe();
    this.messageService.sendMessage("");
    // this.setMessage();
  }
}
