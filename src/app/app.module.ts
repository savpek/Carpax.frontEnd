import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketsComponent } from './tickets/tickets.component';

import { RouterModule }   from '@angular/router';
import { CxFormModule } from './shared.cxform/cxform.module';
import { CxComponentModule } from './shared.cxcomponent/cxcomponent.module';
import { NewFormComponent } from './new-form/new-form.component';
import { NotificationRepo } from './data/notificationRepo';
import { Auth } from './service/auth';

import { ModalModule } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TicketsComponent,
    NewFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CxFormModule,
    CxComponentModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/tickets', pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent },
      { path: 'tickets/:id', component: TicketsComponent },
      { path: 'new', component: NewFormComponent },
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
  providers: [NotificationRepo, Auth, Modal],
  bootstrap: [AppComponent]
})
export class AppModule { }
