import { Component } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
    import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName: string;
  public password: string;

  constructor(private auth: Auth, private router: Router, private toast: ToastsManager) {
    auth.logOut();
  }

  public login() {
    this.auth.login(this.userName, this.password)
      .subscribe(
        x => this.router.navigate(['/customer/tickets/own']),
        error => this.toast.error('Kirjautuminen epäonnistui, tarkistathan että käyttäjätunnus ja salasana ovat oikein'));
  }


  public requestReset() {
    this.auth.passwordResetRequest(this.userName)
      .subscribe(result => {
        if (result.isSuccess) {
          this.toast.success(`Sähköposti salasanan vaihtamiseksi lähetetty osoitteeseen '${this.userName}'`);
        } else {
          this.toast.error(`Salasanan vaihtaminen epäonnistui, tarkistathan että tunnuksesi on oikein.`);
        }
      }, error => this.toast.error('Jotain meni pieleen: ' + error));
  }
}
