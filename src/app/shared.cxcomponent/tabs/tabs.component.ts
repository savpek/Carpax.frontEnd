import { Component, Input } from '@angular/core';

export interface ITabRoute {
  path: string;
  text: string;
}

@Component({
  selector: 'cx-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input()
  public routes: ITabRoute[] = [];

  constructor() {}
}
