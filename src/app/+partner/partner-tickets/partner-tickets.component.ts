import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicketHeader, TicketHeaderRepo } from 'app/data/ticketHeaderRepo';
import { TicketFilter } from 'app/service/ticketFilter';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './partner-tickets.component.html',
  providers: [TicketFilter, TicketHeaderRepo]
})
export class PartnerTicketsComponent {
  private currentPartnerId: string;
  public tickets: Observable<ITicketHeader[]>;

  constructor(
      activeRoute: ActivatedRoute,
      private headerRepo: TicketHeaderRepo,
      private router: Router,
      ticketFilter: TicketFilter) {
    activeRoute.parent.params.subscribe(params => {
      this.currentPartnerId = params['partnerId'];

      if (!this.currentPartnerId) {
        throw 'Assert: !this.currentPartnerId'
      }

      this.tickets =
        combineLatest(
            this.headerRepo.get(),
            ticketFilter.get(),
            (tickets, filter) => ({tickets, filter}))
        .pipe(map(combined => combined.filter(combined.tickets)));
    });
  }

  public openTicket(ticket) {
    this.router.navigate([`/partner/${this.currentPartnerId}/view/${ticket.id}/fields`]);
  }
}
