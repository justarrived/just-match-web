import {Injectable} from '@angular/core';
import {JARoute} from '../routes/ja-route';
import {JARoutes} from '../routes/ja-routes';
import {
  Router,
  NavigationStart,
  RoutesRecognized,
  NavigationCancel,
  NavigationEnd,
  NavigationError
} from '@angular/router';

@Injectable()
export class NavigationService {
  private states: Array<String> = [];
  private currentState: string;

  constructor(
    private router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Starting navigation to ' + event.url)
      }

      if (event instanceof NavigationEnd) {
        this.currentState = router.url;
        this.states.push(router.url);
        console.log('Navigation ended at ' + this.currentState);
      }

      if (event instanceof NavigationCancel) {
        console.log('NavigationCancel');
      }

      if (event instanceof NavigationError) {
        console.log('NavigationError', event);
      }

      if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized');
      }
    });
  }

  public navigateBack(): void {
    this.router.navigate([this.states.pop()]);
  }

  public navigate(route: JARoute, ...args: string[]): void {
    this.router.navigate([route.url(args)]);
  }

  public navigateNoLocationChange(route: JARoute, ...args: string[]): void {
    this.router.navigateByUrl(route.url(args), { skipLocationChange: true });
  }
}
