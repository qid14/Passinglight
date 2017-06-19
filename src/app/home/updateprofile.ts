
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
  selector: 'update-profile',
  template: `
  <div class="container">
  <div [hidden]="submitted">
    <h1>Update your profile</h1>
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






      <button type="submit" class="btn btn-default"
             [disabled]="!readerForm.valid">Submit</button>
    
    </form>
  </div>


</div>
 
  `
})

// <reader-submitted [reader]="reader" [(submitted)]="submitted"></reader-submitted>
// <button type="button" class="btn btn-default"
//            (click)="addReader()">New Reader</button>

// <div class="form-group">
//       <label for="gender">Gender</label>

//       <input type="text" id="gender" class="form-control"
//              formControlName="gender"  >

//     </div>

//      <div class="form-group">
//       <label for="birth">Birthday</label>

//       <input type="text" id="birth" class="form-control"
//              formControlName="birth"  >

//     </div>


export class UpdateProfileComponent implements OnInit {
  _readerservice: ReadersService;
  username = localStorage.getItem('username');
  reader = new Reader();

  firstname: string = "";
  lastname: string = "";
  middlename: string = "";
  email: string = "";
  phonenumber: string = "";
  church: string = "";
  groups: string = "";

  submitted = false;

  onSubmit() {
    this.submitted = true;

    // username= localStorage.getItem('username');
    let un = { "username": this.username };
    console.log("this.readerForm.value:", this.readerForm.value, un);
    let rr = Object.assign(un, this.readerForm.value);
    console.log('reader:', rr);
    this.reader = rr;
    this._readerservice.UpdateReaders(this.reader).subscribe((res) => {
      console.log(res);
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
  constructor(private fb: FormBuilder, readerservice: ReadersService) {
    this._readerservice = readerservice;
  }

  ngOnInit(): void {
    this._readerservice.GetReaders(this.username).subscribe((res) => {
      // console.log('update profile no 1:',res);
      let readerinfo = res.json();
      console.log('update profile no 2:', readerinfo[0]);
      if (readerinfo.length > 0) {
        this.firstname = readerinfo[0].firstname;
        this.lastname = readerinfo[0].lastname;
        this.middlename = readerinfo[0].middlename;
        this.email = readerinfo[0].email;
        this.phonenumber = readerinfo[0].phonenumber;
        this.church = readerinfo[0].church;
        this.groups = readerinfo[0].groups;
        console.log('update profile no 4:', this.firstname);
        this.reader = new Reader({
          "username": this.username, "firstname": this.username, "email": this.email,
          "lastname": this.lastname, "middlename": this.middlename, "phonenumber": this.phonenumber,
          "church": this.church, "groups": this.groups
        });//for test
      }
      console.log('update profile no 5:', this.reader);

    }

    );
    // console.log('update profile no 3:', this.reader);
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
        Validators.minLength(5),
        Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
      ]
      ],
      'middlename': [this.reader.middlename],
      'phonenumber': [this.reader.phonenumber],
      'church': [this.reader.church],
      'groups': [this.reader.groups]

    });

    this.readerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    debugger;
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
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 20 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 20 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 5 characters long.',
      'pattern': 'Invalid Email format'
    }
  };
}


