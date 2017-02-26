import { Component, Input } from '@angular/core';
import { NotificationRepo } from '../../data/notificationRepo';
import { Router } from '@angular/router';

export interface ITabRoute {
  path: string;
  text: string;
  hasNew?: boolean;
}

@Component({
  selector: 'cx-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input()
  public routes: ITabRoute[] = [];

  constructor(private router: Router) {
  }

  public isActive(path: string): boolean {
    return this.router.isActive(path, true);
  }
}
