import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './services/authguard';
import { SearchBorrowerComponent } from './SearchBorrowerComponent/searchborrower.component';
import { LoginComponent } from './LoginComponent/login.component';
import { ReaderRegisterComponent } from './register/register.component';
import { getQuestionsComponent } from './questionaire/questionaire.component';
import { HomepageComponent } from './homepage/homepage.component';

export const ROUTES: Routes = [


  // { path: 'home', loadChildren: './home/home.module#HomeModule' },

  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: ReaderRegisterComponent },
  { path: 'questions', component: getQuestionsComponent },
  { path: 'initiator', loadChildren: './initiator/initiator.module#InitiatorModule' },
  {
    path: 'home', loadChildren: './home/home.module#HomeModule'
    ,canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
]
  ;

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES, {
        useHash: true,

        // enableTracing: true
        // , // <-- debugging purposes only
        // preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard,
    // SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }  