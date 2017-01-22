import { Component } from '@angular/core';
import { Auth } from '../service/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public partnerId: '';

  public user: any = {
    name: '',
    customerName: ''
  }

  public isPartnerPage(): boolean {
    return this.auth.isLoggedIn('partner');
  }

  public isVisible(): boolean {
    return this.auth.isLoggedIn('user') || this.auth.isLoggedIn('partner');
  }

  public logoutPartner() {
    this.activeRoute.firstChild.firstChild.params.subscribe(x => {
      if (x['id']) {
        this.route.navigate(['partner', x['id'], 'logout']);
      }
    });
  }

  constructor(private auth: Auth, private activeRoute: ActivatedRoute, private route: Router) {
    auth.getCurrentUser().subscribe(x =>
      this.user = {
        name: x.name,
        customerName: x.customerName
      });
  }
}
