import { Component } from '@angular/core';
// import { NgForm }  from '@angular/Form';
import { FormsModule, Validator, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { LoginService } from '../services/login.service';

import { Router } from '@angular/router';

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
                        <div *ngIf="isLogin" class="alert alert-danger">
                            {{ errorMsg }}
                        </div>
                 <div class="row justify-content-center">
                    <button (click)="onSubmit()" 
                    class="btn waves-effect waves-light" 
                    type="submit" name="action">Login</button>
                 </div>
            </div>
        </div>

  `,
  styles: [

  ]
})

export class LoginComponent {
	public username: string;
	public password: string;
	public postData: string;
	// public userName: string;
	public errorTitle: string;
	public errorDesc: string;
	public isLogin: boolean = false;
	// public errorMsg: boolean = true;
	public submitting: boolean = false;
  messageService: MessageService;

	constructor(private loginService: LoginService, private router: Router,
    _messageService: MessageService) {
    this.messageService = _messageService;
  }
	onSubmit() {
    if (!this.loginService.login(this.username, this.password)) {
      this.errorMsg = 'Failed to login';
      this.isLogin = false

    }
    // debugger
    this.isLogin = true;
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
