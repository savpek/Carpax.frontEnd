import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CxFormModule } from 'app/shared.cxform/cxform.module';
import { CxComponentModule } from 'app/shared.cxcomponent/cxcomponent.module';
import { CxCanDeactivate } from 'app/service/cxCanDeactivate';
import { ViewComponent } from './view.component';
import { TicketFieldsComponent } from './fields/view-ticket-fields.component';
import { ViewTicketExpensesComponent } from './expenses/view-ticket-expenses.component';

const routes: any = [
    {
        path: ':ticketId',
        component: ViewComponent,
        children: [
            { path: 'fields', component: TicketFieldsComponent },
            { path: 'files', component: ViewTicketExpensesComponent },
            { path: 'feedback', component: TicketFieldsComponent },
            { path: 'expenses', component: ViewTicketExpensesComponent }
        ]
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
        TicketFieldsComponent,
        ViewComponent,
        ViewTicketExpensesComponent
    ],
    exports: [
    ],
    providers: []
})
export class ViewModule {}