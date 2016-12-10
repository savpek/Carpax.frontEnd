import { Component } from '@angular/core';
import { ITabRoute } from '../shared.cxcomponent/tabs/tabs.component';

@Component({
  selector: 'cx-edit',
  template: '<cx-tabs [routes]="routes"></cx-tabs>',
  styleUrls: [],
  providers: []
})
export class EditComponent {
  public routes: ITabRoute[] = [
    { path: '', text: 'Tiedot' },
    { path: 'files', text: 'Liitteet' },
    { path: 'feedback', text: 'palaute' },
    { path: 'expenses', text: 'Kulut' }
  ];
}