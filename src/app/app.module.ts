import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';

import { RouterModule }   from '@angular/router';
import { CxFormModule } from './shared.cxform/cxform.module';
import { CxComponentModule } from './shared.cxcomponent/cxcomponent.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TicketsComponent,
    TicketFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CxFormModule,
    CxComponentModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/tickets', pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent },
      { path: 'tickets/:id', component: TicketsComponent },
      { path: 'new', component: TicketsComponent },
      {
        path: 'edit',
        loadChildren: './+edit/edit.module#EditModule'
      },
      {
        path: 'controlpanel',
        loadChildren: './+control-panel/controlpanel.module#ControlPanelModule'
      },
      {
        path: 'partner',
        loadChildren: './+partner/partner.module#PartnerModule'
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
