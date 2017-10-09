import { Component,ViewChild  } from '@angular/core';
import { ReadBookService } from '../services/readbook.service';
import 'jquery';
import 'bootstrap';
import { BsModalComponent  } from 'ng2-bs3-modal';

@Component({
	providers: [ReadBookService],
	template: `
	<div class="row" style="margin-left:20px;margin-top:20px;">
	
	<button  class='btn' style="margin-right:20px;" [disabled]="!isValid" [ngClass]='{isdisabled: isValid}' (click)="deletebook()">Delete the Book</button>
	<button  class='btn' style="margin-right:20px;" [disabled]="!isValid" [ngClass]='{isdisabled: isValid}' (click)="open()">Add/Change An Initiator</button>


	<bs-modal #validationModal>
     <form #modalForm="ngForm">
        <bs-modal-header [showDismiss]="true">
            <h3 class="modal-title">Choose an initiator</h3>
        </bs-modal-header>
        <bs-modal-body>
            <div class="form-group">
                <label for="readerid">ReaderID</label>
                <input type="text" class="form-control" required [(ngModel)]="readerid" name="readerid" id="readerid">
            </div>
            
        </bs-modal-body>
        <bs-modal-footer>
            <button type="button" class="btn btn-default" data-dismiss="modal" (click)="validationModal.dismiss()">Cancel</button>
            <button type="button" class="btn btn-primary" [disabled]="!modalForm.valid" (click)="close()">Save</button>
        </bs-modal-footer>
    </form>
</bs-modal>

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


		 <ngx-datatable-column name="Initiatorid" [width]="100">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
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

        // <ngx-datatable-column name="Location" [width]="100">
        //   <ng-template let-value="value" ngx-datatable-cell-template>
        //     {{value}}
        //   </ng-template>
        // </ngx-datatable-column>

        // 		<ngx-datatable-column name="InitiatorId" [width]="80">
        //   <ng-template let-value="value" ngx-datatable-cell-template>
        //     {{value}}
        //   </ng-template>
        // </ngx-datatable-column>

export class ReadBookComponent {
	public getBooksList;
	isValid: boolean = false;
	rows = [];
	selected = [];
	columns=[{prop:"bookid"},
	{name:"bookname"},
	{name:"author"},
	{name:"version"},
	 {name:"price"},
	 // {name:"location"},
	 {name:"initiatorid"}

	 ];
	 readerid="";


	 @ViewChild('validationModal')
    modal: BsModalComponent;



	constructor(private readBookService: ReadBookService) { }

	ngOnInit() {
		this.getBooks();
		
	}

    close() {
    	console.log('readerid:',this.readerid);
    	for (let i of this.selected) {

			if (i.bookid != null) {
				// console.log('bookid is', i.bookid);
				this.readBookService.addInitiator(i.bookid,this.readerid).subscribe((res)=>{
				// .deleteBooks(i.bookid).subscribe((res) => {
					console.log(res);
				})

			}
			else {
				console.log('No book selected');

			}
		}

        this.modal.close();
        // location.reload();
    }
    
    open() {
        this.modal.open();
    }

	// Get Books
	getBooks() {

		this.readBookService.getBooksData()
		.subscribe(
			data => {
				// debugger;
			 this.rows = data;
			 // console.log('rows:',this.rows);
		},
			err => alert(err),
			() => { }
		);


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

	onActivate(event) {
		// console.log('Activate Event', event);
	}

	// addInitiator(){
	// 	modal.open();
	// }

	deletebook(){
		// console.log('Delete these books!');
		for (let i of this.selected) {

			if (i.bookid != null) {
				// console.log('bookid is', i.bookid);
				this.readBookService.deleteBooks(i.bookid).subscribe((res) => {
					// console.log(res);
				})

			}
			else {
				console.log('No book selected');

			}
		}
		// location.reload();
	}
};