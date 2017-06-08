import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Reader } from './reader';

@Component({
  selector: 'reader-submitted',
  template: `
  <div *ngIf="submitted">
    <h2>You submitted the following:</h2>
    <div class="row">
      <div class="col-xs-3">First Name</div>
      <div class="col-xs-9  pull-left">{{ reader.firstname }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Last Name</div>
      <div class="col-xs-9 pull-left">{{ reader.lastname }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Middle Name</div>
      <div class="col-xs-9 pull-left">{{ reader.middlename }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Email</div>
      <div class="col-xs-9 pull-left">{{ reader.email }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Phone Number</div>
      <div class="col-xs-9 pull-left">{{ reader.phonenumber }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Church</div>
      <div class="col-xs-9 pull-left">{{ reader.church }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Groups</div>
      <div class="col-xs-9 pull-left">{{ reader.groups }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Memo</div>
      <div class="col-xs-9 pull-left">{{ reader.memo }}</div>
    </div>
    <br>
    <button class="btn btn-default" (click)="onClick()">Edit</button>
  </div>`
})
export class SubmittedComponent {
  @Input()  reader: Reader;
  @Input()  submitted = false;
  @Output() submittedChange = new EventEmitter<boolean>();
  onClick() { this.submittedChange.emit(false); }
}