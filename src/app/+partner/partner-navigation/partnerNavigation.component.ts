import { Component } from '@angular/core';
import { Auth } from 'app/service/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cx-partner-navigation',
  templateUrl: './partnerNavigation.component.html',
  styleUrls: ['./partnerNavigation.component.scss']
})
export class PartnerNavigationComponent {
  public partnerId: '';

  public user: any = {
    name: '',
    customerName: ''
  }

  public logoutPartner() {
    this.activeRoute.params.subscribe(x => {
      if (x['partnerId']) {
        this.route.navigate(['partner', x['partnerId'], 'login']);
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
