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
                    <button (click)="login()" 
                    class="btn waves-effect waves-light" 
                    type="submit" name="action">Login</button>
                 </div>
                 <div *ngIf="isSubmitted && !loginService.isLoggedIn" class="alert alert-danger">
                  {{ errorMsg }}
                  </div>
                 
            </div>
        </div>

  `,
  styles: [

  ]
})



export class LoginComponent {
  subscription: Subscription;
  public username: string;
  public password: string;
  public postData: string;

  jwtHelper: JwtHelper = new JwtHelper();
  // public userName: string;
  public errorTitle: string;
  public errorDesc: string;
  

  public isSubmitted: boolean = false;
  messageService: MessageService;

  constructor(private loginService: LoginService, private router: Router,
    _messageService: MessageService

  ) {
    
    this.messageService = _messageService;
    
  }
  ngOnDestory() {
    this.subscription.unsubscribe();
  }
  login() {
    this.isSubmitted = true;
    this.subscription = this.loginService.login(this.username, this.password).subscribe((data) => {
      // debugger
      // console.log('msg is :',this.loginService.isLoggedIn);
      let msg = localStorage.getItem("username") || this.username;
      this.messageService.sendMessage(msg);

      localStorage.setItem('username', data.username);
      localStorage.setItem('readerid', data.readerid);
      localStorage.setItem('token', data.token);
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

  public errorMsg = 'Wrong password or wrong username!';

  // constructor(
  //     private _service:AuthenticationService) {}

  // login() {
  //     if(!this._service.login(this.user)){
  //         this.errorMsg = 'Failed to login';
  //     }
  // }
  logout() {
    this.isSubmitted = false;
    this.loginService.logout();
    this.subscription.unsubscribe();
    this.messageService.sendMessage("");
    
  }
}
