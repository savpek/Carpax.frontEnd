import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CxFormModule } from 'app/shared.cxform/cxform.module';
import { CxComponentModule } from 'app/shared.cxcomponent/cxcomponent.module';
import { PartnerTicketsComponent } from './partner-tickets/partner-tickets.component';
import { RequiresPartnerLoginGuard } from './RequiresPartnerLoginGuard';
import { PartnerLoginComponent } from './partner-login/partner-login.component';
import { PartnerRootComponent } from './partner-root.component';
import { PartnerNavigationComponent } from './partner-navigation/partnerNavigation.component';

const routes: any = [
    {
        path: ':partnerId',
        component: PartnerRootComponent,
        canActivate: [RequiresPartnerLoginGuard],
        children: [
            {
                path: 'tickets',
                component: PartnerTicketsComponent,
                canActivate: [RequiresPartnerLoginGuard]
            },
            {
                path: 'view',
                loadChildren: 'app/+view/view.module#ViewModule',
                canActivate: [RequiresPartnerLoginGuard]
            },
        ]
    },
    {
        path: ':partnerId/login',
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
        PartnerTicketsComponent,
        PartnerLoginComponent,
        PartnerRootComponent,
        PartnerNavigationComponent
    ],
    exports: [
    ],
    providers: [RequiresPartnerLoginGuard]
})
export class PartnerModule { }