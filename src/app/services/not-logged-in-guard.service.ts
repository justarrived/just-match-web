import {ActivatedRouteSnapshot} from '@angular/router';
import {AuthManager} from './auth-manager.service';
import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {JARoutes} from '../routes/ja-routes';
import {NavigationService} from './navigation.service';
import {RouterStateSnapshot} from '@angular/router';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private authManager: AuthManager,
    private navigationService: NavigationService
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authManager.isUserLoggedin()) {
      this.navigationService.navigate(JARoutes.home);
      return false;
    } else {
      return true;
    }
  }
}
