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
	
	<button  class='btn' style="margin-right:20px;" [disabled]="!isValid" [ngClass]='{isdisabled: isValid}' (click)="deletebook()">Delete the Book</button>
	

	<div class="col-md-12" style="margin-top:10px;">
   <ngx-datatable
   		class="material"
         [rows]="rows"
        [columns]="columns"
         [columnMode]="'force'"
		[rowHeight]="'auto'"
        [footerHeight]="50" 
        [headerHeight]="60" 
         [selected]="selected"
          [selectionType]="'checkbox'"
          (activate)="onActivate($event)"
          (select)='onSelect($event)'      

        [limit]="10">
		
		<ngx-datatable-column
            [width]="30"
            [sortable]="false"
            [canAutoResize]="false"
            [draggable]="false"
            [resizeable]="false"
            [headerCheckboxable]="true"
            [checkboxable]="true">
          </ngx-datatable-column>

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
	isValid: boolean = false;
	rows = [];
	selected = [];
	columns=[{prop:"bookid"},
	{name:"bookname"},
	{name:"author"},{
	 name:"version"},
	 {name:"price"},
	 {name:"location"}]

	constructor(private readBookService: ReadBookService) { }

	ngOnInit() {
		this.getBooks();
		
	}


	// Get Books
	getBooks() {

		this.readBookService.getBooksData()
		.subscribe(
			data => {
				// debugger;
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

	onSelect({ selected }) {
		console.log('Select Event', selected, this.selected);

		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
		console.log('SELECTED 001:', this.selected)
		if (selected.length > 0) {
			this.isValid = true;
		}
		else {
			this.isValid = false;
		}
	}

	onActivate(event) {
		// console.log('Activate Event', event);
	}


	deletebook(){
		console.log('Delete these books!');
		for (let i of this.selected) {

			if (i.bookid != null) {
				console.log('bookid is', i.bookid);
				this.readBookService.deleteBooks(i.bookid).subscribe((res) => {
					console.log(res);
				})

			}
			else {
				console.log('No book selected');

			}
		}
		// location.reload();
	}
};