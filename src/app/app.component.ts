import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { AppState } from './app.service';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs/Subscription';

import { MessageService } from './services/message.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
<div class="site-container">
    <aside class="before-header">
      <nav class="nav-secondary">
        <ul class="genesis-nav-menu">
        <li class="menu-item menu-item-type-custom menu-item-object-custom">
        <a href="https://www.afcinc.org">Buy the book</a>
        </li>
          <li *ngIf="!message" class="menu-item menu-item-type-custom menu-item-object-custom">
            <a [routerLink]="['./login'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
               <i class="fa fa-user-o"></i>
              LOG IN
            </a>
            
          </li>
          <li *ngIf="!message" class="menu-item menu-item-type-custom menu-item-object-custom">
           <a [routerLink]="['./register'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
              REGISTER
            </a>
            
          </li>
      

          <li  *ngIf="message" class="menu-item menu-item-type-custom menu-item-object-custom">
          <h5>Welcome,{{message.text}}</h5>
         
          </li>
            <li  *ngIf="message" class="menu-item menu-item-type-custom menu-item-object-custom">
               <a (click)="logout()">Logout</a>
           </li>

        </ul>
      </nav>
    </aside>
    
  </div>




   

    <main>
      <router-outlet></router-outlet>
    </main>

  

    <footer style="margin-top:20px;">

      <span>Passing light@http://www.theservantheart.org/</span>
       
    </footer>
  `
})
   // <button (click)="logout()">Logout</button>

          //    </li>
          //  <li  *ngIf="message" class="menu-item menu-item-type-custom menu-item-object-custom">
          // <a (click)="logout()">Logout</a>
          // </li>
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Passing light';
  public myVar = false;
  public username = localStorage.getItem("username");
  // loginService: LoginService;
  message: any;
  subscription: Subscription;
  // public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    // this.loginService = loginService;
    // debugger
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
  public logout() {
    debugger
    this.loginService.logout();
    
    this.message=null;
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
