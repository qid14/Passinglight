import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizeService {
	constructor(public http: Http, private router: Router) { }

	// Register new reader function
	setInitiators(formValues: Object) {
		let body = JSON.stringify(formValues);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		// console.log('Authorize somebody to a initiator')
		return this.http.put('/api/readers/authorize', body, options)

			// console.log('get questionaire answers from mysql:', responseData.json());
			.map((responseData) => {
				// console.log('post new user to mysql:', responseData);

				// .json());
				return responseData;
			});
	}
	// });
}



