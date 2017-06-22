import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authguard';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { CheckstatusComponent } from './Checkstatus.component';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
const checkstatusRoutes: Routes = [
	{ path: '', component: CheckstatusComponent },
	{
		path: 'Checkstatus', component: CheckstatusComponent,
		children: [
			{ path: 'books', component: ReadBookComponent, canActivate: [AuthGuard] },
			{ path: 'record', component: SearchBorrowerComponent, canActivate: [AuthGuard] },
		]
	}


];



@NgModule({
	imports: [
		RouterModule.forChild(checkstatusRoutes)
	],
	exports: [
		RouterModule
	]
})
export class CheckstatusRoutingModule { }