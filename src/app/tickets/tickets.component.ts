import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { AttachedPartnerRepo } from '../data/attachedPartnerRepo';
import { ITabRoute } from '../shared.cxcomponent/cxcomponent.module';
import { ITicketHeader, TicketHeaderRepoFactory } from '../data/ticketHeaderRepo';
import { TicketHeaderServiceFactory } from '../service/ticketHeaderFilter';

@Component({
  selector: 'cx-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [AttachedPartnerRepo, TicketHeaderRepoFactory, TicketHeaderServiceFactory]
})
export class TicketsComponent {
  public tickets: ITicketHeader[];
  public tabs: ITabRoute[] = [{
    path: '/tickets',
    text: 'Omat'
  }];

  constructor(
    private headerFactory: TicketHeaderRepoFactory,
    private router: Router,
    private attachedPartnerRepo: AttachedPartnerRepo,
    private activeRoute: ActivatedRoute) {

    activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.headerFactory.createForPartner(params['id'])
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
        path: `/tickets/${attachedPartner.partnerId}`,
        text: attachedPartner.description
      }));
  }

  public openTicket(ticketId: string) {
    this.router.navigate([`/edit/${ticketId}`]);
  }
}
