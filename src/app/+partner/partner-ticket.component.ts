import { Component } from '@angular/core';
import { ITabRoute } from '../shared.cxcomponent/cxcomponent.module';

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
}
