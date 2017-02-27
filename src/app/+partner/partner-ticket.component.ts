import { Component } from '@angular/core';
import { ITabRoute } from '../shared.cxcomponent/cxcomponent.module';
import { ActivatedRoute } from '@angular/router';
import { NotificationRepo } from '../data/notificationRepo';

@Component({
  selector: 'cx-partner-ticket',
  template: '<cx-tabs [routes]="routes"></cx-tabs>',
  styleUrls: []
})
export class PartnerTicketComponent {
  public routes: ITabRoute[] = [
    { path: './', text: 'Tiedot' },
    { path: 'files', text: 'Liitteet' },
    { path: 'feedback', text: 'Palaute' },
    { path: 'expenses', text: 'Osat & Työt' }
  ];

  constructor(private notificationRepo: NotificationRepo, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      notificationRepo.getForTicket(params['ticketId'])
        .subscribe(notifications => {
          notifications.forEach(n => {
            switch (n.type.toString()) {
              case '0':
                this.routes.find(x => x.path === './').hasNew = true;
                break;
              case '1':
                this.routes.find(x => x.path === 'files').hasNew = true;
                break;
              case '2':
                this.routes.find(x => x.path === 'feedback').hasNew = true;
                break;
              case '3':
                this.routes.find(x => x.path === 'expenses').hasNew = true;
                break;
            }

            this.notificationRepo.clear(n);
          });
        });
    })
  }
}
