import { Component, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName: string;
  public password: string;

  constructor(private auth: Auth) {}

  public login() {
    this.auth.login(this.userName, this.password);
  }

  public resetPassword() {}
}
