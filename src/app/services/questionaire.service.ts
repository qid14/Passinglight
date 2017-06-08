import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetQuestionsService {
	constructor(public http: Http) { }

	// ReadBookService getBooksData function
	getQuestions() {
		// debugger;
		// return an observable
		console.log('get question data service!');
		return this.http.get('http://localhost:3002/questions')
			.map((responseData) => {
				console.log('get questions from mysql:', responseData.json());
				return responseData.json()
			});

	}


}
