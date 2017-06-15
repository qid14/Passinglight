import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './updateprofile';
import { ContactComponent } from '../ContactComponent/contact.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../services/authguard';

const HomeRoutes: Routes = [
	{
		path: '', component: HomeComponent,
		// { path: 'home', component: HomeComponent },
		children: [
			{ path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
			{ path: 'updateprofile', component: UpdateProfileComponent, canActivate: [AuthGuard]},
			// { path: '', component: HomeComponent }
		]
	}, {
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
]
@NgModule({
	imports: [RouterModule.forChild(HomeRoutes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }

