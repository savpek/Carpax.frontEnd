import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { TicketFieldsComponent } from './ticket-fields/ticket-fields.component';
import { TabsComponent, ITabRoute } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';

@NgModule({
  imports: [CommonModule, CxFormModule, RouterModule],
  declarations: [
      TicketFieldsComponent,
      TabsComponent,
      TicketListComponent
  ],
  exports: [
      TicketFieldsComponent,
      TabsComponent,
      TicketListComponent
  ],
  providers: []
})
export class CxComponentModule {}
export { ITabRoute }