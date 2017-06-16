
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';


@Component({
	selector: 'contact',
	template: `
<div class="container">
  <div [hidden]="submitted">
    <h1>Change Password</h1>
    <form [formGroup]="readerForm"  *ngIf="active"  (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="oldpassword">Old Password</label>

        <input type="password" id="oldpassword" class="form-control" 
               formControlName="oldpassword" required >

        <div *ngIf="formErrors.oldpassword" class="alert alert-danger">
          {{ formErrors.oldpassword }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>

        <input type="password" id="password" class="form-control"  minlength='6' placeholder="Password"
               formControlName="password"  >

        <div *ngIf="formErrors.password" class="alert alert-danger">
          {{ formErrors.password }}
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Retype Password</label>

        <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password"
        formControlName="confirmPassword"  >
       <div class='form-text error' *ngIf="readerForm.controls.confirmPassword.touched">
          <div *ngIf="readerForm.hasError('mismatchedPasswords')">Passwords do not match.</div>
        </div>
      </div>
       

      <button type="submit" class="btn btn-default"
             [disabled]="!readerForm.valid">Submit</button>
     
    </form>
  </div>
    {{ formErrors1}}
</div>
  `
})


export class ContactComponent implements OnInit {
	_readerservice: ReadersService;
	formErrors1: string = "";
	messageService: MessageService;
	// powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

	reader = new Reader();
	// ('400002', 'Dr. WhatIsHisName', 'Dr. What','test@gmail.com');//for test

	submitted = false;

	onSubmit() {
		this.submitted = true;
		let username = localStorage.getItem('username');
		let un = { "username": username };
		console.log("this.readerForm.value:", this.readerForm.value, un);
		let rr = Object.assign(un, this.readerForm.value);
		console.log('reader:', rr);
		this.reader = rr;
		// this.reader = this.readerForm.value;
		this._readerservice.UpdateReaders(this.reader).subscribe(
			(res) => {
				console.log('response from backend', res);
				if (res.status == 500) {
					this.formErrors1 = "Old password is not match our record!";
					this.router.navigate(['/home']);
				}
			},

			(err) => {
				console.log(err);
				this.router.navigate(['/register']);
			}
		)
		// )
	}

	// Reset the form with a new hero AND restore 'pristine' class state
	// by toggling 'active' flag which causes the form
	// to be removed/re-added in a tick via NgIf
	// TODO: Workaround until NgForm has a reset method (#6822)
	active = true;
	// addReader() {
	// 	this.reader = new Reader();
	// 	this.buildForm();

	// 	this.active = false;
	// 	setTimeout(() => this.active = true, 0);
	// }

	readerForm: FormGroup;
	constructor(private fb: FormBuilder, readerservice: ReadersService, private router: Router,
		_messageService: MessageService) {
		this._readerservice = readerservice;
		this.messageService = _messageService;
	}

	ngOnInit(): void {
		this.buildForm();
	}
	// sendMessage(): void {
	// 	// send message to subscribers via observable subject
	// 	let msg = localStorage.getItem('username');
	// 	this.messageService.sendMessage(msg);
	// }
	buildForm(): void {
		this.readerForm = this.fb.group({
			oldpassword: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],


		}, { validator: this.matchingPasswords('password', 'confirmPassword') });

		this.readerForm.valueChanges
			.subscribe(data => this.onValueChanged(data));

		this.onValueChanged(); // (re)set validation messages now
	}

	// FORM GROUP VALIDATORS
	matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let password = group.controls[passwordKey];
			let confirmPassword = group.controls[confirmPasswordKey];

			if (password.value !== confirmPassword.value) {
				return {
					mismatchedPasswords: true
				};
			}
		}

	}


	onValueChanged(data?: any) {
		if (!this.readerForm) { return; }
		const form = this.readerForm;

		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);

			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	formErrors = {
		'oldpassword': '',
		'password': '',
		'confirmPassword': ''
	};

	validationMessages = {
		'oldpassword': {
			'required': 'Old Password is required.',
			'minlength': 'Password must be at least 6 characters long.',
			'maxlength': 'Password cannot be more than 20 characters long.',
			'duplicateName': 'Someone has already register this named, Please choose another one.'
		},
		'password': {
			'required': 'Password is required.',
			'minlength': 'Password must be at least 6 characters long.',
			'maxlength': 'Password cannot be more than 20 characters long.',
			// 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
		}
		// ,
		// 'confirmPassword': {
		//   'required': 'confirmPassword is required.',
		//   'minlength': 'confirmPassword must be at least 5 characters long.',
		//   'pattern': 'Invalid confirmPassword format'
		// }
	};
}
