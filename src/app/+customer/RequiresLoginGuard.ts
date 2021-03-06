import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../service/auth';

@Injectable()
export class RequiresLoginGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {}

  canActivate() {
    if (!this.authService.isLoggedIn('user')) {
        this.router.navigate(['/customer/login']);
        return false;
    }
    return true;
  }
}