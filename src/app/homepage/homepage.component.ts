
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({

  selector: 'home-page',
  providers:[NgbCarouselConfig],
  template: `
  <div class="container">
   <div style="margin-top: 20px;">
    <div class = "row justify-content-md-center">
      <div class = "col col-md-7">
        <ngb-carousel>
  <ng-template ngbSlide>
    <img src="https://lorempixel.com/900/500?r=1" alt="Random first slide">
    <div class="carousel-caption">
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </div>
  </ng-template>
  <ng-template ngbSlide>
    <img src="https://lorempixel.com/900/500?r=2" alt="Random second slide">
    <div class="carousel-caption">
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </ng-template>
  <ng-template ngbSlide>
    <img src="https://lorempixel.com/900/500?r=3" alt="Random third slide">
    <div class="carousel-caption">
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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
  }
   constructor(config: NgbCarouselConfig){
     console.log('Homepage init begins:....')
         config.interval = 1000;
    config.wrap = true;
    config.keyboard = true;
   }
}


