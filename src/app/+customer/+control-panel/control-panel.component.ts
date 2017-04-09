import { Component } from '@angular/core';
import { ITabRoute } from '../../shared.cxcomponent/cxcomponent.module';

@Component({
  selector: 'cx-control-panel',
  template: '<cx-tabs [routes]="routes"></cx-tabs>'
})
export class ControlPanelComponent {
  public routes: ITabRoute[] = [
    {path: 'users', text: 'Käyttäjät'},
    {path: 'partners', text: 'Kumppanit'},
    {path: 'attached', text: 'Liitetyt kumppanit'}
  ];
}
