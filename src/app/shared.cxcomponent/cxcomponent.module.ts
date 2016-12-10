import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { TicketFieldsComponent } from './ticket-fields/ticket-fields.component';

@NgModule({
  imports: [CommonModule, CxFormModule],
  declarations: [
      TicketFieldsComponent
  ],
  exports: [
      TicketFieldsComponent
  ],
  providers: []
})
export class CxComponentModule {}
