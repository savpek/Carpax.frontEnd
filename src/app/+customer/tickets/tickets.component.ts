import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITabRoute } from 'app/shared.cxcomponent/cxcomponent.module';
import { ITicketHeader, TicketHeaderRepoFactory } from 'app/data/ticketHeaderRepo';
import { NotificationRepo } from 'app/data/notificationRepo';
import { TicketFilter } from '../../service/ticketFilter';
import { Observable, combineLatest } from 'rxjs';
import { TicketFilterComponent } from '../../shared.cxcomponent/ticket-filter/ticket-filter.component';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketFilter]
})
export class TicketsComponent {
  public tickets: Observable<ITicketHeader[]>;

  private context: string;

  public views: any[] = [{ icon: 'fa-list', value: 'list' }, { icon: 'fa-calendar', value: 'calendar' }];
  public currentView = 'list';

  constructor(
    private headerFactory: TicketHeaderRepoFactory,
    private headerFilter: TicketFilter,
    private router: Router,
    private activeRoute: ActivatedRoute) {

    activeRoute.params.subscribe(params => {
      if (params['partnerId']) {
        this.context = 'partner';

        this.tickets =
          combineLatest(
            this.headerFactory.createForPartner(params['partnerId']).get(),
            this.headerFilter.get(), (tickets, filter) => ({tickets, filter}))
          .pipe(map(combined => combined.filter(combined.tickets)));
      } else {
        this.context = 'customer';

        this.tickets =
          combineLatest(
            this.headerFactory.create().get(),
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
