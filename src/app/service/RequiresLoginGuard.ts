import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from './auth';

@Injectable()
export class RequiresLoginGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/auth/login']);
        return false;
    }
    return true;
  }
}