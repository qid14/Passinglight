 
import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Reader }                   from '../shared/reader';
import {ReadersService} from '../services/readers.service';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'reader-form',
  template:`
  <div class="container">
  <div [hidden]="submitted">
    <h1>Register</h1>
    <form [formGroup]="readerForm"  *ngIf="active"  (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="firstname">First Name</label>

        <input type="text" id="firstname" class="form-control"
               formControlName="firstname" required >

        <div *ngIf="formErrors.name" class="alert alert-danger">
          {{ formErrors.firstname }}
        </div>
      </div>

      <div class="form-group">
        <label for="lastname">Last Name</label>

        <input type="text" id="lastname" class="form-control"
               formControlName="lastname" required >

        <div *ngIf="formErrors.lastname" class="alert alert-danger">
          {{ formErrors.lastname }}
        </div>
      </div>

      <div class="form-group">
        <label for="middlename">Middle Name</label>

        <input type="text" id="middlename" class="form-control"
               formControlName="middlename"  >
       
      </div>

        <div class="form-group">
        <label for="email">Email</label>

        <input type="text" id="email" class="form-control"
               formControlName="email"  >
        <div *ngIf="formErrors.email" class="alert alert-danger">
          {{ formErrors.email }}
        </div>
       
      </div>

       <div class="form-group">
        <label for="phonenumber">Phone Number</label>

        <input type="text" id="phonenumber" class="form-control"
               formControlName="phonenumber"  >
       
      </div>

      <div class="form-group">
        <label for="church">Church</label>

        <input type="text" id="church" class="form-control"
               formControlName="church"  >
       
      </div>

      <div class="form-group">
        <label for="groups">Groups</label>

        <input type="text" id="groups" class="form-control"
               formControlName="groups"  >
       
      </div>



      <div class="form-group">
        <label for="memo">Memo</label>
        <input type="text" id="memo" class="form-control"
            formControlName="memo"  >
      </div>


      <button type="submit" class="btn btn-default"
             [disabled]="!readerForm.valid">Submit</button>
      <button type="button" class="btn btn-default"
             (click)="addReader()">New Reader</button>
    </form>
  </div>

  <reader-submitted [reader]="reader" [(submitted)]="submitted"></reader-submitted>
</div>
 
  `
})
export class ReaderRegisterComponent implements OnInit {
  _readerservice:ReadersService;
  // powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  reader = new Reader('400002', 'Dr. WhatIsHisName', 'Dr. What','test@gmail.com');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.reader = this.readerForm.value;
    this._readerservice.RegisterReaders(this.reader).subscribe((res)=>{
      console.log(res);
    })
  }

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;
  addReader() {
    this.reader = new Reader('','','','');
    this.buildForm();

    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  readerForm: FormGroup;
  constructor(private fb: FormBuilder,readerservice:ReadersService) { 
    this._readerservice=readerservice;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.readerForm = this.fb.group({
      'firstname': [this.reader.firstname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
       'lastname': [this.reader.lastname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
       'email': [this.reader.email, [
          Validators.required,
          Validators.minLength(5 ),
          Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
        ]
      ],
      'middlename': [this.reader.middlename],
      'phonenumber':    [this.reader.phonenumber],
      'church': [this.reader.church],
      'groups': [this.reader.groups],
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
    'firstname': '',
    'lastname': '',
    'email':''
  };

  validationMessages = {
    'firstname': {
      'required':      'First name is required.',
      'minlength':     'First name must be at least 2 characters long.',
      'maxlength':     'First Name cannot be more than 20 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'lastname': {
      'required':      'Last name is required.',
      'minlength':     'Last name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 20 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 5 characters long.',
      'pattern': 'Invalid Email format'
    }
  };
}


