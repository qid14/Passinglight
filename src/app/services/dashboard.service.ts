import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {
	constructor(public http: Http, private router: Router) { }

	// Register new reader function
	getQuestionaireAnswers() {
		// debugger;
		// return an observable
		// console.log('get questionaire answers service!');
		return this.http.get('/api/statistics/response')
			.map((responseData) => {
				// console.log('get questionaire answers from mysql:', responseData.json());
				return responseData.json()
			});

	}

	getCountAllNum() {
		return this.http.get('/api/bookreaders/countall')
			.map((responseData) => {
				// console.log('get count number of readers:', responseData);
				return responseData
			});
	}

	getCountReadingNum() {
		return this.http.get('/api/bookreaders/countreading')
			.map((responseData) => {
				// console.log('get count number of readers are reading:', responseData);
				return responseData
			});
	}


}
