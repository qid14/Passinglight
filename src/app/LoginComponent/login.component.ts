import { Component } from '@angular/core';
// import { NgForm }  from '@angular/Form';
import {FormsModule,Validator,FormControl,FormBuilder,FormGroup,FormArray} from '@angular/forms'
import { LoginService  } from '../services/login.service';
import { Router } from '@angular/router';

// <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
//         <div class="form-group">
//             <label for="email">Email</label>
//             <input type="email" class="form-control" id="email" name ="email" required [(ngModel)]="email" #emailState="ngModel">
   
//         </div>
//         <div class="form-group">
//             <label for="password">Password</label>
//             <input type="password" class="form-control" id="password" name="password" required [(ngModel)]="password" #password="ngModel">

//         </div>
//         <button type="submit" class="btn btn-default" >Login</button>
//     </form>

@Component({
  // moduleId: module.id,   
  providers: [LoginService ],
  template:
  `
<div class="login-form-container">
    <h1>Login Form</h1>
    

</div>

  `,
  styles: [
  `

.login-form-container .ng-touched.ng-pristine.ng-invalid[required],
.login-form-container .ng-touched.ng-dirty.ng-invalid[required] {
    border-left: 5px solid #a94442;
}

.login-form-container .ng-touched.ng-dirty.ng-valid[required] {
    border-left: 5px solid #42A948;
}

.login-form-container .alert {
    text-transform: capitalize;
}
  `
  ]
})

export class LoginComponent {
	public email: string;
	public password: string;
	public postData: string;
	public userName: string;
	public errorTitle: string;
	public errorDesc: string;
	public successMsg: boolean = true;
	public errorMsg: boolean = true;
	public submitting: boolean = false;
	
	constructor(private loginService: LoginService , private router: Router) {}
	onSubmit() {
	    this.loginService.login(this.email, this.password);
	    
  	}	 
}
