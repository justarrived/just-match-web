import {ActivatedRouteSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {DataStoreService} from '../../services/data-store.service';
import {Injectable} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {LoggedInGuard} from '../../guards/logged-in/logged-in.guard';
import {NavigationService} from '../../services/navigation.service';
import {RouterStateSnapshot} from '@angular/router';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Injectable()
export class LoggedInAdminGuard implements CanActivate {
  constructor(
    private dataStoreService: DataStoreService,
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
        this.dataStoreService.setInMemory(LoggedInGuard.redirectToUrlAfterLoginKey, state.url);
        this.navigationService.navigate(JARoutes.login);
        return false;
      }
    });
  }
}
