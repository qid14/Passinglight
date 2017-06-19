import { Component } from '@angular/core';
import { ReadBookService } from '../services/readbook.service';
import * as moment from 'moment';
@Component({
  providers: [ReadBookService],
  template: `
	<div class="row" style="margin-left:20px;margin-top:20px;">
	<div class="col-md-10">
   <ngx-datatable
   		class="material"
         [rows]="rows"
        [columns]="columns"
         [columnMode]="'force'"
		    [rowHeight]="'auto'"
        [footerHeight]="50"        

        [limit]="10">

         <ngx-datatable-column name="Bookname" [width]="150">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
          
          <ngx-datatable-column name="First Name" 
          [width]="150"
          prop="firstname">
        </ngx-datatable-column>
        
        <ngx-datatable-column name="Last Name"  [width]="150"
          prop="lastname"
          >
        </ngx-datatable-column>
        
        <ngx-datatable-column name="Email" [width]="200">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

          <ngx-datatable-column name="Church" [width]="200">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

        <ngx-datatable-column name="Groups" [width]="150">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="StartDate" [width]="250"
          prop="startdate">
        </ngx-datatable-column>

        <ngx-datatable-column name="EndDate"  [width]="250"
          prop="enddate">
        </ngx-datatable-column>

        <ngx-datatable-column name="Duration" [width]="150">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>


       </ngx-datatable>
       </div>
       </div>

  `


})

export class SearchBorrowerComponent {
  public getBooksList;
  rows = [];
  columns = [
    { name: "bookname" },
    { name: "firstname" },
    { name: "lastname" },
    { name: "email" },
    { name: "church" },
    { name: "groups" },
    { name: "startdate" },
    { name: "enddate" },
    { name: "duration" }

  ]

  constructor(private readBookService: ReadBookService) { }

  ngOnInit() {
    this.getBorrows();
    console.log(moment.now());
    let xx = moment.now();
    console.log('getbooks------ ', moment().format('YYYY-MM-DD'));
  }


  // Get Books
  getBorrows() {
    // now it's a simple subscription to the observable
    // console.log('getbooks',this.readBookService);
    // debugger
    this.readBookService.SearchBorrows()
      .subscribe(
      data => {

        // console.log('temparray:', data.length)
        for (let i = 0; i < data.length; i++) {
          //   let sd=moment(data[i].startdate);
          //   let ed= moment(data[i].enddate);
          //   console.log('tt',ed.diff(sd,'days'));
          //   data[i].duration = ed.diff(sd,'days');

          data[i].startdate = moment(data[i].startdate).format('YYYY-MM-DD');
          data[i].enddate = moment(data[i].enddate).format('YYYY-MM-DD');

          //   console.log('nn',data[i].startdate,data[i].enddate, ed.from(sd),data[i].duration)
        }
        this.rows = data;
      },
      err => alert(err),
      () => { }
      );


  }

}