import { Component } from '@angular/core';
import { ITabRoute } from '../shared.cxcomponent/tabs/tabs.component';

@Component({
  template: '<cx-tabs [routes]="routes"></cx-tabs>',
})
export class EditComponent {
  public routes: ITabRoute[] = [
    { path: '', text: 'Tiedot' },
    { path: 'files', text: 'Liitteet' },
    { path: 'feedback', text: 'Palaute' },
    { path: 'expenses', text: 'Kulut' }
  ];
}