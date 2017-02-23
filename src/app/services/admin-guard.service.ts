import {ActivatedRouteSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {JARoutes} from '../routes/ja-routes';
import {NavigationService} from './navigation.service';
import {RouterStateSnapshot} from '@angular/router';
import {UserManager} from './user-manager.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userManager: UserManager,
    private navigationService: NavigationService
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canNavigateStatus = false;
    let user = this.userManager.getUser();
    if (user && user.admin) {
        canNavigateStatus = true;
    }

    if (canNavigateStatus && route.data && route.data['roles']) {
      canNavigateStatus = route.data['roles'].indexOf(this.userManager.getUserRole()) >= 0;
    }

    if (!canNavigateStatus) {
      this.navigationService.navigate(JARoutes.notFound);
    }
    return canNavigateStatus;
  }
}
