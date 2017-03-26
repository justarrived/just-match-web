import {ActivatedRouteSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';
import {RouterStateSnapshot} from '@angular/router';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private userResolver: UserResolver,
    private navigationService: NavigationService
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userResolver.resolve()
    .then(user => {
      if (user) {
        this.navigationService.navigate(JARoutes.home);
        return false;
      } else {
        return true;
      }
    });
  }
}
