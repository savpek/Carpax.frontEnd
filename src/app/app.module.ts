import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';

import { RouterModule }   from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlPanelUsersComponent } from './control-panel-users/control-panel-users.component';
import { TabsComponent } from './tabs/tabs.component';
import { ControlPanelPartnersComponent } from './control-panel-partners/control-panel-partners.component';
import { ControlPanelAttachedPartnersComponent } from './control-panel-attached-partners/control-panel-attached-partners.component';
import { CxFormModule } from './shared.cxform/cxform.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TicketsComponent,
    TicketFilterComponent,
    ControlPanelComponent,
    ControlPanelUsersComponent,
    TabsComponent,
    ControlPanelPartnersComponent,
    ControlPanelAttachedPartnersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CxFormModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/tickets', pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent },
      { path: 'tickets/:id', component: TicketsComponent },
      { path: 'new', component: EditFormComponent},
      {
        path: 'edit/:id',
        loadChildren: './edit/edit.module#EditModule'
      },
      { path: 'new', component: EditComponent },
      {
        path: 'controlpanel',
        component: ControlPanelComponent,
        children: [
          { path: '', component: ControlPanelUsersComponent },
          { path: 'partners', component: ControlPanelPartnersComponent },
          { path: 'attached', component: ControlPanelAttachedPartnersComponent }
        ]
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
