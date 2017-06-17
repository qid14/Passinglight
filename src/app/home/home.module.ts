import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }        from '@angular/common';
// import { SharedModule }       from '../shared/shared.module';
// import {
//   RouterModule,
//   // PreloadAllModules
// } from '@angular/router';
import { ContactComponent } from '../ContactComponent/contact.component';
// import { ContactService }       from './contact.service';
// import { ContactRoutingModule } from './contact-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UpdateProfileComponent } from './updateprofile';
import { CommentComponent } from './comment';
// import { Reader }                   from '../shared/reader';
import {ReadersService} from '../services/readers.service';
import {SubmittedComponent} from '../shared/submitted.component';
import { PassbookComponent } from '../PassbookComponent/passbook.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BookReaderService} from '../services/passbook.service';
@NgModule({
	imports: [
		HomeRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		NgbModule,
		CommonModule
		// ContactRoutingModule 
	],
	declarations: [ContactComponent, HomeComponent,UpdateProfileComponent,
	SubmittedComponent,
	CommentComponent,
	PassbookComponent],
	providers: [
		// ContactService 
		ReadersService,
		BookReaderService
	]
})
export class HomeModule { }