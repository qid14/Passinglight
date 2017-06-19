
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
// import { ReadersService } from '../services/readers.service';
// import { matchOtherValidator } from '../shared/match-other-validators';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';
// import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap'; 
@Component({

  selector: 'dashboard',
  providers:[
  // NgbCarouselConfig
  ],
  template: `
  <div class="container">
   <div style="margin-top: 20px;">
    <div class = "row justify-content-lg-center" style="width:1500px">
      <div class = "col col-md-12 col-lg-12">
          <div >
  <nav>
    
    <a [routerLink]=" ['books'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Books
    </a>

    <a [routerLink]=" ['record'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Record
    </a>
   
  </nav>
  <router-outlet></router-outlet>
</div>
      </div>
    </div>
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

export class DashboardComponent implements OnInit {




  ngOnInit(): void {
    // this.buildForm();
  }
   constructor(){
   }
}


