import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITicketHeader, TicketHeaderRepo } from 'app/data/ticketHeaderRepo';
import { TicketFilter } from '../../service/ticketFilter';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketFilter, TicketHeaderRepo]
})
export class TicketsComponent {
  public tickets: Observable<ITicketHeader[]>;

  private context: string;

  public views: any[] = [{ icon: 'fa-list', value: 'list' }, { icon: 'fa-calendar', value: 'calendar' }];
  public currentView = 'list';

  constructor(
    private headerRepo: TicketHeaderRepo,
    private headerFilter: TicketFilter,
    private router: Router,
    activeRoute: ActivatedRoute) {

    activeRoute.params.subscribe(params => {
      if (params['partnerId']) {
        this.context = 'partner';

        this.tickets =
          combineLatest(
            this.headerRepo.getForPartner(params['partnerId']),
            this.headerFilter.get(), (tickets, filter) => ({tickets, filter}))
          .pipe(map(combined => combined.filter(combined.tickets)));
      } else {
        this.context = 'customer';

        this.tickets =
          combineLatest(
            this.headerRepo.get(),
            this.headerFilter.get(), (tickets, filter) => ({tickets: tickets, filter: filter}))
          .pipe(map(combined => combined.filter(combined.tickets)));
      }
    });
  }

  public openTicket(ticket: any) {
    switch (this.context) {
      case 'partner':
        this.router.navigate([`customer/view/${ticket.id}/fields`]);
        break;
      case 'customer':
        this.router.navigate([`customer/edit/${ticket.id}/fields`]);
        break;
    }
  }
}
