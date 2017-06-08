// import { Routes } from '@angular/router';
// import { HomeComponent } from './home';
// import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

// import { DataResolver } from './app.resolver';

// export const ROUTES: Routes = [
//   { path: '',      component: HomeComponent },
//   { path: 'home',  component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'detail', loadChildren: './+detail#DetailModule'},
//   { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
//   { path: '**',    component: NoContentComponent },
// ];

import { Routes } from '@angular/router';
// import {AppComponent} from './config/app.component';

import { HomeComponent } from './home';
import { ContactComponent } from './ContactComponent/contact.component';
import { ReadBookComponent } from './ReadBookComponent/readbook.component';
import { SearchBorrowerComponent } from './SearchBorrowerComponent/searchborrower.component';
import { LoginComponent } from './LoginComponent/login.component';
import { BookDetailsComponent } from './BookDetailsComponent/bookdetails.component';
import { ReaderRegisterComponent } from './register/register.component';
import { getQuestionsComponent } from './questionaire/questionaire.component';
export const ROUTES: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard',  component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'readbook', component: ReadBookComponent },
  { path: 'searchborrower', component: SearchBorrowerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: ReaderRegisterComponent },
  { path: 'readbook/:isbn', component: BookDetailsComponent },
  { path: 'questions', component: getQuestionsComponent },
  { path: '**', component: NoContentComponent },
]
  ;