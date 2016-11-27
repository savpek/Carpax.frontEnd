import { ITabRoute } from '../tabs/tabs.component';
import { FormContext } from '../service/formContext';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  providers: []
})
export class ControlPanelComponent {
  public routes: ITabRoute[] = [
    {path: './', text: 'Käyttäjät'},
    {path: 'partners', text: 'Partnerit'}
  ];
}
