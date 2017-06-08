import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService  } from '../services/login.service'; 
import { ReadBookService } from '../services/readbook.service';

@Component({
	providers: [ReadBookService],
	templateUrl: './bookdetails.component.html',
  	styleUrls: ['./bookdetails.component.css']
})

export class BookDetailsComponent {
	public isbn: any;
	public bookInfo;

	constructor(private activatedRoute: ActivatedRoute, private readBookService: ReadBookService){ }

	ngOnInit() {
		this.activatedRoute.params
			.map(params => params['isbn'])
			.subscribe(
				params => {
					this.isbn = params;
				}
			);
		// this.bookDetails(this.isbn);
	}

	// Book Details
	// bookDetails(isbn) {
	// 	// now it's a simple subscription to the observable
	//     this.readBookService.getBookDeatils(isbn)
	//         .subscribe(
	//           data => {
	//           	var tempArray = [];
	//             tempArray.push(data.Message);
	//             this.bookInfo = tempArray[0];
	//           },
	//           err => alert(err),
	//           () => { }
	//         );
	// }
}
