import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ReadersService {
	constructor(public http: Http, private router: Router) { }

	// Register new reader function
	RegisterReaders(formValues: Object) {
		// debugger;
		// return an observable
		let body = JSON.stringify(formValues);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		console.log('post reader data service!');
		try {
			// debugger
			return this.http.post('http://localhost:3002/readers', body, options)
				.map((responseData) => {
					console.log('post new user to mysql:', responseData);

					// .json());
					return responseData;
				});
		}
		catch (error) {
			debugger
			console.log('No13:', error);
			return error;
			// this.router.navigate(['/home']);
		}

	}

	//get reader information form backend
	GetReaders(values?: Object) {
		// debugger;
		// return an observable
		let username = localStorage.getItem('username');
		// let body = JSON.stringify(Values);
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		// let options = new RequestOptions({ headers: headers });

		console.log('get reader data service!');
		try {
			// debugger
			return this.http.get('http://localhost:3002/readers/username/' + username)
				.map((responseData) => {
					console.log('Get user data from mysql:', responseData);

					// .json());
					return responseData;
				});
		}
		catch (error) {
			// debugger
			console.log('No12:', error);
			return error;
			// this.router.navigate(['/home']);
		}

	}

	GetAllReaders() {
		// debugger;
		// return an observable
		// let username = localStorage.getItem('username');
		// // let body = JSON.stringify(Values);
		// // let headers = new Headers({ 'Content-Type': 'application/json' });
		// // let options = new RequestOptions({ headers: headers });

		console.log('get all reader data service!');
		debugger;
		try {
			// debugger
			return this.http.get('http://localhost:3002/readers')
				.map((responseData) => {
					console.log('Get all user data from mysql:', responseData);

					
					return responseData.json();
				});
		}
		catch (error) {
			// debugger
			console.log('No13:', error);
			return error;
			// this.router.navigate(['/home']);
		}

	}




	//Update profile of reader
	UpdateReaders(formValues: Object) {
		// debugger;
		// return an observable
		let body = JSON.stringify(formValues);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		console.log('update reader data service!');
		try {
			// debugger
			return this.http.put('http://localhost:3002/readers', body, options)
				.map((responseData) => {
					console.log('post new user to mysql:', responseData);

					// .json());
					return responseData;
				});
		}
		catch (error) {
			debugger
			console.log('No14:', error);
			return error;
			// this.router.navigate(['/home']);
		}

	}



}
