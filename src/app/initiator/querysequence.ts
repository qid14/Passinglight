import { Component } from '@angular/core';
import { BookReaderService} from '../services/passbook.service';
import { QuerySequenceService } from '../services/querysequence.service';
import * as moment from 'moment';
@Component({
  providers: [QuerySequenceService],
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

        
          
          <ngx-datatable-column name="UserName" 
          [width]="150"
          prop="username">
        </ngx-datatable-column>
        
        <ngx-datatable-column name="Sequence"  [width]="150"
          prop="sequence"
          >
        </ngx-datatable-column>

       </ngx-datatable>
       </div>
       </div>

  `


})

export class QuerySequenceComponent {
  // public getSequence;
  rows = [];
  columns = [
    { name: "bookid" },
    { name: "username" },
    { name: "sequence" }

  ]

  constructor(private querySequenceService: QuerySequenceService) { }

  ngOnInit() {
    this.getSequence();
    // console.log(moment.now());
    let xx = moment.now();
    // console.log('getbooks------ ', moment().format('YYYY-MM-DD'));
  }


  // Get Books
  getSequence() {
    // now it's a simple subscription to the observable
    // console.log('getbooks',this.readBookService);
    // debugger
    this.querySequenceService.getSequenceData()
      .subscribe(
      data => {
       
        this.rows = data;
      },
      err => alert(err),
      () => { }
      );


  }

}