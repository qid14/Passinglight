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
        <ul class="nav genesis-nav-menu">
          <li class="menu-item menu-item-type-custom menu-item-object-custom">
            <a [routerLink]="['./login'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
               <i class="fa fa-user-o"></i>
              LOG IN
            </a>
            
          </li>
          <li class="menu-item menu-item-type-custom menu-item-object-custom">
           <a [routerLink]="['./register'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
              REGISTER
            </a>
            
          </li>
      

          <li class="menu-item menu-item-type-custom menu-item-object-custom">
          <h4>Welcome,{{message.text}}</h4>            
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
      <button (click)="logout()">Logout</button>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Passing light';
  public myVar = false;
  public username=localStorage.getItem("username");
  loginService: LoginService;
   message: any;
    subscription: Subscription;
  // public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    _loginService: LoginService,
    private messageService: MessageService
  ) {
    this.loginService = _loginService;
     this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
  public logout() {
    this.loginService.logout()
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
