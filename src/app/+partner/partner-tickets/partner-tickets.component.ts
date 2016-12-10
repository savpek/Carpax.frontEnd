import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicketHeader, TicketHeaderRepoFactory } from '../../data/ticketHeaderRepo';

@Component({
  selector: 'cx-partner-tickets',
  templateUrl: './partner-tickets.component.html',
  styleUrls: ['./partner-tickets.component.scss'],
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
