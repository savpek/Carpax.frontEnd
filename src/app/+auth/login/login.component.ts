import { Component, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName: string;
  public password: string;

  constructor(private auth: Auth, private router: Router) {
    auth.logOut();
  }

  public login() {
    this.auth.login(this.userName, this.password).subscribe(x => this.router.navigate(['/tickets']));
  }

  public resetPassword() {
  }
}
