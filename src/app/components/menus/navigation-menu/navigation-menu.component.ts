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
        *ngIf="!user"
        class="navigation-menu-item"
        [routerLink]="JARoutes.login.url()">
        {{'menu.main.login' | translate}}
      </a>

      <a
        (click)="onStaffingTimeReportButtonClick()"
        *ngIf="canStaffingTimeReport"
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
            [src]="this.user.profileImage?.mediumImageUrl || '/assets/images/placeholder-profile-image.png'">
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
  `
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
  @Input() public isNavigationMenuVisible: boolean;
  @Output() isNavigationMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public JARoutes = JARoutes;
  public user: User;

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

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  private initRouterEventSubscription(): void {
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigationMenuVisible = false;
        this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
      }
    });
  }

  public ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public get canStaffingTimeReport(): boolean {
    return this.user && (this.user.justArrivedStaffing || this.user.admin);
  }

  public onStaffingTimeReportButtonClick(): void {
    window.location.href = 'https://justarrived-se.web.intelliplan.eu/croupier/login/';
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  public onLogoutButtonClick(): void {
    this.navigationService.navigate(JARoutes.home);
    this.userResolver.logout();
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }
}
