import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { CxComponentModule } from '../shared.cxcomponent/cxcomponent.module';
import { CustomerNavigationComponent } from './customer-navigation/customerNavigation.component';
import { NewFormComponent } from './new-form/new-form.component';
import { RequiresLoginGuard } from './RequiresLoginGuard';
import { TicketsComponent } from './tickets/tickets.component';
import { CustomerRootComponent } from './customer-root.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: any = [
    {
        path: '',
        component: CustomerRootComponent,
        children: [
            { path: 'new', component: NewFormComponent, canActivate: [RequiresLoginGuard] },
            { path: 'tickets', component: TicketsComponent, canActivate: [RequiresLoginGuard] },
            { path: 'tickets/:partnerId', component: TicketsComponent, canActivate: [RequiresLoginGuard] },
            {
                path: 'controlpanel',
                loadChildren: 'app/+customer/+control-panel/controlpanel.module#ControlPanelModule',
                canActivate: [RequiresLoginGuard]
            },
            {
                path: 'edit',
                loadChildren: './+edit/edit.module#EditModule',
                canActivate: [RequiresLoginGuard]
            },
        ],
    },
    { path: 'login', component: LoginComponent },
    { path: 'resetpassword/:token', component: ResetPasswordComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CxFormModule,
        CxComponentModule,
        RouterModule.forChild(routes)],
    declarations: [
        CustomerRootComponent,
        CustomerNavigationComponent,
        NewFormComponent,
        TicketsComponent,
        LoginComponent,
        ResetPasswordComponent],
    exports: [
    ],
    providers: [RequiresLoginGuard]
})
export class CustomerModule { }