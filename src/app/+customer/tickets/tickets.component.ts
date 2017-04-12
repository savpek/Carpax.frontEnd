import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITabRoute } from 'app/shared.cxcomponent/cxcomponent.module';
import { ITicketHeader, TicketHeaderRepoFactory } from 'app/data/ticketHeaderRepo';
import { TicketHeaderServiceFactory } from 'app/service/ticketHeaderService';
import { NotificationRepo } from 'app/data/notificationRepo';

@Component({
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketHeaderServiceFactory, TicketHeaderRepoFactory]
})
export class TicketsComponent {
  public tickets: ITicketHeader[];

  public views: any[] = [{ icon: 'fa-list', value: 'list' }, { icon: 'fa-calendar', value: 'calendar' }];
  public currentView = 'list';

  constructor(
    private headerFactory: TicketHeaderServiceFactory,
    private router: Router,
    private activeRoute: ActivatedRoute) {

    activeRoute.params.subscribe(params => {
      if (params['partnerId']) {
        this.headerFactory.createForPartner(params['partnerId'])
          .get()
          .subscribe(x => {
            this.tickets = x;
          });
      } else {
        this.headerFactory.create()
          .get()
          .subscribe(x => {
            this.tickets = x;
          });
      }
    });
  }

  public openTicket(ticket: any) {
    this.router.navigate([`customer/edit/${ticket.id}/fields`]);
  }
}
