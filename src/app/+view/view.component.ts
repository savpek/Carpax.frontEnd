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
export class ViewComponent {
  public routes: ITabRoute[] = [
    { path: 'fields', text: 'Tiedot' },
    { path: 'files', text: 'Liitteet' },
    { path: 'feedback', text: 'Palaute' },
    { path: 'expenses', text: 'Osat & Työt' }
  ];

  constructor(private notificationRepo: NotificationRepo, private route: ActivatedRoute) {}
}