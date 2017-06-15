import { NoContentComponent } from './no-content';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authguard';


// import { HomeComponent } from './home';
// import { ContactComponent } from './ContactComponent/contact.component';
import { ReadBookComponent } from './ReadBookComponent/readbook.component';
import { SearchBorrowerComponent } from './SearchBorrowerComponent/searchborrower.component';
import { LoginComponent } from './LoginComponent/login.component';
import { BookDetailsComponent } from './BookDetailsComponent/bookdetails.component';
import { ReaderRegisterComponent } from './register/register.component';
import { getQuestionsComponent } from './questionaire/questionaire.component';
export const ROUTES: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule', data: { preload: true } },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomeModule' },

  { path: 'readbook', component: ReadBookComponent, canActivate: [AuthGuard] },
  { path: 'searchborrower', component: SearchBorrowerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: ReaderRegisterComponent },
  { path: 'readbook/:isbn', component: BookDetailsComponent },
  { path: 'questions', component: getQuestionsComponent },
  { path: '**', component: NoContentComponent },
]
  ;