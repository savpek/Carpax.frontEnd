import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from '../service/auth';

@Injectable()
export class RequiresPartnerLoginGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authService.isLoggedIn('partner')) {
        this.router.navigate(['partner', route.params['id'], 'login']);
        return false;
    }
    return true;
  }
}