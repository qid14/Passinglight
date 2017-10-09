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
         <ngx-datatable-column name="BookID" [width]="150" prop="bookid" cellClass="tableborrower">
        </ngx-datatable-column>

         <ngx-datatable-column name="Bookname" [width]="250">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
          
          <ngx-datatable-column name="FirstName" 
          [width]="150"
          prop="firstname">
        </ngx-datatable-column>
        
        <ngx-datatable-column name="LastName"  [width]="150"
          prop="lastname"
          >
        </ngx-datatable-column>
        
        <ngx-datatable-column name="Email" [width]="200">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

          <ngx-datatable-column name="Phone" [width]="150">
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

        <ngx-datatable-column name="StartDate" [width]="200"
          prop="startdate">
        </ngx-datatable-column>

        <ngx-datatable-column name="EndDate"  [width]="200" prop="enddate">
           <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Duration" [width]="150" >
          <ng-template let-value="value" ngx-datatable-cell-template>
          <p *ngIf="value>30" style="color:red">
            <b>{{value}}</b>
            </p>
            <p *ngIf="value<=30" style="color:black">
            {{value}}
            </p>
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
    { name: "bookid" },
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
    // console.log(moment.now());
    let xx = moment.now();
    // console.log('getbooks------ ', moment().format('YYYY-MM-DD'));
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
          // console.log('search borrower 1:', data[i])

          data[i].startdate = moment(data[i].startdate).format('YYYY-MM-DD');
          if (data[i].enddate != null) {
            // console.log("11:",data[i].enddate);
            data[i].enddate = moment(data[i].enddate).format('YYYY-MM-DD')
          }
          else {
            // console.log("12:",data[i].enddate);
            data[i].enddate = "  "
          };

          // console.log('search borrower 2:',data[i].startdate,data[i].enddate )
        }
        this.rows = data;
      },
      err => alert(err),
      () => { }
      );


  }

}