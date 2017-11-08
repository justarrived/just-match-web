import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {CookieBarComponent} from '../../../components/bars/cookie-bar/cookie-bar.component';
import {DataStoreService} from '../../../services/data-store.service';
import {DOCUMENT} from '@angular/platform-browser';
import {EventEmitter} from '@angular/core';
import {HostListener} from '@angular/core';
import {Inject} from "@angular/core";
import {Input} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Output} from '@angular/core';
import {PageOptionsService} from '../../../services/page-options.service';
import {PLATFORM_ID} from '@angular/core';
import {RendererFactory2} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./app-navbar.component.scss'],
  template: `
  <nav
    class="app-navbar-container"
    [ngClass]="{'transparent': transparentNavbar}">
    <div class="app-navbar-inner-container">
      <div class="logo">
        <a routerLink="{{JARoutes.home.url()}}">
          <img
            alt="Just Arrived"
            class="logo-image"
            src="/assets/images/light-logo.png"/>
        </a>
      </div>
      <div class="menu-items-container">
        <div
          (click)="onLanguageMenuButtonClick()">
          <div class="language-menu-item">
            <div
              [ngClass]="[isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down']"
              class="fa arrow-icon">
            </div>
            <basic-text
              [text]="systemLanguage.languageCode"
              [alwaysLtrText]="true"
              marginTop="0"
              marginBottom="0"
              [uppercase]="true"
              color="white">
            </basic-text>
          </div>
        </div>

        <hr class="seperator">

        <div
          (click)="onNavigationMenuButtonClick()"
          class="navigation-menu-item">
        </div>
      </div>
    </div>
  </nav>
  `
})
export class AppNavbarComponent extends BaseComponent {
  @Input() public isLanguageMenuVisible: boolean;
  @Output() public onToggleLanguageMenu: EventEmitter<any> = new EventEmitter();
  @Output() public onToggleNavigationMenu: EventEmitter<any> = new EventEmitter();

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.updateNavbarBackground();
  }

  public transparentNavbarWhenTopScrolledSubscription: Subscription;

  public transparentNavbar: boolean;

  public constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: any,
    private dataStoreService: DataStoreService,
    private pageOptionsService: PageOptionsService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.updateNavbarBackground();
    this.transparentNavbarWhenTopScrolledSubscription = this.pageOptionsService.getTransparentNavbarWhenTopScrolledChangeEmitter().subscribe(transparentNavbarWhenTopScrolled => {
      this.updateNavbarBackground();
    });
  }

  public onDestroy() {
    if (this.transparentNavbarWhenTopScrolledSubscription) { this.transparentNavbarWhenTopScrolledSubscription.unsubscribe(); }
  }

  public onNavigationMenuButtonClick() {
    this.onToggleNavigationMenu.emit();
  }

  public onLanguageMenuButtonClick() {
    this.onToggleLanguageMenu.emit();
  }

  private updateNavbarBackground(): void {
    if (this.isNavbarTransparent()) {
      this.transparentNavbar = true;
    } else {
      this.transparentNavbar = false;
    }
  }

  private isNavbarTransparent(): boolean {
    return this.pageOptionsService.transparentNavbarWhenTopScrolled()
      && this.dataStoreService.getCookie(CookieBarComponent.cookiesConsentDataKey)
      && !this.userResolver.godModeActive()
      && ( isPlatformServer(this.platformId) || (window && window.scrollY < 1) );
  }
}
