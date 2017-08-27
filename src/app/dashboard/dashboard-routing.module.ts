import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/authguard';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { DashboardComponent } from './dashboard.component';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
import { StatisticsComponent } from '../StatisticsComponent/statistics.component';
import { AuthorizeComponent} from '../authorize/authorize.component';

const dashboardRoutes: Routes = [
	// { path: '', component: DashboardComponent },
	{
		path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'books', component: ReadBookComponent ,canActivate: [AuthGuard]},
			{ path: 'record', component: SearchBorrowerComponent ,canActivate: [AuthGuard]},
			{ path: 'statistics', component: StatisticsComponent ,canActivate: [AuthGuard] },
			{ path: 'authorize',component: AuthorizeComponent ,canActivate: [AuthGuard] },
			{ path: '', redirectTo: '/dashboard/statistics', pathMatch: 'full' }
		]
	}


];



@NgModule({
	imports: [
		RouterModule.forChild(dashboardRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		AuthService
	]
})
export class DashboardRoutingModule { }