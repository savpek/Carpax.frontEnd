import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketsComponent } from './tickets/tickets.component';

import { RouterModule } from '@angular/router';
import { CxFormModule } from './shared.cxform/cxform.module';
import { CxComponentModule } from './shared.cxcomponent/cxcomponent.module';
import { NewFormComponent } from './new-form/new-form.component';
import { NotificationRepo } from './data/notificationRepo';
import { Auth } from './service/auth';

import { ModalModule } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CxModal } from './service/modal';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LoadingBar } from './service/loadingBar';
import { DataApiFactory } from './data/DataApi';
import { RequiresLoginGuard } from './service/RequiresLoginGuard';
import { LocalStorage } from './service/localStorage';

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
    SlimLoadingBarModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/tickets', pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent, canActivate: [RequiresLoginGuard] },
      { path: 'tickets/:partnerId', component: TicketsComponent, canActivate: [RequiresLoginGuard] },
      { path: 'new', component: NewFormComponent, canActivate: [RequiresLoginGuard] },
      {
        path: 'edit',
        loadChildren: './+edit/edit.module#EditModule',
        canActivate: [RequiresLoginGuard]
      },
      {
        path: 'controlpanel',
        loadChildren: './+control-panel/controlpanel.module#ControlPanelModule',
        canActivate: [RequiresLoginGuard]
      },
      {
        path: 'partner',
        loadChildren: './+partner/partner.module#PartnerModule',
        canActivate: [RequiresLoginGuard]
      },
      {
        path: 'auth',
        loadChildren: './+auth/auth.module#AuthModule'
      },
    ])
  ],
  providers: [NotificationRepo, Auth, Modal, CxModal, LoadingBar, DataApiFactory, RequiresLoginGuard, LocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
