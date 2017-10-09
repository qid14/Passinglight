import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Book } from '../shared/book';
import * as _ from 'underscore';
@Injectable()
export class ReadBookService {
	constructor(public http: Http) { }

	// ReadBookService getBooksData function
	getBooksData() {
		// debugger;
		// return an observable
		// console.log('get book data service!');
		return this.http.get('/books')
			.map((responseData) => {
				// console.log('get books from mysql:', responseData.json());
				return responseData.json()
			});

	}

	deleteBooks(bookid: string) {
		let body = JSON.stringify({ 'bookid': bookid });
		// console.log('---15---delete book:', body);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, body: body });

		// console.log('update role service!');
		try {
			// debugger
			return this.http.delete('/books', options)
				.map((responseData) => {
					// console.log('update role for reader:', responseData);

					// .json());
					return responseData;
				});
		}
		catch (error) {
			// debugger
			console.log('No1:', error);
			return error;
			// this.router.navigate(['/home']);
		}

	}
	addBook(formvalues: any) {
		// console.log('formvalues:', formvalues);
		let body = JSON.stringify(formvalues);
		// 
		// let te =_.omit(formvalues,'qty')
		// console.log('body:',te);
		// let body = JSON.stringify(te);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, body: body });
		// if (formvalues.qty == 1) {
			try {
				return this.http.post('/books', body, options)
					.map((res) => {
						return res;
					})
			}
			catch (err) {
				return err;
			}
		// } else {
			// console.log('many values')
		// }
	}


	addInitiator(bookid:string,initiatorid:string){
		// console.log('books id:',bookid);
		let body = JSON.stringify({ 'initiatorid': initiatorid });
		// console.log('---15---delete book:', body);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, body: body });

		// console.log('update role service!');
		try {
			// debugger
			return this.http.put('/books/'+bookid, body, options)
				.map((responseData) => {
					// console.log('update role for reader:', responseData);

					// .json());
					return responseData;
				});
		}
		catch (error) {
			// debugger
			console.log('No111:', error);
			return error;
			// this.router.navigate(['/home']);
		}


	}
	SearchBorrows(condition?: string) {
		// debugger;
		// return an observable
		// console.log('search borrower data service!');
		return this.http.get('/borrows')
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
