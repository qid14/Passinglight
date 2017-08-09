import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authguard';
// import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { InitiatorComponent } from './initiator.component';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
// import { StatisticsComponent } from '../StatisticsComponent/statistics.component';

const InitiatorRoutes: Routes = [
	{ path: '', component: InitiatorComponent },
	{
		path: 'initiator', component: InitiatorComponent,
		children: [
		
			{ path: '', component: SearchBorrowerComponent, canActivate: [AuthGuard] }
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