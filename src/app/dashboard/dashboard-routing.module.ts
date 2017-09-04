import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/authguard';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { AddNewBookComponent } from '../BookDetailsComponent/addnewbook.component';
import { DashboardComponent } from './dashboard.component';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
import { StatisticsComponent } from '../StatisticsComponent/statistics.component';
import { AuthorizeComponent} from '../authorize/authorize.component';

const dashboardRoutes: Routes = [
	// { path: '', component: DashboardComponent },
	{
		path: 'dashboard', component: DashboardComponent,
		children: [
			{ path: 'books', component: ReadBookComponent },
			{ path: 'addbook', component: AddNewBookComponent },
			{ path: 'record', component: SearchBorrowerComponent },
			{ path: 'statistics', component: StatisticsComponent  },
			{ path: 'authorize',component: AuthorizeComponent },
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
	]
})
export class DashboardRoutingModule { }