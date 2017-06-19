import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authguard';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { DashboardComponent } from './dashboard.component';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
const dashboardRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{
		path: 'dashboard', component: DashboardComponent,
		children: [
			{ path: 'books', component: ReadBookComponent, canActivate: [AuthGuard] },
			{ path: 'record', component: SearchBorrowerComponent, canActivate: [AuthGuard] },
		]
	}


];



@NgModule({
	imports: [
		RouterModule.forChild(dashboardRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DashboardRoutingModule { }