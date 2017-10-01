import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReadBookComponent } from '../ReadBookComponent/readbook.component';

import { ReadBookService } from '../services/readbook.service';
import { AuthorizeComponent } from '../authorize/authorize.component';
import { StatisticsComponent } from '../StatisticsComponent/statistics.component';
import { StatisticsService } from '../services/statistics.service';
import { AddNewBookComponent } from '../BookDetailsComponent/addnewbook.component';
import { DashboardService } from '../services/dashboard.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';
import { UpdateProfileComponent } from '../home/updateprofile';
import { PasswordComponent } from '../PasswordComponent/password.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { CommentComponent } from '../home/comment';
import { PassbookComponent } from '../PassbookComponent/passbook.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    StatisticsComponent,
    UpdateProfileComponent,
    PasswordComponent,
    CommentComponent,
    AddNewBookComponent,
    PassbookComponent
  ],
  providers: [
    ReadBookService,
    DashboardService,


  ],
  exports: [
    DashboardComponent,
    AuthorizeComponent,
    ReadBookComponent,
    SearchBorrowerComponent,
    StatisticsComponent,
    AddNewBookComponent,
    UpdateProfileComponent
  ]
})
export class SharedModule { }