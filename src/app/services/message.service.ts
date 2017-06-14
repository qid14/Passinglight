import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService{
	private sub:Subject<any> = new Subject<any>();
	sendMessage(msg:string){
		this.sub.next({text:msg});
	}
	getMessage():Observable<any>{
		return this.sub.asObservable();
	}
}