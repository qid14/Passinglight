import { Component,ChangeDetectorRef,DoCheck,OnInit,ViewChild} from '@angular/core';

import { GetQuestionsService } from '../services/questionaire.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ReadersService } from '../services/readers.service';
import { Reader } from '../shared/reader';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import { ReadersService } from '../services/readers.service';
import { Subscription } from 'rxjs/Subscription';
import {DatatableComponent} from '@swimlane/ngx-datatable';
@Component({
	providers: [
		ReadersService
		
	],
	// <button  class='btn' (click)="searchreader()">Search Reader</button>
	template: `

	
<div class="row" style="margin-left:20px;margin-top:20px;">
<button  class='btn' [disabled]="!isValid" [ngClass]='{isdisabled: isValid}' (click)="changerole()">Change Roles</button>

	<input
        type='text'
        style='padding:8px;margin:15px auto;width:30%;'
        placeholder='Type to filter the username column...'
        (keyup)='updateFilter($event)'
      />
	
	


	<div class="col-md-12" style="margin-top:10px;" >
   <ngx-datatable #table
   		class="material"
         [rows]="rows"
        [columns]="columns"
         [columnMode]="'force'"
		[rowHeight]="'auto'"
		[headerHeight]="50"
        [footerHeight]="50"  
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
		
		 <ngx-datatable-column name="role" [width]="80">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
            <i *ngIf="value=='initiator'" class="fa fa-address-book" (click)="send(row)"></i>
          </ng-template>
        </ngx-datatable-column> 

         <ngx-datatable-column name="username" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
          
         <ngx-datatable-column name="firstname" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

<ngx-datatable-column name="lastname" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

 <ngx-datatable-column name="middlename" [width]="20">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
        
        <ngx-datatable-column name="email" [width]="220">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

          <ngx-datatable-column name="phonenumber" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          </ngx-datatable-column>

        <ngx-datatable-column name="church" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
		

		<ngx-datatable-column name="groups" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="finishquestion" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="readerid" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>

       
        
       

       </ngx-datatable>
       </div>
       </div>




  `,
	styleUrls: ['./authorize.component.css'],
	// directives: [ROUTER_DIRECTIVES]{{responses[i].answer||'null'}}
})





export class AuthorizeComponent implements OnInit {
	
	 @ViewChild(DatatableComponent) table: DatatableComponent;
	isValid: boolean = false;
	editing = {};
	_readerservice: ReadersService;
	rows = [];
	 temp = [];
	subscription:Subscription;
	// olddata = [];
	// rows: Observable<any[]>;
	selected = [];
	columns = [{ prop: "username" },
	{ name: "firstname" },
	{ name: "lastname" },
	{ name: "middlename" },
	{
		name: "email"
	},
	{ name: "phonenumber" },
	{ name: "church" },
	{ name: "groups" },
	{ name: "finishquestion" },
	{ name: "readerid" },
	{ name: "role" }
	]

	getAllReaders() {
		// debugger;
		this.subscription=this._readerservice.GetAllReaders()
			.subscribe(
			data => {
				
				this.rows = data;
				this.temp = data;
				// console.log('this rows:      ', this.rows)
			},
			err => alert(err),
			() => { }
			);
	}

	constructor(private fb: FormBuilder, readerservice: ReadersService,private cd: ChangeDetectorRef,private router:Router) {
		this._readerservice = readerservice;

		
	}


	ngOnInit() {
		this.getAllReaders();



	}

	isInValid() {
		return this.isValid;
	}

	onSelect({ selected }) {
		// console.log('Select Event', selected, this.selected);

		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
		// console.log('SELECTED 001:', this.selected)
		if (selected.length > 0) {
			this.isValid = true;
		}
		else {
			this.isValid = false;
		}
	}
	// onSelect({ selected }) {
	// 	console.log('Select Event', selected, this.selected);

	// 	this.selected.splice(0, this.selected.length);
	// 	this.selected.push(...selected);
	// }

	onActivate(event) {
		// console.log('Activate Event', event);
	}

	send(row: any) {
		// console.log('send')
	}
	changerole() {
		// alert('change role!')
		// console.log('Roles: xxxxxx xxxxxx', this.selected);
		// this.selected.forEach()
		for (let i of this.selected) {

			if (i.role == null) {
				// console.log('role is', i.role, i.readerid);
				this._readerservice.UpdateRoles(i.readerid, true).subscribe((res) => {
					// console.log(res);
				})

			}
			else {
				// console.log('rol is Not null', i.role, i.readerid);
				this._readerservice.UpdateRoles(i.readerid, false).subscribe((res) => {
					// console.log(res);
				})
			}
		}
		location.reload();
		 // this.router.navigate(['/dashboard/authorize']);

		// this.cd.markForCheck(); 
		
	}
	searchreader(){

	}

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

	ngOnDestory(){
		this.subscription.unsubscribe();
	}
}
