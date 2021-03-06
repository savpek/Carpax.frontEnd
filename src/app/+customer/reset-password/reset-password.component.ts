import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PasswordReset } from '../../service/passwordReset';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [PasswordReset]
})
export class ResetPasswordComponent {
  public newPassword = '';
  public newPasswordAgain = '';

  public userName = '';
  public customerName = '';
  public customerId: string = undefined;

  public acceptEula = false;

  private token: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private toast: ToastrService,
    private reset: PasswordReset,
    private auth: Auth,
    private route: Router) {
    auth.logOut();

    this.activeRoute.params.subscribe(par => {
      reset.requestDataForToken(par['token']).subscribe(x => {
        if (x.isSuccess) {
          this.token = par['token'];
          this.userName = x.value.userName;
          this.customerName = x.value.customerName;
          this.customerId = x.value.customerId;
        } else {
          this.toast.error('Virheellinen, vanhentunut tai käytetty tunniste.')
        }
      });
    });
  }

  public isValid() {
    return this.newPassword.length > 7 && this.newPassword === this.newPasswordAgain;
  }

  public resetPassword() {
    if (!this.acceptEula) {
      this.toast.error('Hyväksythän käyttöehdot jatkaaksesi.');
      return;
    }

    if (!this.isValid()) {
      this.toast.error('Tarkistathan että salasanasi on vähintään 8 merkkiä pitkä ja sisältää sekä numeroita että kirjaimia.');
      return;
    }

    this.reset.resetPassword(this.token, this.newPassword)
      .subscribe(
        data => {
          if (!data.isSuccess) {
            this.toast.error('Salasanan vaihtaminen epäonnistui.');
            return;
          }

          this.route.navigate(['customer', 'login'])
        });
  }
}
