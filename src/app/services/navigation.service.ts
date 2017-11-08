import {ActivatedRoute} from '@angular/router';
import {DataStoreService} from './data-store.service';
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

  private static readonly utmSourceParamKey: string = 'utm_source';
  private static readonly utmMediumParamKey: string = 'utm_medium';
  private static readonly utmContentParamKey: string = 'utm_content';
  private static readonly utmCampaignParamKey: string = 'utm_campaign';
  private static readonly utmTermParamKey: string = 'utm_term';
  public static readonly utmSourceCookieKey: string = 'utm_source';
  public static readonly utmMediumCookieKey: string = 'utm_medium';
  public static readonly utmContentCookieKey: string = 'utm_content';
  public static readonly utmCampaignCookieKey: string = 'utm_campaign';
  public static readonly utmTermCookieKey: string = 'utm_term';

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private activatedRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private location: Location,
    private router: Router,
  ) {
    this.initService();
    this.initRouteParamsSubscription();
  }

  public initService() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Starting navigation to ' + event.url)
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
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

  private initRouteParamsSubscription(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.storeParamIfExists(params, NavigationService.utmMediumParamKey, NavigationService.utmMediumCookieKey);
      this.storeParamIfExists(params, NavigationService.utmContentParamKey, NavigationService.utmContentCookieKey);
      this.storeParamIfExists(params, NavigationService.utmSourceParamKey, NavigationService.utmSourceCookieKey);
      this.storeParamIfExists(params, NavigationService.utmTermParamKey, NavigationService.utmTermCookieKey);
      this.storeParamIfExists(params, NavigationService.utmCampaignParamKey, NavigationService.utmCampaignCookieKey);
    });
  }

  private storeParamIfExists(params: any, paramKey: string, cookieKey: string) {
    let param = params[paramKey];
    if (param) {
      this.dataStoreService.setCookie(cookieKey, param, 1);
    }
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

  public navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }

  public navigateToUrlNoLocationChange(url: string): void {
    this.router.navigateByUrl(url, { skipLocationChange: true });
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }
}
