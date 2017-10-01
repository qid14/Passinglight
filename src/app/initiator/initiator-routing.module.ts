import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authguard';
// import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { InitiatorComponent } from './initiator.component';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
import { UpdateProfileComponent } from '../home/updateprofile';
import { PasswordComponent } from '../PasswordComponent/password.component';
import { PassbookComponent } from '../PassbookComponent/passbook.component';
import { CommentComponent } from '../home/comment';
import { QuerySequenceComponent } from './querysequence';
// import { StatisticsComponent } from '../StatisticsComponent/statistics.component';

const InitiatorRoutes: Routes = [
	{ path: '', component: InitiatorComponent ,
	canActivateChild: [AuthGuard],
		// path: 'initiator', component: InitiatorComponent,
		children: [
		
			{ path: 'record', component: QuerySequenceComponent},
			{ path: 'password', component: PasswordComponent},
			{ path: 'updateprofile', component: UpdateProfileComponent },
			{ path: 'passbook', component: PassbookComponent},
			{ path: 'comment', component: CommentComponent },
			{ path: '',  redirectTo: '/initiator/updateprofile', pathMatch: 'full'}
			]
		
	}


];



@NgModule({
	imports: [
		RouterModule.forChild(InitiatorRoutes)
	],
	exports: [
		RouterModule
	]
})
export class InitiatorRoutingModule { }