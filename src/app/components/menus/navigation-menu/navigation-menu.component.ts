import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {NavigationStart} from '@angular/router';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'navigation-menu',
  styleUrls: ['./navigation-menu.component.scss'],
  template: `
  <sm-sidebar
    [options]="options"
    (onHide)="onHide()"
    (onShow)="onShow()"
    #navigationSidebar
    class="right vertical inverted">
    <div
      class="navigation-menu-container ui basic segment"
      [class.loading]="user && user.isBeingReloaded">

      <img
        alt="Just Arrived"
        class="ui centered tiny image"
        src="apple-touch-icon.ico">

      <div class="navigation-menu-links-container">

        <a
          class="navigation-menu-item"
          [routerLink]="JARoutes.home.url()">
          {{'menu.main.home' | translate}}
        </a>

        <a
          *ngIf="admin"
          class="navigation-menu-item"
          [routerLink]="JARoutes.godMode.url(['1'])">
          {{'menu.main.god.mode' | translate}}
        </a>

        <a
          *ngIf="user"
          class="navigation-menu-item"
          [routerLink]="JARoutes.applications.url()">
          {{'menu.main.my_assignment' | translate}}
        </a>

        <a
          class="navigation-menu-item"
          [routerLink]="JARoutes.jobs.url(['1'])">
          {{'menu.main.find_assignment' | translate}}
        </a>

        <a
          *ngIf="user"
          class="navigation-menu-item"
          [routerLink]="JARoutes.user.url()">
          {{'menu.main.profile' | translate}}
        </a>

        <a
          class="navigation-menu-item"
          [routerLink]="JARoutes.faq.url()">
          {{'menu.main.faq' | translate}}
        </a>

        <a
          class="navigation-menu-item"
          [routerLink]="JARoutes.contact.url()">
          {{'menu.main.contact' | translate}}
        </a>

        <a
          [routerLink]="JARoutes.supportChat.url()"
          *ngIf="user"
          class="navigation-menu-item">
          {{'menu.main.support.chat' | translate}}
        </a>

        <a
          *ngIf="!user"
          class="navigation-menu-item"
          [routerLink]="JARoutes.login.url()">
          {{'menu.main.login' | translate}}
        </a>

        <a
          (click)="onStaffingTimeReportLinkClick()"
          *ngIf="user && (user.justArrivedStaffing || user.admin);"
          class="navigation-menu-item"
          href="#">
          {{'menu.main.staffing_time_report' | translate}}
        </a>

        <a
          (click)="onLogoutButtonClick()"
          *ngIf="user"
          class="navigation-menu-item">
          {{'menu.main.logout' | translate}}
        </a>

        <div class="navigation-menu-user-container ui basic segment">
          <div
            *ngIf="user"
            class="navigation-menu-user-logged-in-container"
            [routerLink]="JARoutes.user.url()">
            <img
              class="ui centered tiny circular image"
              [src]="this.user.profileImage?.imageUrlMedium || '/assets/images/placeholder-profile-image.png'">
            <h4>{{user.name}}</h4>
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
  </sm-sidebar>
  `
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
  @Input() public options: any;
  @Input() public isNavigationMenuVisible: boolean;
  @Output() public isNavigationMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('navigationSidebar') public navigationSidebar;

  public JARoutes = JARoutes;
  public user: User;
  public admin: boolean;

  private routerEventSubscription: Subscription;
  private userSubscription: Subscription;

  public constructor(
    private navigationService: NavigationService,
    private router: Router,
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
    this.initRouterEventSubscription();
  }

  public onShow(): void {
    this.isNavigationMenuVisible = true;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  public onHide(): void {
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.admin = this.userResolver.isAdmin();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.admin = this.userResolver.isAdmin();
    });
  }

  private initRouterEventSubscription(): void {
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.hide();
      }
    });
  }

  public ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public show(options?: any): void {
    this.isNavigationMenuVisible = true;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
    this.navigationSidebar.show(options);
  }

  public hide(): void {
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
    this.navigationSidebar.hide();
  }

  public onStaffingTimeReportLinkClick(): void {
    window.location.href = 'https://justarrived-se.web.intelliplan.eu/croupier/login/';
    this.hide();
  }

  public onLogoutButtonClick(): void {
    this.navigationService.navigate(JARoutes.home);
    this.userResolver.logout();
    this.hide();
  }
}
