import {ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';
import {JARoute} from '../routes/ja-route/ja-route';
import {JARoutes} from '../routes/ja-routes/ja-routes';
import {NavigationCancel} from '@angular/router';
import {NavigationEnd} from '@angular/router';
import {NavigationError} from '@angular/router';
import {NavigationStart} from '@angular/router';
import {Router} from '@angular/router';
import {RoutesRecognized} from '@angular/router';

@Injectable()
export class NavigationService {
  private states: Array<String> = [];
  private currentState: string;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.initService();
  }

  public initService() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Starting navigation to ' + event.url)
      }

      if (event instanceof NavigationEnd) {
        this.currentState = this.router.url;
        this.states.push(this.router.url);
        document.body.scrollTop = 0;
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
