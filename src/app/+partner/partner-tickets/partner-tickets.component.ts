import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicketHeader, TicketHeaderRepoFactory } from 'app/data/ticketHeaderRepo';
import { TicketFilter } from 'app/service/ticketFilter';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './partner-tickets.component.html',
  providers: [TicketFilter, TicketHeaderRepoFactory]
})
export class PartnerTicketsComponent {
  private currentPartnerId: string;
  public tickets: Observable<ITicketHeader[]>;

  constructor(
      private activeRoute: ActivatedRoute,
      private headerFactory: TicketHeaderRepoFactory,
      private router: Router,
      private ticketFilter: TicketFilter) {
    activeRoute.parent.params.subscribe(params => {

      this.currentPartnerId = params['partnerId'];

      if (!this.currentPartnerId) {
        throw 'Assert: !this.currentPartnerId'
      }

      this.tickets = this.headerFactory.createForPartner(this.currentPartnerId)
        .get()
        .combineLatest(ticketFilter.get(), (tickets, filter) => ({tickets, filter}))
        .map(combined => combined.filter(combined.tickets));
    });
  }

  public openTicket(ticket) {
    this.router.navigate([`/partner/${this.currentPartnerId}/view/${ticket.id}/fields`]);
  }
}
