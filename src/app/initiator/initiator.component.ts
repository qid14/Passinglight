
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

  selector: 'initiator',
  providers:[
  // NgbCarouselConfig
  ],
  template: `

  <nav>
    <a [routerLink]=" ['record'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Record
    </a>

        <a [routerLink]=" ['password'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-info"></i>
      Change Password
    </a>
    <a [routerLink]=" ['updateprofile'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-user"></i>
      Update Profile
    </a>
    <a [routerLink]=" ['passbook'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
      Pass book
    </a>
    <a [routerLink]=" ['comment'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-commenting"></i>
      Comment
    </a>
   
  </nav>
  <router-outlet></router-outlet>

 
  `
})


export class InitiatorComponent implements OnInit {

  ngOnInit(): void {
    // this.buildForm();
  }
   constructor(){
   }
}


