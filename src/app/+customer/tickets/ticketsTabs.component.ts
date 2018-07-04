import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AttachedPartnerRepo } from 'app/data/attachedPartnerRepo';
import { ITabRoute } from 'app/shared.cxcomponent/cxcomponent.module';
import { flatMap } from 'rxjs/operators';

@Component({
  template: `
    <cx-tabs [routes]="tabs"></cx-tabs>
  `,
  providers: [AttachedPartnerRepo]
})
export class TicketsTabsComponent {
  public tabs: ITabRoute[] = [{
    path: '/customer/tickets/own',
    text: 'Omat'
  }];

  constructor(private attachedPartnerRepo: AttachedPartnerRepo) {
    this.attachedPartnerRepo.get()
      .pipe(flatMap(x => x))
      .subscribe(attachedPartner => this.tabs.push({
        path: `/customer/tickets/attached/${attachedPartner.partnerId}/`,
        text: attachedPartner.description
      }));
  }
}
