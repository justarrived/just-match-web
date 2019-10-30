import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Inject} from '@angular/core';
import {Input} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {NavigationService} from '../../../services/navigation.service';
import {NavigationStart} from '@angular/router';
import {Output} from '@angular/core';
import {PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'navigation-menu',
  styleUrls: ['./navigation-menu.component.scss'],
  template: `
    <div
      *ngIf="isNavigationMenuVisible"
      class="navigation-menu-container ui basic segment"
      [class.loading]="user && user.isBeingReloaded">

      <img
        alt="Just Arrived"
        class="ui centered small image"
        src="/assets/images/light-vertical-logo.png">

      <hr class="seperator">

      <basic-link
        [text]="'menu.main.guide' | translate"
        [color]="getCurrentUrl() === JARoutes.guide.url() ? 'pink' : 'white'"
        [routerLink]="JARoutes.guide.url()"
        class="navigation-menu-item"
        hoverColor="pink"
        fontSize="large"
        marginBottom="0"
        marginTop="20px"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-link>

      <hr class="seperator">

      <social-media-section></social-media-section>
    </div>`
})
export class NavigationMenuComponent extends BaseComponent {
  @Input() public isNavigationMenuVisible: boolean;
  @Output() public isNavigationMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('navigationSidebar') public navigationSidebar;

  public admin: boolean;

  private routerEventSubscription: Subscription;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private navigationService: NavigationService,
    private router: Router,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initAdmin();
    this.initRouterEventSubscription();
  }

  private initAdmin(): void {
    this.admin = this.userResolver.isAdmin();
  }

  public userChanged(user: User): void {
    this.admin = this.userResolver.isAdmin();
  }

  private initRouterEventSubscription(): void {
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigationMenuVisible = false;
        this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
      }
    });
  }

  public onDestroy(): void {
    if (this.routerEventSubscription) { this.routerEventSubscription.unsubscribe(); }
  }

  public onLogoutButtonClick(): void {
    this.navigationService.navigate(this.JARoutes.home);
    this.userResolver.logout();
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  public getCurrentUrl(): string {
    return this.navigationService.getCurrentUrl();
  }
}
