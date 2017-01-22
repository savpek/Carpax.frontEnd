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

const routes: any = [
    {
        path: '',
        component: CustomerRootComponent,
        children: [
            { path: 'new', component: NewFormComponent },
            { path: 'tickets', component: TicketsComponent },
            { path: 'tickets/:partnerId', component: TicketsComponent },
            {
                path: 'controlpanel',
                loadChildren: 'app/+customer/+control-panel/controlpanel.module#ControlPanelModule'
            },
        ],
        canActivate: [RequiresLoginGuard]
    },
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
        TicketsComponent],
    exports: [
    ],
    providers: [RequiresLoginGuard]
})
export class CustomerModule { }