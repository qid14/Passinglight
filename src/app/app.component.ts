import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  DoCheck
} from '@angular/core';
import { AppState } from './app.service';
import { LoginService } from './services/login.service';
import {AuthGuard} from './services/authguard';
import { Subscription } from 'rxjs/Subscription';
// import { Router, Route, RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { MessageService } from './services/message.service';
import { Location } from '@angular/common';

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
          <li *ngIf="!isLogged" class="menu-item menu-item-type-custom menu-item-object-custom">
            <a [routerLink]="['./login'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
               <i class="fa fa-user-o"></i>
              LOG IN
            </a>
            
          </li>
          <li *ngIf="!isLogged" class="menu-item menu-item-type-custom menu-item-object-custom">
           <a [routerLink]="['./register'] "
              routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
              REGISTER
            </a>
            
          </li>
      

          <li  *ngIf="message" class="menu-item menu-item-type-custom menu-item-object-custom">
          <h5>Welcome,{{message.text||'friend'}}</h5>
         
          </li>
            <li  *ngIf="isLogged" class="menu-item menu-item-type-custom menu-item-object-custom">
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
export class AppComponent implements OnInit,DoCheck,OnDestroy {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Passing light';
  public myVar = false;
  public username = localStorage.getItem("username");
  // loginService: LoginService;
  isLogged:boolean=false;
  message: any;
  subscription: Subscription;
  // public url = 'https://twitter.com/AngularClass';
  pathString:string = "";
  constructor(

    private location: Location,
    public appState: AppState,
    private loginService: LoginService,
    private authguard:AuthGuard,
    private messageService: MessageService
  ) {
    // this.loginService = loginService;
    // debugger
    // console.log('this route path:',this.router.url)
    // console.log('activated url    :',activatedRoute.url);
     this.pathString = location.path();
  
        this.subscription = this.messageService.getMessage().subscribe(message => { 
          this.message = message; 
          // console.log('Msg:',message);
        });

  }

  public ngDoCheck(){
    this.isLogged = this.loginService.isLoggedIn;
  }
  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    // debugger
    this.isLogged = this.authguard.checkLogin(this.pathString);
    this.loginService.isLoggedIn = this.isLogged;

    console.log('is logged?:',this.isLogged);

        if (this.isLogged){
           this.messageService.sendMessage(localStorage.getItem('username'));
          // this.message.text =  localStorage.getItem('username');
        }
  }
  public logout() {
    // debugger
    this.loginService.logout();
    this.isLogged = false;
    this.message=null;
  }
  ngOnDestroy() {
    debugger
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.isLogged = false;
  }

}

