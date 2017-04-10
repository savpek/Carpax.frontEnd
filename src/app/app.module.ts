import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { CxFormModule } from './shared.cxform/cxform.module';
import { CxComponentModule } from './shared.cxcomponent/cxcomponent.module';
import { NotificationRepo } from './data/notificationRepo';
import { Auth } from './service/auth';

import { ModalModule } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CxModal } from './service/modal';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LoadingBar } from './service/loadingBar';
import { ResourceFactory } from './data/DataApi';
import { RequiresLoginGuard } from './service/RequiresLoginGuard';
import { LocalStorage } from './service/localStorage';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { HttpWrapper } from './data/httpWrapper';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CxFormModule,
    CxComponentModule,
    ToastModule,
    ModalModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'customer/tickets/own', pathMatch: 'full' },
      {
        path: 'partner',
        loadChildren: './+partner/partner.module#PartnerModule',
      },
      {
        path: 'customer',
        loadChildren: './+customer/customer.module#CustomerModule',
      }
    ])
  ],
  providers: [
    NotificationRepo,
    Auth,
    Modal,
    CxModal,
    LoadingBar,
    ResourceFactory,
    RequiresLoginGuard,
    LocalStorage,
    HttpWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
