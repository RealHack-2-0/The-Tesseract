import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.current();
    if (!!currentUser && currentUser.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/portal']);
    }
  }
}
