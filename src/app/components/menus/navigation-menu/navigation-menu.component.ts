import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {NavigationStart} from '@angular/router';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../models/user';

@Component({
  selector: 'navigation-menu',
  styleUrls: ['./navigation-menu.component.scss'],
  template: `
  <div
    *ngIf="isNavigationMenuVisible"
    class="navigation-menu-container ui basic segment">

    <img
      alt="Just Arrived"
      class="ui centered tiny image"
      src="apple-touch-icon.ico">

    <div class="navigation-menu-links-container">

      <a
        *ngIf="user"
        class="navigation-menu-item"
        [routerLink]="JARoutes.userJobs.url([user.id])">
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
        [routerLink]="JARoutes.user.url([user.id])">
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
          [routerLink]="JARoutes.user.url([user.id])">
          <img
            class="ui centered tiny circular image"
            [src]="this.user.profile_image?.mediumImageUrl || '/assets/images/placeholder-profile-image.png'">
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
export class NavigationMenuComponent  {
  @Input() public isNavigationMenuVisible: boolean;
  @Input() public user: User;
  @Output() isNavigationMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public JARoutes = JARoutes;

  public constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authManager: AuthManager
  ) {
  }

  public get canStaffingTimeReport(): boolean {
    return this.user && (this.user.justArrivedStaffing || this.user.admin);
  }

  public onStaffingTimeReportButtonClick() {
    window.location.href = 'https://justarrived-se.web.intelliplan.eu/croupier/login/';
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  public onLogoutButtonClick() {
    this.navigationService.navigate(JARoutes.home);
    this.authManager.logoutUser();
    this.isNavigationMenuVisible = false;
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }
}
