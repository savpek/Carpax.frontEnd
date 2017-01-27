import { 
  Component,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { ITabRoute } from 'app/shared.cxcomponent/tabs/tabs.component';
import { NotificationRepo, INotification } from 'app/data/notificationRepo';

@Component({
  template: '<cx-tabs [routes]="routes"></cx-tabs>'
})
export class EditComponent {
  public routes: ITabRoute[] = [
    { path: 'fields', text: 'Tiedot' },
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