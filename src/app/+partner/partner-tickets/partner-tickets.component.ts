import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicketHeader, TicketHeaderRepoFactory } from '../../data/ticketHeaderRepo';

@Component({
  template: '<cx-ticket-list [tickets]="tickets" (openTicket)="openTicket($event)"></cx-ticket-list>',
  providers: [TicketHeaderRepoFactory]
})
export class PartnerTicketsComponent {
  public tickets: ITicketHeader[];
  private currentPartnerId: string;

  constructor(private activeRoute: ActivatedRoute, private headerFactory: TicketHeaderRepoFactory, private router: Router) {
        activeRoute.params.subscribe(params => {

        this.currentPartnerId = params['id'];

        this.headerFactory.createForPartner(this.currentPartnerId)
          .get()
          .subscribe(x => {
            this.tickets = x;
          });
    });
  }

  public openTicket(ticket) {
    this.router.navigate([`/partner/${this.currentPartnerId}/edit/${ticket.id}`]);
  }
}
