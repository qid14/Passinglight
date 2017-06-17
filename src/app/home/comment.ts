
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { Reader } from '../shared/reader';
// import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';
import { SubmittedComponent } from '../shared/submitted.component';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'comment',
  template: `
  <div class="container">
  <div [hidden]="submitted">
    <h1>Please write your comment:</h1>
    <form [formGroup]="readerForm"  *ngIf="active"  (ngSubmit)="onSubmit()">

      <div class="form-group">
        <label for="memo">Memo</label>
        <textarea id="memo" rows="4" cols="50" name="memo" class="form-control"  formControlName="memo" >
            Enter Your comment here...</textarea>
      </div>


      <button type="submit" class="btn btn-default"
             [disabled]="!readerForm.valid">Submit</button>
    
    </form>
  </div>


</div>
 
  `
})

// <reader-submitted [reader]="reader" [(submitted)]="submitted"></reader-submitted>

export class CommentComponent implements OnInit {
  _readerservice: ReadersService;

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
    this._readerservice.UpdateReaders(this.reader).subscribe((res) => {
      console.log(res);
      alert('Thank you for your feedback! You will see your comment shown on the website.')
      this.router.navigate(['/homepage']);
    })
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
  constructor(private fb: FormBuilder, readerservice: ReadersService, private router:Router) {
    this._readerservice = readerservice;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.readerForm = this.fb.group({

      'memo': [this.reader.memo]
    });

    this.readerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
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
    // 'firstname': '',
    // 'lastname': '',
    // 'email':''
  };

  validationMessages = {
    // 'firstname': {
    //   'required':      'First name is required.',
    //   'minlength':     'First name must be at least 2 characters long.',
    //   'maxlength':     'First Name cannot be more than 20 characters long.',
    //   // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    // },
    // 'lastname': {
    //   'required':      'Last name is required.',
    //   'minlength':     'Last name must be at least 2 characters long.',
    //   'maxlength':     'Last Name cannot be more than 20 characters long.',
    //   // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    // },
    // 'email': {
    //   'required': 'Email is required.',
    //   'minlength': 'Email must be at least 5 characters long.',
    //   'pattern': 'Invalid Email format'
    // }
  };
}


