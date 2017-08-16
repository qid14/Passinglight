import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';

import { ReadBookService } from '../services/readbook.service';
import { AuthorizeComponent} from '../authorize/authorize.component';
import { StatisticsComponent } from '../StatisticsComponent/statistics.component';
import { StatisticsService } from '../services/statistics.service';

import { DashboardService } from '../services/dashboard.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
// import { HeroDetailComponent }  from './hero-detail.component';

// import { HeroService } from './hero.service';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgxChartsModule,
    NgbModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    AuthorizeComponent,
    ReadBookComponent,
    SearchBorrowerComponent,
    StatisticsComponent
  ],
  providers: [
    ReadBookService,
    DashboardService,

  ]
})
export class SharedModule { }