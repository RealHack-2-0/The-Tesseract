import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthorized()) {
      return true;
    } else {
      const currentUser = this.userService.current();
      if (!!currentUser && currentUser.isAdmin) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/portal']);
      }
    }
  }
}
