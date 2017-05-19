import {ActivatedRoute} from '@angular/router';
import {Inject} from '@angular/core';
import {Injectable} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {JARoute} from '../routes/ja-route/ja-route';
import {JARoutes} from '../routes/ja-routes/ja-routes';
import {Location} from '@angular/common';
import {NavigationCancel} from '@angular/router';
import {NavigationEnd} from '@angular/router';
import {NavigationError} from '@angular/router';
import {NavigationStart} from '@angular/router';
import {PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {RoutesRecognized} from '@angular/router';

@Injectable()
export class NavigationService {
  private currentUrl: string;
  private routeCheckpoint: string;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {
    this.initService();
  }

  public initService() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Starting navigation to ' + event.url)
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        if (isPlatformBrowser(this.platformId)) {
          document.body.scrollTop = 0;
        }
        console.log('Navigation ended at ' + this.currentUrl);
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
    this.location.back();
  }

  public saveRouteCheckPoint(): void {
    this.routeCheckpoint = this.router.url;
  }

  public hasRouteCheckPoint(): boolean {
    return !!this.routeCheckpoint;
  }

  public navigateBackToLastCheckPoint(): void {
    this.router.navigate([this.routeCheckpoint]);
  }

  public replaceRouteState(route: JARoute, ...args: string[]) {
    this.location.replaceState(route.url(args));
  }

  public navigate(route: JARoute, ...args: string[]): void {
    this.router.navigate([route.url(args)]);
  }

  public navigateNoLocationChange(route: JARoute, ...args: string[]): void {
    this.router.navigateByUrl(route.url(args), { skipLocationChange: true });
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }
}
