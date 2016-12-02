import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserManager} from './user-manager.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userManager: UserManager, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canNavigateStatus = true;
    if (!this.userManager.getUser()) {
      canNavigateStatus = false;
    }

    if (canNavigateStatus && route.data && route.data['roles']) {
      canNavigateStatus = route.data['roles'].indexOf(this.userManager.getUserRole()) >= 0;
    }

    if (!canNavigateStatus) {
      this.router.navigate(['/home']);
    }
    return canNavigateStatus;
  }
}
