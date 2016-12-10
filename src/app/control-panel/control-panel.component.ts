import { Component } from '@angular/core';
import { ITabRoute } from '../shared.cxcomponent/cxcomponent.module';

@Component({
  selector: 'cx-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  providers: []
})
export class ControlPanelComponent {
  public routes: ITabRoute[] = [
    {path: 'users', text: 'Käyttäjät'},
    {path: 'partners', text: 'Kumppanit'},
    {path: 'attached', text: 'Liitetyt kumppanit'}
  ];
}
