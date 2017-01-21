import { Component } from '@angular/core';
import { PartnerRepo } from '../../data/partnerRepo';
import { Auth } from '../../service/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-partner-login',
  templateUrl: './partner-login.component.html',
  styleUrls: ['./partner-login.component.scss'],
  providers: [PartnerRepo]
})
export class PartnerLoginComponent {
  public id: undefined;
  public name: string = '';
  public pin: string;

  constructor(private partnerRepo: PartnerRepo, private auth: Auth, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(x => {
      this.id = x['id'];
      this.partnerRepo.GetById(this.id)
        .subscribe(partner => this.name = partner.name);
    });

    this.auth.logOut();
  }

  public login() {
  }
}
