
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Reader } from '../shared/reader';
import { ReadersService } from '../services/readers.service';
import { matchOtherValidator } from '../shared/match-other-validators';
// import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MessageService } from '../services/message.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
	selector: 'passbook',
	template: `
<div class="container" style="margin-top:20px;">
<p>pass book{{pass}}</p>
</div>
  `
})


export class PassbookComponent implements OnInit {
	_readerservice: ReadersService;
	pass:string="san";

	reader = new Reader();
	constructor(readerservice: ReadersService,private router: Router ) {
		this._readerservice = readerservice;
	}
	ngOnInit() {
		let un=localStorage.getItem('username');
		let usernameObj= {username:un};
		this._readerservice.GetReaders(usernameObj).subscribe((res) => {
			// console.log(res);
			let result= res.json();
			console.log('result:   ..................',result)
			if (result[0].finishquestion){
				this.pass="true";
			}
			else {
				this.router.navigate(['/questions']);
			} 
				 
		})
	}
}
