import { TicketHeaderService } from '../service/ticketHeaderService';
import { TicketHeader } from '../data/ticketHeaderRepo';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'cx-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: []
})
export class TicketsComponent implements OnInit {
  public tickets: Observable<TicketHeader>;
  public tickets2: TicketHeader[];

  constructor(private ticketService: TicketHeaderService, private router: Router) {}

  ngOnInit() {
    this.ticketService
      .GetHeaders()
      .subscribe(x => {
        this.tickets2 = x;
      });
  }

  public openTicket(ticketId: string) {
    this.router.navigate([`/edit/${ticketId}`]);
  }
}
