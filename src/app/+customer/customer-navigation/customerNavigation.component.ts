import { Component } from '@angular/core';
import { Auth } from '../../service/auth';

@Component({
  selector: 'cx-customer-navigation',
  templateUrl: './customerNavigation.component.html',
  styleUrls: ['./customerNavigation.component.scss']
})
export class CustomerNavigationComponent {
  public user: any = {
    name: '',
    customerName: ''
  }

  constructor(private auth: Auth) {
    auth.getCurrentUser().subscribe(x =>
      this.user = {
        name: x.name,
        customerName: x.customerName
      });
  }
}
