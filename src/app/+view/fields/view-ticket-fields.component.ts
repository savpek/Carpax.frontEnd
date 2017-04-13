import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketRepo } from 'app/data/ticketRepo';
import { FormContext } from 'app/shared.cxform/formContext';
import { PartnerRepo } from 'app/data/partnerRepo';

@Component({
  templateUrl: './view-ticket-fields.component.html',
  providers: [FormContext, TicketRepo, PartnerRepo]
})
export class TicketFieldsComponent {
  public ticket: any = {};

  constructor(private activeRoute: ActivatedRoute, private ticketRepo: TicketRepo, private form: FormContext) {
    this.form.disabled = true;

    this.activeRoute.params.subscribe(params =>
      this.ticketRepo.Get(params['ticketId'])
        .subscribe(ticket => this.ticket = ticket));
   }
}
