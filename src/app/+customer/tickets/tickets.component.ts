import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { AttachedPartnerRepo } from 'app/data/attachedPartnerRepo';
import { ITabRoute } from 'app/shared.cxcomponent/cxcomponent.module';
import { ITicketHeader, TicketHeaderRepoFactory } from 'app/data/ticketHeaderRepo';
import { TicketHeaderServiceFactory } from 'app/service/ticketHeaderService';
import { NotificationRepo } from 'app/data/notificationRepo';

@Component({
  selector: 'cx-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [AttachedPartnerRepo, TicketHeaderRepoFactory, TicketHeaderServiceFactory]
})
export class TicketsComponent {
  public tickets: ITicketHeader[];
  public tabs: ITabRoute[] = [{
    path: '/customer/tickets/own',
    text: 'Omat'
  }];

  public views: any[] = [{ icon: 'fa-list', value: 'list' }, { icon: 'fa-calendar', value: 'calendar' }];
  public currentView = 'list';

  private notificationLookup: any = {};

  constructor(
    private headerFactory: TicketHeaderServiceFactory,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private attachedPartnerRepo: AttachedPartnerRepo) {

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

    this.attachedPartnerRepo.get()
      .flatMap(x => x)
      .subscribe(attachedPartner => this.tabs.push({
        path: `/customer/tickets/attached/${attachedPartner.partnerId}/`,
        text: attachedPartner.description
      }));
  }

  public openTicket(ticket: any) {
    this.router.navigate([`customer/edit/${ticket.id}/fields`]);
  }
}
