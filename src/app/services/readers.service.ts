import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Reader } from '../shared/reader';
// import { of }         from 'rxjs/observable/of';
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
	GetReaders(values?: Object):Observable<Reader[]> {
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
					console.log('Get user data from mysql:', responseData.json());

					return responseData.json();
				});
		}
		catch (error) {
			// debugger
			console.log('No12:', error)
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

		// console.log('get all reader data service!');
		// debugger;
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

	//update role
	UpdateRoles(readerid: string, isInitiator:boolean) {
		// debugger;
		// return an observable
		let role= 'null'
		if (isInitiator) {
			role = 'initiator'
		}
		else {
			role = 'null'
		}
		let body = JSON.stringify({'readerid':readerid,'role':role});
		console.log('---15---update role body:',body);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		console.log('update role service!');
		try {
			// debugger
			return this.http.put('http://localhost:3002/readers/authorize', body, options)
				.map((responseData) => {
					console.log('update role for reader:', responseData);

					// .json());
					return responseData;
				});
		}
		catch (error) {
			debugger
			console.log('No15:', error);
			return error;
			// this.router.navigate(['/home']);
		}

	}



}
