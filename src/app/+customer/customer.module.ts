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
import { TicketListComponent } from '../shared.cxcomponent/ticket-list/ticket-list.component';
import { TicketsTabsComponent } from './tickets/ticketsTabs.component';

const routes: any = [
    {
        path: '',
        component: CustomerRootComponent,
        children: [
            { path: 'new', component: NewFormComponent, canActivate: [RequiresLoginGuard] },
            {
                path: 'tickets',
                component: TicketsTabsComponent,
                canActivate: [RequiresLoginGuard],
                children: [
                    { path: 'own', component: TicketsComponent },
                    { path: 'attached/:partnerId', component: TicketsComponent }
                ]
            },
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
            {
                path: 'view',
                loadChildren: 'app/+view/view.module#ViewModule',
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
        ResetPasswordComponent,
        TicketsTabsComponent],
    exports: [
    ],
    providers: [RequiresLoginGuard]
})
export class CustomerModule { }