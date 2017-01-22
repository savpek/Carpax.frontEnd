import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { CxComponentModule } from '../shared.cxcomponent/cxcomponent.module';
import { LoginComponent } from './login/login.component';
import { PartnerLoginComponent } from './partner-login/partner-login.component';

const routes: any = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'logout',
        component: LoginComponent
    },
    {
        path: 'partnerlogin/:id',
        component: PartnerLoginComponent,
    },
    {
        path: 'partnerlogout/:id',
        component: PartnerLoginComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CxFormModule,
        CxComponentModule,
        RouterModule.forChild(routes)],
    declarations: [
    LoginComponent,
    PartnerLoginComponent],
    exports: [
    ],
    providers: []
})
export class AuthModule {}