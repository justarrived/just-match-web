import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes/ja-routes';

@Component({
  selector: 'welcome-user-cta',
  template: `
  <div *ngIf="!isLoggedIn">
    <base-button
      [buttonText]="'home.header.logged.out.register.button' | translate"
      [routerLink]="JARoutes.registerUser.url()"
      kind="secondary-light"
      size="small">
    </base-button>
    <base-button
      [buttonText]="'home.header.logged.out.login.button' | translate"
      [routerLink]="JARoutes.login.url()"
      kind="primary-light"
      size="small">
    </base-button>
  </div>

  <div *ngIf="isLoggedIn">
    <base-button
      [buttonText]="'home.header.logged.in.profile.button' | translate"
      [routerLink]="JARoutes.user.url()"
      kind="secondary-light"
      size="small">
    </base-button>
    <base-button
      [buttonText]="'home.header.logged.in.jobs.button' | translate"
      [routerLink]="JARoutes.jobs.url(['1'])"
      kind="primary-light"
      size="small">
    </base-button>
  </div>
  `
})
export class WelcomeUserCtaComponent {
  public JARoutes = JARoutes;

  @Input() public isLoggedIn: boolean = false;
}
