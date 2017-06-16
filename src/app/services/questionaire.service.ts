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
		console.log('get question data service!');
		return this.http.get('http://localhost:3002/questions')
			.map((responseData) => {
				console.log('get questions from mysql:', responseData.json());
				return responseData.json()
			});

	}

	sendAnswers(formValues:Object) {
		// debugger;
		// return an observable
		let body= JSON.stringify(formValues);
		console.log('body:',body);
		// let rid = 


		let headers= new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers:headers});

		console.log('post reader data service!');
		return this.http.post('http://localhost:3002/questions',body,options )
			.map((responseData) => {
				console.log('post question answers to mysql:', responseData);
					// .json());
				// return responseData.json()
			});

	}

}
