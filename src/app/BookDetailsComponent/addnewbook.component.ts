
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Book } from '../shared/book';
import { ReadBookService } from '../services/readbook.service';
import { Router } from '@angular/router';
import { SubmittedComponent } from '../shared/submitted.component';
// import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'addnewbook',
  providers: [ReadBookService],
  template: `
  <div class="container">
  <div [hidden]="submitted">
    <h1>Add a new book</h1>
    <form [formGroup]="bookForm"  *ngIf="active"  (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="bookname">Book Name</label>

        <input type="text" id="bookname" class="form-control"
               formControlName="bookname" required >

        <div *ngIf="formErrors.bookname" class="alert alert-danger">
          {{ formErrors.bookname }}
        </div>
      </div>

      <div class="form-group">
        <label for="author">Author</label>

        <input type="text" id="author" class="form-control"
               formControlName="author" required >

        <div *ngIf="formErrors.author" class="alert alert-danger">
          {{ formErrors.author }}
        </div>
      </div>

      <div class="form-group">
        <label for="price">Price</label>

        <input type="text" id="price" class="form-control"
               formControlName="price"  >
         <div *ngIf="formErrors.price" class="alert alert-danger">
          {{ formErrors.price }}
        </div>
      </div>
       
     

        <div class="form-group">
        <label for="location">Location</label>

        <input type="text" id="location" class="form-control"
               formControlName="location"  >
        <div *ngIf="formErrors.location" class="alert alert-danger">
          {{ formErrors.location }}
        </div>
       
      </div>


        <div class="form-group">
        <label for="qty">Qty</label>

        <input type="number" id="qty" class="form-control"
               formControlName="qty"  >
        <div *ngIf="formErrors.qty" class="alert alert-danger">
          {{ formErrors.qty }}
        </div>
       
      </div>

      <button type="submit" class="btn btn-default"
             [disabled]="!bookForm.valid">Submit</button>
    
    </form>
  </div>


</div>
 
  `
})



export class AddNewBookComponent implements OnInit {
  _readbookservice: ReadBookService;
  subscription:Subscription;
  bookname = "Queen of the Dark Chamber";
  book = new Book();

  
  author: string = "Christiana Tsai";
  price: string = "2.99";
  location: string = "Plano";
  version: string = "Kindle Edition";
  qty:number =1;
  
  submitted = false;

  onSubmit() {
    this.submitted = true;

    // debugger
    this.subscription=this._readbookservice.addBook(this.bookForm.value).subscribe((res) => {

      // console.log('response from new book service:',res);
    })
  }


  active = true;


  bookForm: FormGroup;
  constructor(private fb: FormBuilder,readbookservice:ReadBookService) {
    this._readbookservice = readbookservice;
  }

  ngOnInit(): void {
    
    // console.log('update profile no 3:', this.reader);
    this.buildForm();
  }

  ngOnDestory(){
    this.subscription.unsubscribe();
  }
  buildForm(): void {
    this.bookForm = this.fb.group({
      'bookname': [this.bookname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]
      ],
      'author': [this.author, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]
      ],
      'location': [this.location, [
        
      ]
      ],
      'price': [this.price, [
        
      ]
      ],
      'version': [this.version, [
        
      ]
      ],
      'qty': [this.qty, [
        
      ]
      ]

    });

    this.bookForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    // debugger;
    if (!this.bookForm) { return; }
    const form = this.bookForm;

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
    'bookname': '',
    'author': '',
    'location': '',
    'price': '',
    'version': '',
    'qty':''
  };

  validationMessages = {
    'bookname': {
      'required': 'Book name is required.',
      'minlength': 'Book name must be at least 2 characters long.',
      'maxlength': 'Book Name cannot be more than 50 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.',
      'maxlength': 'Author Name cannot be more than 50 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    }
  };
}


