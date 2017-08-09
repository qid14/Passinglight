import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './updateprofile';
import { PasswordComponent } from '../PasswordComponent/password.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../services/authguard';
import { PassbookComponent } from '../PassbookComponent/passbook.component';
import { CommentComponent } from './comment';

const HomeRoutes: Routes = [
	{
		path: '', component: HomeComponent,
		// { path: 'home', component: HomeComponent },
		children: [
			{ path: 'password', component: PasswordComponent},
			{ path: 'updateprofile', component: UpdateProfileComponent },
			{ path: 'passbook', component: PassbookComponent},
			{ path: 'comment', component: CommentComponent},
			{ path: '',  redirectTo: '/home/updateprofile', pathMatch: 'full'}
		]
	}
	// , {
	// 	path: '',
	// 	redirectTo: '/home',
	// 	pathMatch: 'full'
	// }
]
@NgModule({
	imports: [RouterModule.forChild(HomeRoutes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }

