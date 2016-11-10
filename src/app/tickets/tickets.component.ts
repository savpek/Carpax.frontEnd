import { TicketHeaderRepo, TicketHeader } from '../data/ticketHeaderRepo';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'cx-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketHeaderRepo]
})
export class TicketsComponent implements OnInit {
  public tickets: Observable<TicketHeader>;

  constructor(private ticketRepo: TicketHeaderRepo) {}

  ngOnInit() {
    this.tickets = this.ticketRepo.Observe<TicketHeader>();
  }

  public openTicket(ticketId: string) {
  }
}
