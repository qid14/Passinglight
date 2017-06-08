import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReadBookService {
	constructor(public http: Http) { }

	// ReadBookService getBooksData function
	getBooksData() {
		// debugger;
		// return an observable
		// console.log('get book data service!');
		return this.http.get('http://localhost:3002/books')
			.map((responseData) => {
				// console.log('get books from mysql:', responseData.json());
				return responseData.json()
			});

	}

	SearchBorrows(condition?: string) {
		// debugger;
		// return an observable
		console.log('search borrower data service!');
		return this.http.get('http://localhost:3002/borrows')
			.map((responseData) => {
				// console.log('get borrowers from mysql:', responseData.json());
				return responseData.json()
			});

		// ReadBookService getBookDeatils function
		// getBookDeatils(isbn) {
		//   // return an observable
		//   return this.http.get('http://service.techaspect.com:5000/lms/getBooks/'+ isbn)
		// 		    .map(responseData => responseData.json());
		// }


	} // end ReadBookService class
}
