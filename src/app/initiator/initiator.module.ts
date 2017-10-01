import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InitiatorComponent } from './initiator.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitiatorRoutingModule } from './initiator-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchBorrowerComponent } from '../SearchBorrowerComponent/searchborrower.component';

import { BookReaderService } from '../services/passbook.service';
import { QuerySequenceComponent } from './querysequence';
import { QuerySequenceService } from '../services/querysequence.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbModule,
    NgxDatatableModule,
    InitiatorRoutingModule

  ],
  declarations: [
    InitiatorComponent,
    QuerySequenceComponent

  ],
  providers: [
    BookReaderService,
    QuerySequenceService
    

  ]
})
export class InitiatorModule { }