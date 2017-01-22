import { Component } from '@angular/core';
import { PartnerRepo } from 'app/data/partnerRepo';
import { Auth } from 'app/service/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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

  constructor(
      private partnerRepo: PartnerRepo,
      private auth: Auth,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private toast: ToastsManager) {
    this.activeRoute.params.subscribe(x => {
      this.id = x['id'];
      this.partnerRepo.GetById(this.id)
        .subscribe(partner => this.name = partner.name);
    });

    this.auth.logOut();
  }

  public login() {
    this.auth.loginPartner(this.id, this.pin)
      .subscribe(x => this.router.navigate(['/partner', this.id, 'tickets']),
        error => this.toast.error('Kirjautuminen epäonnistui. Varmistathan että PIN on oikein.'));
  }
}
