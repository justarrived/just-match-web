import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Inject} from '@angular/core';
import {Input} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
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
        class="ui centered tiny image"
        src="apple-touch-icon.ico">

      <div class="navigation-menu-links-container">

        <basic-link
          [text]="'menu.main.home' | translate"
          [color]="getCurrentUrl() === '/' ? 'pink' : 'gray'"
          [routerLink]="JARoutes.home.url()"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.god.mode' | translate"
          [color]="getCurrentUrl() === JARoutes.godMode.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.godMode.url()"
          *ngIf="admin"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.my_assignment' | translate"
          [color]="getCurrentUrl() === JARoutes.applications.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.applications.url()"
          *ngIf="user"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.find_assignment' | translate"
          [color]="getCurrentUrl() === JARoutes.jobs.url(['1']) ? 'pink' : 'gray'"
          [routerLink]="JARoutes.jobs.url(['1'])"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.profile' | translate"
          [color]="getCurrentUrl() === JARoutes.user.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.user.url()"
          *ngIf="user"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.faq' | translate"
          [color]="getCurrentUrl() === JARoutes.faq.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.faq.url()"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.contact' | translate"
          [color]="getCurrentUrl() === JARoutes.contact.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.contact.url()"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.support.chat' | translate"
          [color]="getCurrentUrl() === JARoutes.supportChat.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.supportChat.url()"
          *ngIf="user"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.login' | translate"
          [color]="getCurrentUrl() === JARoutes.login.url() ? 'pink' : 'gray'"
          [routerLink]="JARoutes.login.url()"
          *ngIf="!user"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          [text]="'menu.main.staffing_time_report' | translate"
          color="gray"
          *ngIf="user && (user.justArrivedStaffing || user.admin)"
          class="navigation-menu-item"
          href="https://justarrived-se.web.intelliplan.eu/croupier/login/"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <basic-link
          (click)="onLogoutButtonClick()"
          [text]="'menu.main.logout' | translate"
          color="gray"
          *ngIf="user"
          class="navigation-menu-item"
          hoverColor="pink"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>

        <div class="navigation-menu-user-container ui basic segment">
          <div
            *ngIf="user"
            class="navigation-menu-user-logged-in-container"
            [routerLink]="JARoutes.user.url()">
            <img
              class="ui centered tiny circular image"
              [src]="this.user.profileImage?.imageUrlMedium || '/assets/images/placeholder-profile-image.png'">
              <basic-title-text
                [text]="user.name"
                color="gray"
                fontSize="small"
                textAlignmentLtr="center"
                textAlignmentRtl="center">
              </basic-title-text>
          </div>

          <div
            *ngIf="!user"
            class="ui basic center aligned segment">
            <base-button
              [buttonText]="'menu.main.register' | translate"
              [routerLink]="JARoutes.registerUser.url()"
              kind="secondary"
              size="small">
            </base-button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NavigationMenuComponent extends BaseComponent {
  @Input() public isNavigationMenuVisible: boolean;
  @Output() public isNavigationMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('navigationSidebar') public navigationSidebar;

  public JARoutes = JARoutes;
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
    this.navigationService.navigate(JARoutes.home);
    this.userResolver.logout();
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  public getCurrentUrl(): string {
    return this.navigationService.getCurrentUrl();
  }
}
