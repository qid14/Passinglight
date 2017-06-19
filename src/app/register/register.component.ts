
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';

@Component({

  selector: 'reader-form',
  // providers:[MessageService],
  template: `
  <div class="container">
  <div [hidden]="submitted">
    <h1>Register</h1>
    <form [formGroup]="readerForm"  *ngIf="active"  (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="username">User Name</label>

        <input type="text" id="username" class="form-control" placeholder="Username"
               formControlName="username" required >

        <div *ngIf="formErrors.username" class="alert alert-danger">
          {{ formErrors.username }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>

        <input type="password" id="password" class="form-control"  minlength='6' placeholder="Password"
               formControlName="password"  required>

        <div *ngIf="formErrors.password" class="alert alert-danger">
          {{ formErrors.password }}
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Retype Password</label>

        <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password"
        formControlName="confirmPassword"  required>
       <div class='form-text error' *ngIf="readerForm.controls.confirmPassword.touched">
          <div *ngIf="readerForm.hasError('mismatchedPasswords')">Passwords do not match.</div>
        </div>
      </div>
       

      <button type="submit" class="btn btn-default"
             [disabled]="!readerForm.valid">Submit</button>
      <button type="button" class="btn btn-default"
             (click)="addReader()">New Reader</button>
    </form>
  </div>
    {{ formErrors1}}
</div>
 
  `
})
// <pre>{{readerForm.value | json}}</pre>


// res.send('Insert new user ok!');
//  <div class="form-group">
//   <label for="gender">Gender</label>

//   <input type="text" id="gender" class="form-control"
//          formControlName="gender"  >

// </div>

//  <div class="form-group">
//   <label for="birth">Birthday</label>

//   <input type="text" id="birth" class="form-control"
//          formControlName="birth"  >

// </div>

export class ReaderRegisterComponent implements OnInit {
  _readerservice: ReadersService;
  formErrors1: string = "";
  messageService:MessageService;
  // powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  reader = new Reader();
  // ('400002', 'Dr. WhatIsHisName', 'Dr. What','test@gmail.com');//for test

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.reader = this.readerForm.value;
    this._readerservice.RegisterReaders(this.reader).subscribe(
      (res) => {
        console.log('response from backend', res);
        if (res.status == 500) {
          this.formErrors1 = "Duplicate username";
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
  //   this.reader = new Reader();
  //   this.buildForm();

  //   this.active = false;
  //   setTimeout(() => this.active = true, 0);
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
  sendMessage(): void {
    // send message to subscribers via observable subject
    let msg= localStorage.getItem('username');
    this.messageService.sendMessage(msg);
  }
  buildForm(): void {
    this.readerForm = this.fb.group({
      'username': [this.reader.username, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
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
    'username': '',
    'password': '',
    'confirmPassword': ''
  };

  validationMessages = {
    'username': {
      'required': 'User name is required.',
      'minlength': 'User name must be at least 2 characters long.',
      'maxlength': 'User Name cannot be more than 20 characters long.',
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


