import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookReaderService {
	constructor(public http: Http) { }

	// ReadBookService getBooksData function
	getBookreaders() {
		// debugger;
		// return an observable
		// console.log('get bookreaders data service!');
		return this.http.get('/api/bookreaders')
			.map((responseData) => {
				// console.log('get bookreaders from mysql:', responseData.json());
				return responseData.json()
			});

	}

	getBookreader(readerid:string) {
		// debugger;
		// return an observable
		// console.log('get bookreaders data service!');
		return this.http.get('/api/bookreaders/'+readerid)
			.map((responseData) => {
				// console.log('get bookreader from mysql:', responseData.json());
				return responseData.json()
			});

	}

	postBookreaders(formValues:Object) {
		// debugger;
		// return an observable
		let body= JSON.stringify(formValues);
		// console.log('body:',body);
		// let rid = 


		let headers= new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers:headers});

		// console.log('post bookreaders data service!');
		return this.http.post('/api/bookreaders',body,options )
			.map((responseData) => {
				// console.log('post bookreaders to mysql:', responseData);
					// .json());
				return responseData;
			});

	}

}
