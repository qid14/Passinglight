import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './LoginComponent/login-routing.module';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/authguard';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { Router } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

import { SharedModule } from './shared/shared.module';


/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { XLargeDirective } from './home/x-large';



import { LoginComponent } from './LoginComponent/login.component';
// import { BookDetailsComponent } from './BookDetailsComponent/bookdetails.component';
import { ReaderRegisterComponent } from './register/register.component';
import { GetQuestionsService } from './services/questionaire.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2CompleterModule } from "ng2-completer";
import { getQuestionsComponent } from './questionaire/questionaire.component';
import { MessageService } from './services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdRadioModule } from '@angular/material'
import { ReadersService } from './services/readers.service';
import { DataService } from './services/data.service';
import { EqualValidator } from './shared/equalvalidator';
import { DashboardModule } from './dashboard/dashboard.module';
import 'rxjs/add/operator/map'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    HomepageComponent,
    AppComponent,
    AboutComponent,
    NoContentComponent,
    XLargeDirective,

    LoginComponent,
    // BookDetailsComponent,

    ReaderRegisterComponent,
    getQuestionsComponent,
    EqualValidator,

  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    MdButtonModule,
    MdRadioModule,
    DashboardModule,
    SharedModule,
    LoginRoutingModule,
    NgbModule.forRoot(),
    AppRoutingModule
    // RouterModule.forRoot(ROUTES, { useHash: true, 
    // enableTracing: true,//debug use only
    // preloadingStrategy: PreloadAllModules })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    GetQuestionsService,
    ReadersService,
    DataService,
    LoginService,
    AuthGuard,
    MessageService,
    {
      provide: AuthConfig,
      useFactory: (http) => {
        return new AuthConfig({
          tokenName: 'token',
        });
      },
      deps: [Http]
    },
    AuthHttp
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    router: Router
  ) { 
    // console.log("routes:", JSON.stringify(router.config, undefined, 2)) 
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
