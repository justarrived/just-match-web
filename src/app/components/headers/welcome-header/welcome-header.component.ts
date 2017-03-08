import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {User} from '../../../models/user';

@Component({
  selector: 'welcome-header',
  template: `
    <div class="welcome-header-container">
      <img class="welcome-header-map-image" src="/assets/images/startpagemap.png" alt="Map" />
      <div class="welcome-header-info-container welcome-header-info-container-logged-in" *ngIf="user">
        <h2 class="welcome-header-info-title">
          {{'home.header.logged.in.title'| translate: {username: user.firstName} }}
        </h2>
        <div class="welcome-header-button-container">
          <a
            routerLink="{{JARoutes.user.url([user.id])}}"
            class="welcome-header-button btn-secondary-light btn-small btn">
            {{'home.header.logged.in.profile.button'| translate}}
          </a><br>
          <a
            routerLink="{{JARoutes.jobs.url(['1'])}}"
            class="welcome-header-button btn-primary-light btn-small btn">
            {{'home.header.logged.in.jobs.button'| translate}}
          </a>
        </div>
      </div>
      <div class="welcome-header-info-container" *ngIf="!user">
        <h2 class="welcome-header-info-title">
          {{'home.header.logged.out.title' | translate }}
        </h2>
        <h4 class="welcome-header-info-subtitle">
          {{'home.header.logged.out.sub.title' | translate }}
        </h4>
        <div class="welcome-header-info-description-container">
          {{'home.header.logged.out.description' | translate }}
        </div>
        <div class="welcome-header-button-container">
          <a
            routerLink="{{JARoutes.registerUser.url()}}"
            class="welcome-header-button btn-secondary-light btn-small btn">
            {{'home.header.logged.out.register.button'| translate}}
          </a><br/>
          <a
            routerLink="{{JARoutes.login.url()}}"
            class="welcome-header-button btn-primary-light btn-small btn">
            {{'home.header.logged.out.login.button'| translate}}
          </a>
        </div>
      </div>
    </div>`,
  styleUrls: ['./welcome-header.component.scss']
})
export class WelcomeHeaderComponent {
  @Input() public user: User;
  public JARoutes = JARoutes;
}
