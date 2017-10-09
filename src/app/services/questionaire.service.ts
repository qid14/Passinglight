import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetQuestionsService {
	constructor(public http: Http) { }

	// ReadBookService getBooksData function
	getQuestions() {
		// debugger;
		// return an observable
		// console.log('get question data service!');
		return this.http.get('/api/questions')
			.map((responseData) => {
				console.log('get questions from mysql:', responseData.json());
				return responseData.json()
			});

	}

	sendAnswers(formValues:Object) {
		// debugger;
		// return an observable
		// console.log('SAVE ANSWER SERVICE BEGINES..........IIIIIIIIIIIIIIII')
		let body= JSON.stringify(formValues);
		// console.log('Question answers to backend, form body:',body);
		// let rid = 


		let headers= new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers:headers});

		// console.log('post reader data service!');
		return this.http.post('/api/questions',body,options )
			.map((responseData) => {
				console.log('Response when posted question answers to mysql:', responseData);
					// .json());
				// return responseData.json()
			});

	}

}
