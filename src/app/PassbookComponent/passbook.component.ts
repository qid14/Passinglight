
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';

import { MessageService } from '../services/message.service';
import { BookReaderService} from '../services/passbook.service';
import { Observable } from 'rxjs/Observable';
import { Routes, RouterModule } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
	selector: 'passbook',
	template: `
<div class="container" style="margin-top:20px;">
<p>Pass this book </p><b> {{bookname}} {{bookid}} </b>

 <div class = "row justify-content-md-center">
      <div class = "col col-md-5">
<ngb-datepicker #dp [(ngModel)]="model" (navigate)="date = $event.next"></ngb-datepicker>

<hr/>

<button class="btn btn-sm btn-outline-primary" (click)="selectToday()">Select Today</button>
 </div>
 <div class = "col col-md-7">
	 <div class="panel-body">
	  <div class="row">
                    <div class="input-field col s12">
                     <label for="bookid">BookId</label>
                        <input [(ngModel)]="bookid" id="bookid" 
                            type="bookid" class="validate">
                       	{{bookname}}
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                     <label for="username">username</label>
                        <input [(ngModel)]="username" id="username" 
                            type="username" class="validate">
                       
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <label for="email">Email</label>
                        <input [(ngModel)]="email" id="email" 
                            type="email" class="validate">
                        
                    </div>
                </div>
                <span>{{errorMsg}}</span>
                <button (click)="onSubmit()" 
                    class="btn waves-effect waves-light" 
                    type="submit" name="action">Pass</button>
            </div>
</div>
</div>	


</div>
  `
})


export class PassbookComponent implements OnInit {
	public username: string;
	public email: string;
	public postData: string;
	public errorTitle: string;
	public errorDesc: string;
	public successMsg: boolean = true;
	public submitting: boolean = false;
	public errorMsg = '';
	public readerid = '666666';
	bookreadersrecord:any={};


	_readerservice: ReadersService;
	_brservice:BookReaderService
	bookname: string = "Queen of Dark Chamber"
	bookid = 100003;
	model: NgbDateStruct;
	date: { year: number, month: number };
	reader = new Reader();
	constructor(readerservice: ReadersService, private router: Router,brservice:BookReaderService) {
		this._readerservice = readerservice;
		this._brservice = brservice;
	}
	selectToday() {
		this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
		// console.log('date model:',this.model);
	}

		onSubmit() {
		
		let startdate= this.model.month+'/'+this.model.day+'/'+this.model.year;
		// console.log('startdate:',startdate)
		this.bookreadersrecord=Object.assign({"bookid":this.bookid,"username":this.username,"email":this.email},{"startdate":startdate});
		// console.log('No.99 :bookreaderrecord',this.bookreadersrecord);
		this._brservice.postBookreaders(this.bookreadersrecord).subscribe((res) => {
			// console.log('bookreader record:', res);
			alert('Pass book successfully!')
			this.router.navigate(['/home/comment']);
		});

	}
	ngOnInit() {
		this.selectToday();
		let un = localStorage.getItem('username');
		let readerid = localStorage.getItem('readerid');
		let usernameObj = { username: un };

		this._brservice.getBookreader(readerid).subscribe((resp):any=>{
			// console.log('resp++++',resp);
			this.bookid = resp[0].bookid;
			// console.log('New bookid:',this.bookid);

		});

		this._readerservice.GetReaders(usernameObj).subscribe((res):any => {
			// console.log(res);
			let result = res;
			// console.log('result:   ..................', result)

			if (result.length > 0) {
				this.readerid = result[0].readerid;
				if (result[0].finishquestion) {
					// console.log('readerid is .....INIT:',this.readerid);
					// this.bookid = "true";
				}
				else {
					this.router.navigate(['/questions']);
				}

			}
		})
	}
}
