
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { MessageService } from '../services/message.service';

@Component({

  selector: 'dashboard',
  providers:[

  ],
  template: `
  <div >
   <div style="margin-top: 20px;">
    <div class = "row justify-content-lg-center" style="width:1500px">
      <div class = "col col-md-12 col-lg-12">
          <div >
  <nav>
    <a [routerLink]=" ['statistics'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-bar-chart"></i>
        Statistics
    </a>

    <a [routerLink]=" ['books'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Manage Books
    </a>

    <a [routerLink]=" ['addbook'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Add new Book(s)
    </a>

    <a [routerLink]=" ['record'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Record
    </a>

     <a [routerLink]=" ['authorize'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      <i class="fa fa-book"></i>
        Authorize
    </a>
   
  </nav>
  <hr />
  <router-outlet></router-outlet>
  <hr />
</div>
     

      </div>
    </div>
</div>
 
  `
})

export class DashboardComponent implements OnInit {

  ngOnInit(): void {

  }
   constructor(){
   }
}


