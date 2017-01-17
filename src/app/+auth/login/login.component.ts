import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName: string;
  public password: string;

  public login() {}

  public resetPassword() {}
}
