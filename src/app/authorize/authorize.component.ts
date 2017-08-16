import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { GetQuestionsService } from '../services/questionaire.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ReadersService } from '../services/readers.service';
import { Reader } from '../shared/reader';
// import { ReadersService } from '../services/readers.service';

@Component({
	providers: [
		ReadersService
		// GetQuestionsService, DataService
	],
	// moduleId:module.id,
	// templateUrl: 'app/modules/ReadBookComponent/readbook.component.html',

	// styleUrls: ['app/modules/ReadBookComponent/readbook.component.css'],

	template: `
<div class="row" style="margin-left:20px;margin-top:20px;">
	<div class="col-md-12">
   <ngx-datatable
   		class="material"
         [rows]="rows"
        [columns]="columns"
         [columnMode]="'force'"
		[rowHeight]="'auto'"
        [footerHeight]="50"        

        [limit]="10">

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

        <ngx-datatable-column name="role" [width]="80">
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





export class AuthorizeComponent {
	// readerid: number = 1;
	_readerservice: ReadersService;
	rows = [];
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

	getAllReaders(){
		// debugger;
		this._readerservice.GetAllReaders()
		.subscribe(
			data => {
				debugger;
				// var tempArray =[];
				// tempArray.push(data);
				// // this.getBooksList=tempArray;
				// console.log('temparray:',data)
			 this.rows = data;
			 console.log('this rows:      ',this.rows)
		},
			err => alert(err),
			() => { }
		);
	}

	constructor(private fb: FormBuilder, readerservice: ReadersService) {
		this._readerservice = readerservice;
	}

	ngOnInit() {
		this.getAllReaders();



	}


}