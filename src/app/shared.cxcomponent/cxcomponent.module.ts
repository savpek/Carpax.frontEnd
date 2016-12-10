import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { TicketFieldsComponent } from './ticket-fields/ticket-fields.component';
import { TabsComponent, ITabRoute } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, CxFormModule, RouterModule],
  declarations: [
      TicketFieldsComponent,
      TabsComponent
  ],
  exports: [
      TicketFieldsComponent,
      TabsComponent
  ],
  providers: []
})
export class CxComponentModule {}
export { ITabRoute }