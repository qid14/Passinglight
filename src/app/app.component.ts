/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

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
    <nav>

      <a  *ngIf="myVar" [routerLink]="['./searchborrower'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Borrower
      </a>
      <a [routerLink]=" ['./readbook'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
         <i class="fa fa-book"></i>
        Read Book
      </a>

       <a [routerLink]=" ['./login'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
         <i class="fa fa-user-o"></i>
        Login
      </a>

      <a *ngIf="myVar"  [routerLink]=" ['./questions'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
         <i class="fa fa-question"></i>
        Questionaire
      </a>

   
      <a [routerLink]=" ['./contact'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        <i class="fa fa-info"></i>
        About
      </a>
      <a [routerLink]=" ['./register'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
         <i class="fa fa-address-card "></i>
        Register
      </a>
       

    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

  

    <footer>
      <span>Passing light@http://www.theservantheart.org/</span>
      <p><a [routerLink]="['/login']">Logout</a></p>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Passing light';
  public myVar = false;
  // public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
