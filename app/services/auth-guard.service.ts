import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthManager} from "./auth-manager.service";
import {UserManagerService} from "../user-manager.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userManagerService: UserManagerService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canNavigateStatus = true;
    if (!this.userManagerService.getUser()) {
      canNavigateStatus = false;
    }

    if (canNavigateStatus && route.data && route.data['roles']) {
      canNavigateStatus = route.data['roles'].indexOf(this.userManagerService.getUserRole()) >= 0;
    }

    if (!canNavigateStatus) {
      this.router.navigate(['/home']);
    }
    return canNavigateStatus;
  }
}
