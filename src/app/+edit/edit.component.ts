import { Component } from '@angular/core';
import { ITabRoute } from '../shared.cxcomponent/tabs/tabs.component';
import { NotificationRepo, INotification } from '../data/notificationRepo';

@Component({
  template: '<cx-tabs [routes]="routes"></cx-tabs>',
})
export class EditComponent {
  public routes: ITabRoute[] = [
    { path: './', text: 'Tiedot' },
    { path: 'files', text: 'Liitteet' },
    { path: 'feedback', text: 'Palaute' },
    { path: 'expenses', text: 'Kulut' }
  ];

  private notifications: INotification[] = [];

  constructor(notificationRepo: NotificationRepo) {
    // TODO: Fix this after user authentication is implemented.
    notificationRepo.get().subscribe(x => this.notifications = x);
  }
}