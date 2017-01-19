import { Component, OnInit } from '@angular/core';
import { Auth } from '../service/auth';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  public user: any = {
    name: '-',
    customerName: '-'
  }

  public partnerInfo: any = {
    id: "1234"
  }

  public isPartnerPage(): boolean {
    return false;
  }

  constructor(auth: Auth) {
    auth.getCurrentUser().subscribe(x => this.user = {
      name: x.userName,
      customerName: x.customerName
    });
  }
}
