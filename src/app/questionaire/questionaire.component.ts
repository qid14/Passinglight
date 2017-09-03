import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { GetQuestionsService } from '../services/questionaire.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ReadersService } from '../services/readers.service';
import { Router } from '@angular/router';
interface QuestionInterface {
	questionid: number;
	questiontext: string;
}

interface RespInterface {
	responseid?: number;
	questionid?: number;
	readerid?: number;
	answer?: string;
}

@Component({
	providers: [GetQuestionsService, DataService],
	// moduleId:module.id,
	// templateUrl: 'app/modules/ReadBookComponent/readbook.component.html',

	// styleUrls: ['app/modules/ReadBookComponent/readbook.component.css'],

	template: `
	<div class="container"  style="margin-left:20px;margin-top:20px;">
	<div class="row">
		<form [formGroup]="questionsForm"  (ngSubmit)="save()">
			
			
				<div *ngFor="let qu of questions; let i = index; ">
					<div class="col-md-10">
						No.{{i+1}}  {{qu.questiontext}} 
					</div>
					<div class="col-md-3">
				
					
						 <input type="radio" formControlName={{qu.questionid}} value="Yes"> Yes
						 <input type="radio" formControlName={{qu.questionid}} value="No" > No 
						
						
					</div>
				</div>
				
			
			<div class="col-md-10">
			<button type="submit" class="btn btn-default"
			[disabled]="!questionsForm.valid">Submit</button>
			</div>
		</form>
		
	</div>



  `,
	// styleUrls: ['./readbook.component.css'],
	// directives: [ROUTER_DIRECTIVES]{{responses[i].answer||'null'}}
})

// <md-radio-group class="example-radio-group" [(ngModel)]="responses[i]" (click)="Print()">
//   		<md-radio-button class="example-radio-button" formControlName="question" style="margin-right:20px;" *ngFor="let answer of answers" [value]="answer">
//     		{{answer}}
//   		</md-radio-button>
// 	</md-radio-group>



// {{i}} <i>{{responses[i]}}</i>
// <b>
// {{responses}}
// </b>
// <md-radio-group class="example-radio-group" [(ngModel)]="favoriteSeason">
//   <md-radio-button class="example-radio-button" *ngFor="let season of seasons" [value]="season">
//     {{season}}
//   </md-radio-button>
// </md-radio-group>
// <div class="example-selected-value">Your favorite season is: {{favoriteSeason}}</div>
// </div>

export class getQuestionsComponent {
	readerid: number = 1;
	questions: QuestionInterface[];
	// questionans: RespInterface = {};
	questionans: any[] = [];
	questionanses: any[] = [];

	questionsForm: FormGroup;
	_readerservice: ReadersService;

//save answer of questionaire
	save() {
		// debugger
		
		this.dataService.getSecretQuote().subscribe((d) =>
			console.log('Get token', d),
			err => console.log(err),
			() => console.log('Completed getting token!'));

		this.questionanses = [];
		console.log('Save answers. This.readerid:', this.questionsForm, this.readerid);

		for (let questionid in this.questionsForm.controls) {

			if (this.questionsForm.controls[questionid].value) {
				// debugger
				// console.log(db,this.questionsForm.controls[db].value);

				// this.questionans.questionid=+db;
				// this.questionans.readerid=4000001;
				// this.questionans.answer=this.questionsForm.controls[db].value;
				this.questionans = [+questionid, this.readerid, this.questionsForm.controls[questionid].value];
				this.questionanses.push(this.questionans);
				this.questionans = [];

			}
		}
		console.log('question answeres:    ', this.questionanses);
		this.questionsService.sendAnswers(this.questionanses).subscribe((res) => {
			console.log('Save answers to Backend:', res);
			this.router.navigate(['/home/passbook'])
		});
		
	}
	constructor( private router: Router,readerservice: ReadersService, private questionsService: GetQuestionsService, private fb: FormBuilder, private dataService: DataService) {
		this._readerservice = readerservice;
	}

	ngOnInit() {
		this.buildForm();
		this.getQuestions();
		console.log('get questions------ ')
		this._readerservice.GetReaders().subscribe((res):any => {
			console.log('reader service in questions:', res);
			let userinfo = res;
			console.log('reader in questions:--', userinfo[0]);
			let result = userinfo[0];
			if (result.readerid) {
				console.log('The user exists.', result.readerid);
				this.readerid = +result.readerid;
				
			}
			else {
				console.log('Cannot find such reader.')
			}
		})

		// for(let i=0;i<this.questions.length-1;i++){
		// 	console.log(this.questions[i].questiontext);
		// }
	}
	buildForm(): void {
		this.questionsForm = new FormGroup({
			1001: new FormControl('Yes'),
			1002: new FormControl('Yes'),
			1003: new FormControl('Yes'),
			1004: new FormControl('Yes'),
			1005: new FormControl('Yes'),
			1006: new FormControl('Yes'),
			1007: new FormControl('Yes'),
			1008: new FormControl('Yes'),
			1009: new FormControl('Yes'),

		});

		// this.fb.group({
		// 	quname: this.fb.group({
		// 		1001: 'Yes',
		// 		1002: 'Yes',
		// 		1003: 'Yes',
		// 		1004: 'Yes',
		// 		1005: 'Yes',
		// 		1006: 'Yes',
		// 		1007: 'Yes',
		// 		1008: 'Yes',
		// 		1009: 'Yes'
		// 	})

		// })
	}
	getQuestions() {
		// now it's a simple subscription to the observable
		// console.log('getbooks',this.readBookService);
		// debugger
		this.questionsService.getQuestions()
			.subscribe(
			data => {

				// console.log('temparray:', data)
				this.questions = data;
			}
			, err => alert(err),
			() => { }
			);


	};
}
