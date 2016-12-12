import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { CxComponentModule } from '../shared.cxcomponent/cxcomponent.module';
import { PartnerTicketsComponent } from './partner-tickets/partner-tickets.component';
import { PartnerTicketFieldsComponent } from './partner-ticket-fields/partner-ticket-fields.component';
import { PartnerTicketComponent } from './partner-ticket/partner-ticket.component';
import { PartnerTicketFeedbackComponent } from './partner-ticket-feedback/partner-ticket-feedback.component';
import { PartnerTicketExpensesComponent } from './partner-ticket-expenses/partner-ticket-expenses.component';
import { PartnerTicketFilesComponent } from './partner-files/partner-ticket-files.component';

const routes: any = [
    {
        path: ':id',
        component: PartnerTicketsComponent,
    },
    {
        path: ':id/edit/:ticketId',
        component: PartnerTicketComponent,
        children: [
            { path: '', component: PartnerTicketFieldsComponent },
            { path: 'feedback', component: PartnerTicketFeedbackComponent },
            { path: 'expenses', component: PartnerTicketExpensesComponent },
            { path: 'files', component: PartnerTicketFilesComponent },
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
        PartnerTicketsComponent,
        PartnerTicketFieldsComponent,
        PartnerTicketComponent,
        PartnerTicketFeedbackComponent,
        PartnerTicketExpensesComponent,
        PartnerTicketFilesComponent
    ],
    exports: [
    ],
    providers: []
})
export class PartnerModule { }