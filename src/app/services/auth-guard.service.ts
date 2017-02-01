import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserManager} from './user-manager.service';
import {NavigationService} from './navigation.service';
import {JARoutes} from '../routes/ja-routes';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userManager: UserManager,
    private navigationService: NavigationService
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canNavigateStatus = true;
    if (!this.userManager.getUser()) {
      canNavigateStatus = false;
    }

    if (canNavigateStatus && route.data && route.data['roles']) {
      canNavigateStatus = route.data['roles'].indexOf(this.userManager.getUserRole()) >= 0;
    }

    if (!canNavigateStatus) {
      this.navigationService.navigate(JARoutes.home);
    }
    return canNavigateStatus;
  }
}
