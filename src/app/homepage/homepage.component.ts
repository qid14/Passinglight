
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
        <img src="https://lorempixel.com/900/500?r=4" alt="Random first slide">
        <div class="carousel-caption">
          <h3>10 seconds between slides...</h3>
          <p>This carousel uses customized default values.</p>
        </div>
        </ng-template>
        <ng-template ngbSlide>
        <img src="https://lorempixel.com/900/500?r=5"  alt="Random second slide">
        <div class="carousel-caption">
          <h3>No keyboard...</h3>
          <p>This carousel uses customized default values.</p>
        </div>
        </ng-template>
        <ng-template ngbSlide>
        <img src="https://lorempixel.com/900/500?r=6" alt="Random third slide">
        <div class="carousel-caption">
          <h3>And no wrap after last slide.</h3>
          <p>This carousel uses customized default values.</p>
        </div>
        </ng-template>
        </ngb-carousel>
        
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

export class HomepageComponent implements OnInit {




  ngOnInit(): void {
    // this.buildForm();
  }
   constructor(config: NgbCarouselConfig){
         config.interval = 1000;
    config.wrap = true;
    config.keyboard = true;
   }
}


