import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuerySequenceService {
	constructor(public http: Http) { }

	// Get Sequence for initiator
	getSequenceData() {
		// debugger;
		// return an observable
		// console.log('get book data service!');
		let readerid=localStorage.getItem('readerid');
		let postData = { "readerid":readerid };

		let headers = new Headers({
			'Content-Type': 'application/json'

		});
		let url = '/bookreaders/sequence';
		return this.http.post(url, postData, { headers })
			.map((responseData) => {
				// console.log('get books from mysql:', responseData.json());
				return responseData.json()
			});

	}


}
