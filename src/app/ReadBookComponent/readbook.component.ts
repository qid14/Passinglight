import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES} from '@angular/router';
import { LoginService } from '../services/login.service';
import { ReadBookService } from '../services/readbook.service';
// import angular2-data-table
// import '../src/components/datatable.scss';
// import '../src/themes/material.scss';


@Component({
	providers: [ReadBookService],
	// moduleId:module.id,
	// templateUrl: 'app/modules/ReadBookComponent/readbook.component.html',

	// styleUrls: ['app/modules/ReadBookComponent/readbook.component.css'],

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

         <ngx-datatable-column name="Bookid" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
          
          <ngx-datatable-column name="Bookname" [width]="220">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
        
        <ngx-datatable-column name="Author" [width]="100">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
        
        <ngx-datatable-column name="Version" [width]="80">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

          <ngx-datatable-column name="Price" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

        <ngx-datatable-column name="Location" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>


       </ngx-datatable>
       </div>
       </div>

  `,
	styleUrls: ['./readbook.component.css'],
	// directives: [ROUTER_DIRECTIVES]
})



export class ReadBookComponent {
	public getBooksList;
	rows = [];
	columns=[{prop:"bookid"},
	{name:"bookname"},
	{name:"author"},{
	 name:"version"},
	 {name:"price"},
	 {name:"location"}]

	constructor(private readBookService: ReadBookService) { }

	ngOnInit() {
		this.getBooks();
		// console.log('getbooks------ ')
	}


	// Get Books
	getBooks() {
		// now it's a simple subscription to the observable
		// console.log('getbooks',this.readBookService);
		// debugger
		this.readBookService.getBooksData()
		.subscribe(
			data => {
				debugger;
				// var tempArray =[];
				// tempArray.push(data);
				// this.getBooksList=tempArray;
				// console.log('temparray:',data)
			 this.rows = data;
		},
			err => alert(err),
			() => { }
		);


	}


};