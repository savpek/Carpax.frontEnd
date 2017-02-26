import { 
  Component,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { ITabRoute } from 'app/shared.cxcomponent/tabs/tabs.component';
import { NotificationRepo, INotification } from 'app/data/notificationRepo';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '<cx-tabs [routes]="routes"></cx-tabs>'
})
export class EditComponent {
  public routes: ITabRoute[] = [
    { path: 'fields', text: 'Tiedot' },
    { path: 'files', text: 'Liitteet' },
    { path: 'feedback', text: 'Palaute' },
    { path: 'expenses', text: 'Osat & Työt' }
  ];

  constructor(notificationRepo: NotificationRepo, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      notificationRepo.getForTicket(params['id'])
        .subscribe(notifications => {
          notifications.forEach(n => {
            switch(n.type.toString()) {
              case '0':
                this.routes.find(x => x.path === 'fields').hasNew = true;
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
          });
        });
    })
  }
}