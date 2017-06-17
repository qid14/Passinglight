import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent }    from './dashboard.component';
// import { HeroDetailComponent }  from './hero-detail.component';

// import { HeroService } from './hero.service';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    // HeroDetailComponent
  ],
  providers: [ 
  // HeroService
   ]
})
export class DashboardModule {}