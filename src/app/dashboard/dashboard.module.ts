import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard.component';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';
import { ReadBookService } from '../services/readbook.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
// import { HeroDetailComponent }  from './hero-detail.component';

// import { HeroService } from './hero.service';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgbModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    ReadBookComponent,
    SearchBorrowerComponent
  ],
  providers: [
    ReadBookService
  ]
})
export class DashboardModule { }