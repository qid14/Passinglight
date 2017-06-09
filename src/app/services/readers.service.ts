import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReadersService {
	constructor(public http: Http) { }

	// ReadBookService getBooksData function
	RegisterReaders(formValues:Object) {
		// debugger;
		// return an observable
		let body= JSON.stringify(formValues);
		let headers= new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers:headers});

		console.log('post reader data service!');
		return this.http.post('http://localhost:3002/readers',body,options )
			.map((responseData) => {
				console.log('post new user to mysql:', responseData);
					// .json());
				// return responseData.json()
			});

	}


}
