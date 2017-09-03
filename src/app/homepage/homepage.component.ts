
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({

  selector: 'home-page',
  providers: [NgbCarouselConfig],
  template: `
  <div class="container">
   <div style="margin-top: 20px;">
    <div class = "row justify-content-md-center">
      <div class = "col col-md-7">
        <ngb-carousel>
  <ng-template ngbSlide>
    <img src="../../assets/img/p1.png" alt="Random first slide">
    <div class="carousel-caption">
      
    </div>
  </ng-template>
  <ng-template ngbSlide>
    <img src="../../assets/img/p2.jpg" alt="Random second slide">
    <div class="carousel-caption">
     
    </div>
  </ng-template>
  <ng-template ngbSlide>
    <img src="../../assets/img/p3.jpg" alt="Random third slide">
    <div class="carousel-caption">
      <h3> </h3>
      <p></p>
    </div>
  </ng-template>
</ngb-carousel>
        
      </div>
    </div>
</div>
 
  `
})


export class HomepageComponent implements OnInit {




  ngOnInit(): void {
    // this.buildForm();
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('readerid');

  }
  constructor(config: NgbCarouselConfig) {
    console.log('Homepage init begins:....')
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
  }
}


