import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketRepo } from '../../data/ticketRepo';
import { FormContext } from '../../shared.cxform/formContext';
import { PartnerRepo } from '../../data/partnerRepo';

@Component({
  selector: 'cx-partner-ticket-fields',
  templateUrl: './partner-ticket-fields.component.html',
  providers: [FormContext, TicketRepo,, PartnerRepo]
})
export class PartnerTicketFieldsComponent {
  public ticket: any = {};

  constructor(private activeRoute: ActivatedRoute, private ticketRepo: TicketRepo, private form: FormContext) {
    form.disabled = true;

    this.activeRoute.params.subscribe(params =>
          this.ticketRepo.Get(params['ticketId']).subscribe(ticket => this.ticket = ticket));
   }
}
