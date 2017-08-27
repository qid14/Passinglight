import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
// import './rxjs-operators'

@Injectable()
export class DataService {

  constructor(private authHttp: AuthHttp) {
    console.log('aaaaaa', authHttp);
  }

//Get authorized by sending data to backend, verify token
  getSecretQuote(): Observable<string> {

    let authHeader = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem('token')
    });
    let options = new RequestOptions({ headers: authHeader });
    console.log('bbbbb',options);
    
    return this.authHttp
      .get('http://localhost:3002/readers/check-state',options)
      .map(res => res.json())
      // .catch(this.handleError);
  }

  private handleError(error) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}