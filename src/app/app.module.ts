import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

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
import { DataApiFactory } from './data/DataApi';
import { RequiresLoginGuard } from './service/RequiresLoginGuard';
import { LocalStorage } from './service/localStorage';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
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
      { path: '', redirectTo: '/tickets', pathMatch: 'full' },
      {
        path: 'edit',
        loadChildren: './+edit/edit.module#EditModule',
        canActivate: [RequiresLoginGuard]
      },

      {
        path: 'partner',
        loadChildren: './+partner/partner.module#PartnerModule',
      },
      {
        path: 'customer',
        loadChildren: './+customer/customer.module#CustomerModule',
      },
      {
        path: 'auth',
        loadChildren: './+auth/auth.module#AuthModule'
      },
    ])
  ],
  providers: [
    NotificationRepo,
    Auth,
    Modal,
    CxModal,
    LoadingBar,
    DataApiFactory,
    RequiresLoginGuard,
    LocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
