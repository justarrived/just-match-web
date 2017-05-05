import {ActivatedRouteSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';
import {RouterStateSnapshot} from '@angular/router';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Injectable()
export class LoggedInAdminGuard implements CanActivate {
  constructor(
    private navigationService: NavigationService,
    private userResolver: UserResolver
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userResolver.resolve()
    .then(user => {
      if (user && user.admin) {
        return true;
      } else {
        this.navigationService.navigate(JARoutes.home);
        return false;
      }
    });
  }
}
